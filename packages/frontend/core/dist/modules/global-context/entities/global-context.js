import { Entity, LiveData, MemoryMemento } from '@toeverything/infra';
export class GlobalContext extends Entity {
    constructor() {
        super(...arguments);
        this.memento = new MemoryMemento();
        this.workspaceId = this.define('workspaceId');
        this.workspaceFlavour = this.define('workspaceFlavour');
        this.serverId = this.define('serverId', 'affine-cloud');
        /**
         * is in doc page
         */
        this.isDoc = this.define('isDoc');
        this.isTrashDoc = this.define('isTrashDoc');
        this.docId = this.define('docId');
        this.docMode = this.define('docMode');
        /**
         * is in collection page
         */
        this.isCollection = this.define('isCollection');
        this.collectionId = this.define('collectionId');
        /**
         * is in trash page
         */
        this.isTrash = this.define('isTrash');
        /**
         * is in tag page
         */
        this.isTag = this.define('isTag');
        this.tagId = this.define('tagId');
        /**
         * is in all docs page
         */
        this.isAllDocs = this.define('isAllDocs');
    }
    define(key, defaultValue = null) {
        this.memento.set(key, defaultValue);
        const livedata$ = LiveData.from(this.memento.watch(key), defaultValue);
        return {
            get: () => this.memento.get(key),
            set: (value) => {
                this.memento.set(key, value);
            },
            $: livedata$,
        };
    }
}
//# sourceMappingURL=global-context.js.map