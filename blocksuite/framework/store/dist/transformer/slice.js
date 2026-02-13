import { BlockModel, toDraftModel, } from '../model/index';
export class Slice {
    get content() {
        return this.data.content;
    }
    get docId() {
        return this.data.pageId;
    }
    get workspaceId() {
        return this.data.workspaceId;
    }
    constructor(data) {
        this.data = data;
    }
    static fromModels(doc, models) {
        const draftModels = models.map(model => {
            if (model instanceof BlockModel) {
                return toDraftModel(model);
            }
            return model;
        });
        return new Slice({
            content: draftModels,
            workspaceId: doc.workspace.id,
            pageId: doc.id,
        });
    }
}
//# sourceMappingURL=slice.js.map