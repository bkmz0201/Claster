import { monitorForElements, } from '@affine/component';
import { DNDAPIExtension, DndApiExtensionIdentifier, } from '@blocksuite/affine/shared/services';
import { BlockStdScope } from '@blocksuite/affine/std';
import { Service } from '@toeverything/infra';
import { resolveLinkToDoc } from '../../navigation';
export class DndService extends Service {
    constructor(docsService, workspaceService, editorSettingService) {
        super();
        this.docsService = docsService;
        this.workspaceService = workspaceService;
        this.editorSettingService = editorSettingService;
        this.resolvers = [];
        this.fromExternalData = (args, isDropEvent) => {
            if (!isDropEvent) {
                return {};
            }
            let resolved = null;
            // in the order of the resolvers instead of the order of the types
            for (const resolver of this.resolvers) {
                const candidate = resolver(args.source);
                if (candidate) {
                    resolved = candidate;
                    break;
                }
            }
            if (!resolved) {
                return {}; // no resolver can handle this data
            }
            return resolved;
        };
        this.toExternalData = (args, data) => {
            const normalData = typeof data === 'function' ? data(args) : data;
            if (!normalData ||
                !normalData.entity ||
                normalData.entity.type !== 'doc' ||
                !normalData.entity.id) {
                return {};
            }
            const dndAPI = this.getBlocksuiteDndAPI(normalData.entity.id);
            if (!dndAPI) {
                return {};
            }
            const snapshotSlice = dndAPI.fromEntity({
                docId: normalData.entity.id,
                flavour: 'affine:embed-linked-doc',
            });
            if (!snapshotSlice) {
                return {};
            }
            const encoded = dndAPI.encodeSnapshot(snapshotSlice);
            return {
                [dndAPI.mimeType]: encoded,
            };
        };
        this.resolveUriList = urls => {
            // only deal with the first url
            const url = urls
                ?.split('\n')
                .find(u => u.trim() && !u.trim().startsWith('#'));
            if (url) {
                const maybeDocLink = resolveLinkToDoc(url);
                // check if the doc is in the current workspace
                if (maybeDocLink?.workspaceId === this.workspaceService.workspace.id &&
                    this.docsService.list.doc$(maybeDocLink.docId).value &&
                    // skip for block references for now
                    !maybeDocLink.blockIds?.length) {
                    return {
                        type: 'doc',
                        id: maybeDocLink.docId,
                    };
                }
            }
            return null;
        };
        /**
         * @deprecated Blocksuite DND is now using pragmatic-dnd as well
         */
        this.resolveBlocksuiteExternalData = (source) => {
            const dndAPI = this.getBlocksuiteDndAPI();
            if (!dndAPI) {
                return null;
            }
            const encoded = source.getStringData(dndAPI.mimeType);
            if (!encoded) {
                return null;
            }
            const snapshot = dndAPI.decodeSnapshot(encoded);
            if (!snapshot) {
                return null;
            }
            const entity = this.resolveBlockSnapshot(snapshot);
            if (!entity) {
                return null;
            }
            return {
                entity,
                from: {
                    at: 'blocksuite-editor',
                },
            };
        };
        this.resolveHTML = html => {
            try {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                // If drag from another secure context, the url-list
                // will be "about:blank#blocked"
                // We can still infer the url-list from the anchor tags
                const urls = Array.from(doc.querySelectorAll('a'))
                    .map(a => a.href)
                    .join('\n');
                return this.resolveUriList(urls);
            }
            catch {
                // ignore the error
                return null;
            }
        };
        this.resolveBlockSnapshot = (snapshot) => {
            for (const block of snapshot.content) {
                if (['affine:embed-linked-doc', 'affine:embed-synced-doc'].includes(block.flavour)) {
                    return {
                        type: 'doc',
                        id: block.props.pageId,
                    };
                }
            }
            return null;
        };
        // order matters
        this.resolvers.push(this.resolveBlocksuiteExternalData);
        const mimeResolvers = [
            ['text/html', this.resolveHTML],
            ['text/uri-list', this.resolveUriList],
        ];
        mimeResolvers.forEach(([type, resolver]) => {
            this.resolvers.push((source) => {
                if (source.types.includes(type)) {
                    const stringData = source.getStringData(type);
                    if (stringData) {
                        const entity = resolver(stringData);
                        if (entity) {
                            return {
                                entity,
                                from: {
                                    at: 'external',
                                },
                            };
                        }
                    }
                }
                return null;
            });
        });
        this.setupBlocksuiteAdapter();
    }
    setupBlocksuiteAdapter() {
        /**
         * Migrate from affine to blocksuite
         * For now, we only support doc
         */
        const affineToBlocksuite = (args) => {
            const data = args.source.data;
            if (data.entity && !data.bsEntity) {
                if (data.entity.type !== 'doc') {
                    return;
                }
                const dndAPI = this.getBlocksuiteDndAPI();
                if (!dndAPI) {
                    return;
                }
                const snapshotSlice = dndAPI.fromEntity({
                    docId: data.entity.id,
                    flavour: 'affine:embed-linked-doc',
                });
                if (!snapshotSlice) {
                    return;
                }
                data.bsEntity = {
                    type: 'blocks',
                    modelIds: [],
                    snapshot: snapshotSlice,
                };
            }
        };
        /**
         * Migrate from blocksuite to affine
         */
        const blocksuiteToAffine = (args) => {
            const data = args.source.data;
            if (!data.entity && data.bsEntity) {
                if (data.bsEntity.type !== 'blocks' || !data.bsEntity.snapshot) {
                    return;
                }
                const dndAPI = this.getBlocksuiteDndAPI();
                if (!dndAPI) {
                    return;
                }
                const entity = this.resolveBlockSnapshot(data.bsEntity.snapshot);
                if (!entity) {
                    return;
                }
                data.entity = entity;
            }
        };
        function adaptDragEvent(args) {
            affineToBlocksuite(args);
            blocksuiteToAffine(args);
        }
        function canMonitor(args) {
            return (args.source.data.entity?.type === 'doc' ||
                (args.source.data.bsEntity?.type === 'blocks' &&
                    !!args.source.data.bsEntity.snapshot));
        }
        function getBSDropTarget(args) {
            for (const target of args.location.current.dropTargets) {
                const { tagName } = target.element;
                if (['AFFINE-EDGELESS-NOTE', 'AFFINE-NOTE'].includes(tagName))
                    return 'note';
                if (tagName === 'AFFINE-EDGELESS-ROOT')
                    return 'canvas';
            }
            return 'other';
        }
        const changeDocCardView = (args) => {
            if (args.source.data.from?.at === 'blocksuite-editor')
                return;
            const dropTarget = getBSDropTarget(args);
            if (dropTarget === 'other')
                return;
            const flavour = dropTarget === 'canvas'
                ? this.editorSettingService.editorSetting.docCanvasPreferView.value
                : 'affine:embed-linked-doc';
            const { entity, bsEntity } = args.source.data;
            if (!entity || !bsEntity)
                return;
            const dndAPI = this.getBlocksuiteDndAPI();
            if (!dndAPI)
                return;
            const snapshotSlice = dndAPI.fromEntity({
                docId: entity.id,
                flavour,
            });
            if (!snapshotSlice)
                return;
            bsEntity.snapshot = snapshotSlice;
        };
        this.disposables.push(monitorForElements({
            canMonitor: (args) => {
                if (canMonitor(args)) {
                    // HACK ahead:
                    // canMonitor shall be used a pure function, which means
                    // we may need to adapt the drag event to make sure the data is applied onDragStart.
                    // However, canMonitor in blocksuite is also called BEFORE onDragStart,
                    // so we need to adapt it here in onMonitor
                    adaptDragEvent(args);
                    return true;
                }
                return false;
            },
            onDropTargetChange: (args) => {
                changeDocCardView(args);
            },
        }));
    }
    getBlocksuiteDndAPI(sourceDocId) {
        const collection = this.workspaceService.workspace.docCollection;
        sourceDocId ??= collection.docs.keys().next().value;
        const doc = sourceDocId ? collection.getDoc(sourceDocId)?.getStore() : null;
        if (!doc) {
            return null;
        }
        const std = new BlockStdScope({
            store: doc,
            extensions: [DNDAPIExtension],
        });
        const dndAPI = std.get(DndApiExtensionIdentifier);
        return dndAPI;
    }
}
//# sourceMappingURL=index.js.map