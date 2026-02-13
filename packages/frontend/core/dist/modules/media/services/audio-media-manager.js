import { generateUrl } from '@affine/core/components/hooks/affine/use-share-url';
import { AttachmentBlockModel } from '@blocksuite/affine/model';
import { attachmentBlockAudioMediaKey, ObjectPool, parseAudioMediaKey, Service, } from '@toeverything/infra';
import { clamp } from 'lodash-es';
import { distinctUntilChanged } from 'rxjs';
import { DesktopApiService } from '../../desktop-api';
import { AudioMedia } from '../entities/audio-media';
// Media service is to control how media should be played for attachment block
// At a time, only one media can be played.
export class AudioMediaManagerService extends Service {
    constructor(globalMediaState, workbench) {
        super();
        this.globalMediaState = globalMediaState;
        this.workbench = workbench;
        this.mediaPool = new ObjectPool({
            onDelete: media => {
                media.dispose();
                const disposables = this.mediaDisposables.get(media);
                if (disposables) {
                    disposables.forEach(dispose => dispose());
                    this.mediaDisposables.delete(media);
                }
            },
            onDangling: media => {
                return media.playbackState$.getValue().state !== 'playing';
            },
        });
        this.mediaDisposables = new WeakMap();
        this.desktopApi = this.framework.getOptional(DesktopApiService);
        this.disposables.push(() => {
            this.mediaPool.clear();
        });
        // Subscribe to global playback state changes to manage playback across tabs
        this.disposables.push(this.observeGlobalPlaybackState(state => {
            if (!state) {
                // If global state is cleared, stop all media
                this.stopAllMedia();
                return;
            }
            const activeStats = this.getGlobalMediaStats();
            if (!activeStats)
                return;
            if (BUILD_CONFIG.isElectron &&
                activeStats.tabId !== this.desktopApi?.appInfo.viewId) {
                // other tab is playing, pause the current media
                if (state.state === 'playing') {
                    this.pauseAllMedia();
                }
                return;
            }
            const mediaRef = this.ensureMediaEntity(activeStats);
            const media = mediaRef.media;
            this.ensureExclusivePlayback();
            media.syncState(state);
            // Return cleanup function
            return () => {
                mediaRef.release();
            };
        }));
        window.addEventListener('beforeunload', () => {
            this.stopAllMedia();
        });
    }
    // Helper method to observe global playback state changes
    observeGlobalPlaybackState(callback) {
        const unsubscribe = this.globalMediaState.playbackState$
            .pipe(distinctUntilChanged((a, b) => a?.updateTime === b?.updateTime))
            .subscribe(state => {
            if (state) {
                return callback(state);
            }
            return;
        });
        return () => {
            unsubscribe.unsubscribe();
        };
    }
    get playbackState$() {
        return this.globalMediaState.playbackState$;
    }
    get playbackStats$() {
        return this.globalMediaState.stats$;
    }
    ensureMediaEntity(input) {
        const descriptor = this.normalizeEntityDescriptor(input);
        let rc = this.mediaPool.get(descriptor.key);
        if (!rc) {
            rc = this.mediaPool.put(descriptor.key, this.framework.createEntity(AudioMedia, {
                blobId: descriptor.blobId,
                metadata: new MediaMetadata({
                    title: descriptor.name,
                    artist: 'AFFiNE',
                    // todo: add artwork, like the app icon?
                }),
            }));
            const audioMedia = rc.obj;
            // Set up playback state synchronization (broadcast to global state)
            const playbackStateSubscription = audioMedia.playbackState$
                .pipe(distinctUntilChanged((a, b) => a.updateTime === b.updateTime))
                .subscribe(state => {
                if (state.state === 'playing') {
                    this.globalMediaState.updateStats({
                        ...audioMedia.getStats(),
                        tabId: descriptor.tabId,
                        key: descriptor.key,
                        name: descriptor.name,
                        size: descriptor.size,
                    });
                    this.globalMediaState.updatePlaybackState({
                        tabId: descriptor.tabId,
                        key: descriptor.key,
                        ...audioMedia.getPlaybackStateData(),
                    });
                }
                else if ((state.state === 'paused' || state.state === 'stopped') &&
                    this.globalMediaState.stats$.value?.key === descriptor.key) {
                    // If this is the active media and it's paused/stopped, update global state
                    this.globalMediaState.updatePlaybackState({
                        tabId: descriptor.tabId,
                        key: descriptor.key,
                        ...audioMedia.getPlaybackStateData(),
                    });
                    if (state.state === 'stopped') {
                        this.globalMediaState.updateStats(null);
                        this.globalMediaState.updatePlaybackState(null);
                    }
                }
            });
            this.mediaDisposables.set(audioMedia, [
                () => playbackStateSubscription.unsubscribe(),
                () => {
                    // if the audioMedia is the active media, remove it
                    if (this.getActiveMediaKey() === descriptor.key) {
                        this.globalMediaState.updatePlaybackState(null);
                        this.globalMediaState.updateStats(null);
                    }
                },
            ]);
        }
        return { media: rc.obj, release: rc.release };
    }
    play() {
        const stats = this.getGlobalMediaStats();
        const currentState = this.getGlobalPlaybackState();
        if (!stats || !currentState) {
            return;
        }
        const seekOffset = currentState.seekOffset;
        this.globalMediaState.updatePlaybackState({
            state: 'playing',
            // rewind to the beginning if the seek offset is greater than the duration
            seekOffset: seekOffset >= stats.duration ? 0 : seekOffset,
            updateTime: Date.now(),
        });
    }
    pause() {
        const state = this.getGlobalPlaybackState();
        if (!state) {
            return;
        }
        this.globalMediaState.updatePlaybackState({
            state: 'paused',
            seekOffset: ((Date.now() - state.updateTime) / 1000) * (state.playbackRate || 1.0) +
                state.seekOffset,
            updateTime: Date.now(),
        });
    }
    stop() {
        this.globalMediaState.updatePlaybackState({
            state: 'stopped',
            seekOffset: 0,
            updateTime: Date.now(),
        });
    }
    seekTo(time) {
        const stats = this.getGlobalMediaStats();
        if (!stats) {
            return;
        }
        this.globalMediaState.updatePlaybackState({
            seekOffset: clamp(0, time, stats.duration),
            updateTime: Date.now(),
        });
    }
    /**
     * Sets the playback rate (speed) for the current audio
     * @param rate The playback rate (0.5 to 4.0)
     */
    setPlaybackRate(rate) {
        const state = this.getGlobalPlaybackState();
        if (!state) {
            return;
        }
        const clamped = clamp(rate, 0.5, 4.0);
        this.globalMediaState.updatePlaybackState({
            ...state,
            playbackRate: clamped,
            updateTime: Date.now(),
        });
    }
    focusAudioMedia(key, tabId) {
        const mediaProps = parseAudioMediaKey(key);
        if (tabId === this.currentTabId) {
            this.workbench.workbench.openDoc({
                docId: mediaProps.docId,
                mode: 'page',
                blockIds: [mediaProps.blockId],
            });
        }
        else if (BUILD_CONFIG.isElectron && tabId) {
            const url = generateUrl({
                baseUrl: window.location.origin,
                workspaceId: mediaProps.workspaceId,
                pageId: mediaProps.docId,
                blockIds: [mediaProps.blockId],
            });
            this.desktopApi?.showTab(tabId, url).catch(console.error);
        }
    }
    getActiveMediaKey() {
        const stats = this.getGlobalMediaStats();
        return stats?.key || null;
    }
    getGlobalPlaybackState() {
        const provider = this.globalMediaState;
        return provider.playbackState$.value || null;
    }
    getGlobalMediaStats() {
        const provider = this.globalMediaState;
        return provider.stats$.value || null;
    }
    // Ensure only one media is playing at a time
    ensureExclusivePlayback() {
        const activeKey = this.getActiveMediaKey();
        if (activeKey) {
            this.pauseAllMedia(activeKey);
        }
    }
    get currentTabId() {
        return this.desktopApi?.appInfo.viewId || 'web';
    }
    normalizeEntityDescriptor(input) {
        if (input instanceof AttachmentBlockModel) {
            if (!input.props.sourceId) {
                throw new Error('Invalid media');
            }
            return {
                key: attachmentBlockAudioMediaKey({
                    blobId: input.props.sourceId,
                    blockId: input.id,
                    docId: input.store.id,
                    workspaceId: input.store.rootDoc.guid,
                }),
                name: input.props.name,
                size: input.props.size,
                blobId: input.props.sourceId,
                // when input is AttachmentBlockModel, it is always in the current tab
                tabId: this.currentTabId,
            };
        }
        else {
            const { blobId } = parseAudioMediaKey(input.key);
            return {
                key: input.key,
                name: input.name,
                size: input.size,
                blobId,
                tabId: input.tabId,
            };
        }
    }
    /**
     * Pause all playing media except the one with the given ID
     * IN THE CURRENT TAB
     */
    pauseAllMedia(exceptId) {
        // Iterate through all objects in the pool
        for (const [id, ref] of this.mediaPool.objects) {
            if (id !== exceptId &&
                ref.obj.playbackState$.getValue().state === 'playing') {
                ref.obj.pause();
            }
        }
    }
    stopAllMedia(exceptId) {
        // Iterate through all objects in the pool
        for (const [id, ref] of this.mediaPool.objects) {
            if (id !== exceptId &&
                ref.obj.playbackState$.getValue().state === 'playing') {
                ref.obj.stop();
            }
        }
        // The media entity may not being created yet
        // so we need to change the state
        const globalState = this.getGlobalPlaybackState();
        if (globalState &&
            globalState.key !== exceptId &&
            globalState.tabId === this.currentTabId) {
            this.globalMediaState.updatePlaybackState(null);
            this.globalMediaState.updateStats(null);
        }
    }
}
//# sourceMappingURL=audio-media-manager.js.map