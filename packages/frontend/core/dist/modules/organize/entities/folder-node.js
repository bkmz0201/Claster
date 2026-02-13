import { Entity, generateFractionalIndexingKeyBetween, LiveData, } from '@toeverything/infra';
import { map, of, switchMap } from 'rxjs';
export class FolderNode extends Entity {
    constructor(store) {
        super();
        this.store = store;
        this.id = this.props.id;
        this.info$ = LiveData.from(this.store.watchNodeInfo(this.id ?? ''), null);
        this.type$ = this.info$.map(info => this.id === null ? 'folder' : (info?.type ?? ''));
        this.data$ = this.info$.map(info => info?.data);
        this.name$ = this.info$.map(info => (info?.type === 'folder' ? info.data : ''));
        this.children$ = LiveData.from(
        // watch children if this is a folder, otherwise return empty array
        this.type$.pipe(switchMap(type => type === 'folder'
            ? this.store
                .watchNodeChildren(this.id)
                .pipe(map(children => children
                .filter(e => this.filterInvalidChildren(e))
                .map(child => this.framework.createEntity(FolderNode, child))))
                .pipe()
            : of([]))), []);
        this.sortedChildren$ = LiveData.computed(get => {
            return get(this.children$)
                .map(node => [node, get(node.index$)])
                .sort((a, b) => (a[1] > b[1] ? 1 : -1))
                .map(([node]) => node);
        });
        this.index$ = this.info$.map(info => info?.index ?? '');
    }
    contains(childId) {
        if (!this.id) {
            return true;
        }
        if (!childId) {
            return false;
        }
        return this.store.isAncestor(childId, this.id);
    }
    beChildOf(parentId) {
        if (!this.id) {
            return false;
        }
        if (!parentId) {
            return true;
        }
        return this.store.isAncestor(this.id, parentId);
    }
    filterInvalidChildren(child) {
        if (this.id === null && child.type !== 'folder') {
            return false; // root node can only have folders
        }
        return true;
    }
    createFolder(name, index) {
        if (this.type$.value !== 'folder') {
            throw new Error('Cannot create folder on non-folder node');
        }
        return this.store.createFolder(this.id, name, index);
    }
    createLink(type, targetId, index) {
        if (this.id === null) {
            throw new Error('Cannot create link on root node');
        }
        if (this.type$.value !== 'folder') {
            throw new Error('Cannot create link on non-folder node');
        }
        this.store.createLink(this.id, type, targetId, index);
    }
    delete() {
        if (this.id === null) {
            throw new Error('Cannot delete root node');
        }
        if (this.type$.value === 'folder') {
            this.store.removeFolder(this.id);
        }
        else {
            this.store.removeLink(this.id);
        }
    }
    moveHere(childId, index) {
        this.store.moveNode(childId, this.id, index);
    }
    rename(name) {
        if (this.id === null) {
            throw new Error('Cannot rename root node');
        }
        this.store.renameNode(this.id, name);
    }
    indexAt(at, targetId) {
        if (!targetId) {
            if (at === 'before') {
                const first = this.sortedChildren$.value.at(0);
                return generateFractionalIndexingKeyBetween(null, first?.index$.value || null);
            }
            else {
                const last = this.sortedChildren$.value.at(-1);
                return generateFractionalIndexingKeyBetween(last?.index$.value || null, null);
            }
        }
        else {
            const sortedChildren = this.sortedChildren$.value;
            const targetIndex = sortedChildren.findIndex(node => node.id === targetId);
            if (targetIndex === -1) {
                throw new Error('Target node not found');
            }
            const target = sortedChildren[targetIndex];
            const before = sortedChildren[targetIndex - 1] || null;
            const after = sortedChildren[targetIndex + 1] || null;
            if (at === 'before') {
                return generateFractionalIndexingKeyBetween(before?.index$.value || null, target.index$.value);
            }
            else {
                return generateFractionalIndexingKeyBetween(target.index$.value, after?.index$.value || null);
            }
        }
    }
}
//# sourceMappingURL=folder-node.js.map