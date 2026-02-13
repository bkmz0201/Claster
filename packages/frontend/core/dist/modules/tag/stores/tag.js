import { LiveData, Store, yjsGetPath, yjsObserveDeep, yjsObservePath, } from '@toeverything/infra';
import { nanoid } from 'nanoid';
import { map, switchMap } from 'rxjs';
import { Array as YArray } from 'yjs';
export class TagStore extends Store {
    get properties() {
        return this.workspaceService.workspace.docCollection.meta.properties;
    }
    subscribe(cb) {
        const disposable = this.workspaceService.workspace.docCollection.slots.docListUpdated.subscribe(cb);
        return disposable.unsubscribe.bind(disposable);
    }
    constructor(workspaceService) {
        super();
        this.workspaceService = workspaceService;
        this.tagOptions$ = LiveData.from(yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'properties.tags.options').pipe(switchMap(yjsObserveDeep), map(tagOptions => {
            if (tagOptions instanceof YArray) {
                return tagOptions.toJSON();
            }
            else {
                return [];
            }
        })), []);
        this.updateProperties = (properties) => {
            this.workspaceService.workspace.docCollection.meta.setProperties(properties);
        };
        this.updateTagOptions = (options) => {
            this.updateProperties({
                ...this.properties,
                tags: {
                    options,
                },
            });
        };
        this.updateTagOption = (id, option) => {
            this.updateTagOptions(this.tagOptions$.value.map(o => (o.id === id ? option : o)));
        };
        this.removeTagOption = (id) => {
            this.workspaceService.workspace.docCollection.doc.transact(() => {
                this.updateTagOptions(this.tagOptions$.value.filter(o => o.id !== id));
                // need to remove tag from all pages
                this.workspaceService.workspace.docCollection.docs.forEach(doc => {
                    const tags = doc.meta?.tags ?? [];
                    if (tags.includes(id)) {
                        this.updatePageTags(doc.id, tags.filter(t => t !== id));
                    }
                });
            });
        };
        this.updatePageTags = (pageId, tags) => {
            this.workspaceService.workspace.docCollection.meta.setDocMeta(pageId, {
                tags,
            });
        };
    }
    watchTagIds() {
        return this.tagOptions$.map(tags => tags.map(tag => tag.id)).asObservable();
    }
    createNewTag(value, color) {
        const newId = nanoid();
        this.updateTagOptions([
            ...this.tagOptions$.value,
            {
                id: newId,
                value,
                color,
                createDate: Date.now(),
                updateDate: Date.now(),
            },
        ]);
        return newId;
    }
    deleteTag(id) {
        this.removeTagOption(id);
    }
    watchTagInfo(id) {
        return this.tagOptions$.map(tags => tags.find(tag => tag.id === id));
    }
    updateTagInfo(id, tagInfo) {
        const tag = this.tagOptions$.value.find(tag => tag.id === id);
        if (!tag) {
            return;
        }
        this.updateTagOption(id, {
            id: id,
            value: tag.value,
            color: tag.color,
            createDate: tag.createDate,
            updateDate: Date.now(),
            ...tagInfo,
        });
    }
    watchTagPageIds(id) {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('meta'), 'pages').pipe(switchMap(pages => {
            return yjsObservePath(pages, '*.tags');
        }), map(meta => {
            if (meta instanceof YArray) {
                return meta
                    .map(v => {
                    const tags = v.get('tags');
                    if (tags instanceof YArray) {
                        for (const tagId of tags.toArray()) {
                            if (tagId === id) {
                                return v.get('id');
                            }
                        }
                    }
                    return null;
                })
                    .filter(Boolean);
            }
            else {
                return [];
            }
        }));
    }
}
//# sourceMappingURL=tag.js.map