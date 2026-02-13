import { Store, yjsGetPath, yjsObserve, yjsObserveDeep, yjsObservePath, } from '@toeverything/infra';
import { nanoid } from 'nanoid';
import { distinctUntilChanged, map, switchMap } from 'rxjs';
import { Array as YArray, Map as YMap, transact } from 'yjs';
export class DocsStore extends Store {
    constructor(workspaceService, docPropertiesStore) {
        super();
        this.workspaceService = workspaceService;
        this.docPropertiesStore = docPropertiesStore;
    }
    getBlockSuiteDoc(id) {
        return (this.workspaceService.workspace.docCollection
            .getDoc(id)
            ?.getStore({ id }) ?? null);
    }
    getBlocksuiteCollection() {
        return this.workspaceService.workspace.docCollection;
    }
    createDoc(docId) {
        const id = docId ?? nanoid();
        transact(this.workspaceService.workspace.rootYDoc, () => {
            const docs = this.workspaceService.workspace.rootYDoc
                .getMap('meta')
                .get('pages');
            if (!docs || !(docs instanceof YArray)) {
                return;
            }
            docs.push([
                new YMap([
                    ['id', id],
                    ['title', ''],
                    ['createDate', Date.now()],
                    ['tags', new YArray()],
                ]),
            ]);
        }, { force: true });
        return id;
    }
    watchDocIds() {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'pages').pipe(switchMap(yjsObserve), map(meta => {
            if (meta instanceof YArray) {
                return meta.map(v => v.get('id'));
            }
            else {
                return [];
            }
        }));
    }
    watchAllDocUpdatedDate() {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'pages').pipe(switchMap(pages => yjsObservePath(pages, '*.updatedDate')), map(pages => {
            if (pages instanceof YArray) {
                return pages.map(v => ({
                    id: v.get('id'),
                    updatedDate: v.get('updatedDate'),
                }));
            }
            else {
                return [];
            }
        }));
    }
    watchAllDocTagIds() {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'pages').pipe(switchMap(pages => yjsObservePath(pages, '*.tags')), map(pages => {
            if (pages instanceof YArray) {
                return pages.map(v => ({
                    id: v.get('id'),
                    tags: (() => {
                        const tags = v.get('tags');
                        if (tags instanceof YArray) {
                            return tags.toJSON();
                        }
                        return (tags ?? []);
                    })(),
                }));
            }
            else {
                return [];
            }
        }));
    }
    watchAllDocCreateDate() {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'pages').pipe(switchMap(pages => yjsObservePath(pages, '*.createDate')), map(pages => {
            if (pages instanceof YArray) {
                return pages.map(v => ({
                    id: v.get('id'),
                    createDate: (v.get('createDate') ?? 0),
                }));
            }
            else {
                return [];
            }
        }));
    }
    watchAllDocTitle() {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'pages').pipe(switchMap(pages => yjsObservePath(pages, '*.title')), map(pages => {
            if (pages instanceof YArray) {
                return pages.map(v => ({
                    id: v.get('id'),
                    title: (v.get('title') ?? ''),
                }));
            }
            else {
                return [];
            }
        }));
    }
    watchNonTrashDocIds() {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'pages').pipe(switchMap(pages => yjsObservePath(pages, '*.trash')), map(meta => {
            if (meta instanceof YArray) {
                return meta
                    .map(v => (v.get('trash') ? null : v.get('id')))
                    .filter(Boolean);
            }
            else {
                return [];
            }
        }));
    }
    watchTrashDocIds() {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'pages').pipe(switchMap(pages => yjsObservePath(pages, '*.trash')), map(meta => {
            if (meta instanceof YArray) {
                return meta
                    .map(v => (v.get('trash') ? v.get('id') : null))
                    .filter(Boolean);
            }
            else {
                return [];
            }
        }));
    }
    watchDocMeta(id) {
        let docMetaIndexCache = -1;
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'pages').pipe(switchMap(yjsObserve), map(meta => {
            if (meta instanceof YArray) {
                if (docMetaIndexCache >= 0) {
                    const doc = meta.get(docMetaIndexCache);
                    if (doc && doc.get('id') === id) {
                        return doc;
                    }
                }
                // meta is YArray, `for-of` is faster then `for`
                let i = 0;
                for (const doc of meta) {
                    if (doc && doc.get('id') === id) {
                        docMetaIndexCache = i;
                        return doc;
                    }
                    i++;
                }
                return null;
            }
            else {
                return null;
            }
        }), switchMap(yjsObserveDeep), map(meta => {
            if (meta instanceof YMap) {
                return meta.toJSON();
            }
            else {
                return {};
            }
        }));
    }
    watchDocListReady() {
        return this.workspaceService.workspace.engine.doc
            .docState$(this.workspaceService.workspace.id)
            .pipe(map(state => state.synced));
    }
    setDocMeta(id, meta) {
        this.workspaceService.workspace.docCollection.meta.setDocMeta(id, meta);
    }
    setDocPrimaryModeSetting(id, mode) {
        return this.docPropertiesStore.updateDocProperties(id, {
            primaryMode: mode,
        });
    }
    getDocPrimaryModeSetting(id) {
        return this.docPropertiesStore.getDocProperties(id)?.primaryMode;
    }
    watchDocPrimaryModeSetting(id) {
        return this.docPropertiesStore.watchDocProperties(id).pipe(map(config => config?.primaryMode), distinctUntilChanged((p, c) => p === c));
    }
    waitForDocLoadReady(id) {
        return this.workspaceService.workspace.engine.doc.waitForDocLoaded(id);
    }
    addPriorityLoad(id, priority) {
        return this.workspaceService.workspace.engine.doc.addPriority(id, priority);
    }
}
//# sourceMappingURL=docs.js.map