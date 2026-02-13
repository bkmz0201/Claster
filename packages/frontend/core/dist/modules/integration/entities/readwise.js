import { Entity, LiveData } from '@toeverything/infra';
import { chunk } from 'lodash-es';
import { IntegrationPropertyService } from '../services/integration-property';
import { encryptPBKDF2 } from '../utils/encrypt';
import { ReadwiseCrawler } from './readwise-crawler';
export class ReadwiseIntegration extends Entity {
    constructor(integrationRefStore, readwiseStore, docsService) {
        super();
        this.integrationRefStore = integrationRefStore;
        this.readwiseStore = readwiseStore;
        this.docsService = docsService;
        this.writer = this.props.writer;
        this.crawler = this.framework.createEntity(ReadwiseCrawler);
        this.importing$ = new LiveData(false);
        this.settings$ = LiveData.from(this.readwiseStore.watchSetting(), undefined);
    }
    setting$(key) {
        return this.settings$.selector(setting => setting?.[key]);
    }
    updateSetting(key, value) {
        this.readwiseStore.setSetting(key, value);
    }
    /**
     * Get all integration metas of current user & token in current workspace
     */
    async getRefs() {
        const token = this.readwiseStore.getSetting('token');
        if (!token)
            return [];
        const integrationId = await encryptPBKDF2(token);
        return this.integrationRefStore
            .getRefs({ type: 'readwise', integrationId })
            .map(ref => ({
            ...ref,
            refMeta: ref.refMeta,
        }));
    }
    async highlightsToAffineDocs(highlights, books, options) {
        this.importing$.next(true);
        const disposables = [];
        try {
            const { signal, onProgress, onComplete, onAbort } = options;
            const integrationId = await encryptPBKDF2(this.readwiseStore.getSetting('token') ?? '');
            const userId = this.readwiseStore.getUserId();
            const localRefs = await this.getRefs();
            const localRefsMap = new Map(localRefs.map(ref => [ref.refMeta.highlightId, ref]));
            const updateStrategy = this.readwiseStore.getSetting('updateStrategy');
            const syncNewHighlights = this.readwiseStore.getSetting('syncNewHighlights');
            const tags = this.readwiseStore.getSetting('tags');
            const chunks = chunk(highlights, 2);
            const total = highlights.length;
            let finished = 0;
            for (const chunk of chunks) {
                if (signal?.aborted) {
                    disposables.forEach(d => d());
                    this.importing$.next(false);
                    onAbort?.(finished);
                    return;
                }
                await Promise.all(chunk.map(async (highlight) => {
                    await new Promise(resolve => {
                        const id = requestIdleCallback(resolve, { timeout: 500 });
                        disposables.push(() => cancelIdleCallback(id));
                    });
                    const book = books[highlight.book_id];
                    const localRef = localRefsMap.get(highlight.id);
                    const refMeta = localRef?.refMeta;
                    const localUpdatedAt = refMeta?.updatedAt;
                    const localDocId = localRef?.id;
                    const action = this.getAction({
                        localUpdatedAt,
                        remoteUpdatedAt: highlight.updated_at,
                        updateStrategy,
                        syncNewHighlights,
                    });
                    // write if not matched
                    if (action !== 'skip' && !signal?.aborted) {
                        await this.highlightToAffineDoc(highlight, book, localDocId, {
                            updateStrategy,
                            integrationId,
                            userId,
                            tags,
                        });
                    }
                    finished++;
                    onProgress?.(finished / total);
                }));
            }
            onComplete?.();
        }
        catch (err) {
            console.error('Failed to import readwise highlights', err);
        }
        finally {
            disposables.forEach(d => d());
            this.importing$.next(false);
        }
    }
    async highlightToAffineDoc(highlight, book, docId, options) {
        const { updateStrategy, integrationId, tags } = options;
        const { text, ...highlightWithoutText } = highlight;
        const writtenDocId = await this.writer.writeDoc({
            content: text,
            title: book.title,
            docId,
            tags,
            comment: highlight.note,
            updateStrategy: updateStrategy ?? 'append',
        });
        // write failed
        if (!writtenDocId)
            return;
        const { doc, release } = this.docsService.open(writtenDocId);
        const integrationPropertyService = doc.scope.get(IntegrationPropertyService);
        // write doc properties
        integrationPropertyService.updateIntegrationProperties('readwise', {
            ...highlightWithoutText,
            ...book,
        });
        release();
        // update integration ref
        this.integrationRefStore.createRef(doc.id, {
            type: 'readwise',
            integrationId,
            refMeta: {
                highlightId: highlight.id,
                updatedAt: highlight.updated_at,
            },
        });
    }
    getAction(info) {
        const { localUpdatedAt, remoteUpdatedAt, updateStrategy, syncNewHighlights, } = info;
        return !localUpdatedAt
            ? syncNewHighlights
                ? 'new'
                : 'skip'
            : localUpdatedAt !== remoteUpdatedAt
                ? updateStrategy
                    ? 'update'
                    : 'skip'
                : 'skip';
    }
    connect(token) {
        this.readwiseStore.setSettings({
            token,
            updateStrategy: 'append',
            syncNewHighlights: true,
        });
    }
    disconnect() {
        this.readwiseStore.setSettings({
            token: undefined,
            updateStrategy: undefined,
            syncNewHighlights: undefined,
            lastImportedAt: undefined,
        });
    }
    /**
     * Delete all highlights of current user in current workspace
     */
    async deleteAll() {
        const refs = await this.getRefs();
        await Promise.all(refs.map(ref => {
            const doc = this.docsService.list.doc$(ref.id).value;
            if (doc) {
                doc.moveToTrash();
            }
            return this.integrationRefStore.deleteRef(ref.id);
        }));
    }
}
//# sourceMappingURL=readwise.js.map