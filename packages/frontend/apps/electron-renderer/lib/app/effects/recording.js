var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import { DocsService } from '@affine/core/modules/doc';
import { AudioAttachmentService } from '@affine/core/modules/media/services/audio-attachment';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { DebugLogger } from '@affine/debug';
import { apis, events } from '@affine/electron-api';
import { i18nTime } from '@affine/i18n';
import track from '@affine/track';
import { getCurrentWorkspace, isAiEnabled } from './utils';
const logger = new DebugLogger('electron-renderer:recording');
async function saveRecordingBlob(blobEngine, filepath) {
    logger.debug('Saving recording', filepath);
    const opusBuffer = await fetch(new URL(filepath, location.origin)).then(res => res.arrayBuffer());
    const blob = new Blob([opusBuffer], {
        type: 'audio/mp4',
    });
    const blobId = await blobEngine.set(blob);
    logger.debug('Recording saved', blobId);
    return { blob, blobId };
}
export function setupRecordingEvents(frameworkProvider) {
    events?.recording.onRecordingStatusChanged(status => {
        (async () => {
            if ((await apis?.ui.isActiveTab()) && status?.status === 'ready') {
                const env_1 = { stack: [], error: void 0, hasError: false };
                try {
                    const currentWorkspace = __addDisposableResource(env_1, getCurrentWorkspace(frameworkProvider), false);
                    if (!currentWorkspace) {
                        // maybe the workspace is not ready yet, eg. for shared workspace view
                        await apis?.recording.handleBlockCreationFailed(status.id);
                        return;
                    }
                    const { workspace } = currentWorkspace;
                    const docsService = workspace.scope.get(DocsService);
                    const aiEnabled = isAiEnabled(frameworkProvider);
                    const timestamp = i18nTime(status.startTime, {
                        absolute: {
                            accuracy: 'minute',
                            noYear: true,
                        },
                    });
                    const docProps = {
                        onStoreLoad: (doc, { noteId }) => {
                            (async () => {
                                if (status.filepath) {
                                    const env_2 = { stack: [], error: void 0, hasError: false };
                                    try {
                                        // it takes a while to save the blob, so we show the attachment first
                                        const { blobId, blob } = await saveRecordingBlob(doc.workspace.blobSync, status.filepath);
                                        // name + timestamp(readable) + extension
                                        const attachmentName = (status.appName ?? 'System Audio') +
                                            ' ' +
                                            timestamp +
                                            '.opus';
                                        // add size and sourceId to the attachment later
                                        const attachmentId = doc.addBlock('affine:attachment', {
                                            name: attachmentName,
                                            type: 'audio/opus',
                                            size: blob.size,
                                            sourceId: blobId,
                                            embed: true,
                                        }, noteId);
                                        const model = doc.getBlock(attachmentId)
                                            ?.model;
                                        if (!aiEnabled) {
                                            return;
                                        }
                                        const currentWorkspace = __addDisposableResource(env_2, getCurrentWorkspace(frameworkProvider), false);
                                        if (!currentWorkspace) {
                                            return;
                                        }
                                        const { workspace } = currentWorkspace;
                                        const audioAttachment = __addDisposableResource(env_2, workspace.scope
                                            .get(AudioAttachmentService)
                                            .get(model), false);
                                        audioAttachment?.obj
                                            .transcribe()
                                            .then(() => {
                                            track.doc.editor.audioBlock.transcribeRecording({
                                                type: 'Meeting record',
                                                method: 'success',
                                                option: 'Auto transcribing',
                                            });
                                        })
                                            .catch(err => {
                                            logger.error('Failed to transcribe recording', err);
                                        });
                                    }
                                    catch (e_2) {
                                        env_2.error = e_2;
                                        env_2.hasError = true;
                                    }
                                    finally {
                                        __disposeResources(env_2);
                                    }
                                }
                                else {
                                    throw new Error('No attachment model found');
                                }
                            })()
                                .then(async () => {
                                await apis?.recording.handleBlockCreationSuccess(status.id);
                            })
                                .catch(error => {
                                logger.error('Failed to transcribe recording', error);
                                return apis?.recording.handleBlockCreationFailed(status.id, error);
                            })
                                .catch(error => {
                                console.error('unknown error', error);
                            });
                        },
                    };
                    const page = docsService.createDoc({
                        docProps,
                        title: 'Recording ' + (status.appName ?? 'System Audio') + ' ' + timestamp,
                        primaryMode: 'page',
                    });
                    workspace.scope.get(WorkbenchService).workbench.openDoc(page.id);
                }
                catch (e_1) {
                    env_1.error = e_1;
                    env_1.hasError = true;
                }
                finally {
                    __disposeResources(env_1);
                }
            }
        })().catch(console.error);
    });
}
//# sourceMappingURL=recording.js.map