import { Entity, generateFractionalIndexingKeyBetween, } from '@toeverything/infra';
export class FavoriteList extends Entity {
    constructor(store) {
        super();
        this.store = store;
        this.list$ = this.store.watchFavorites();
        this.sortedList$ = this.list$.map(v => v.sort((a, b) => (a.index > b.index ? 1 : -1)));
        this.isLoading$ = this.store.watchIsLoading();
    }
    /**
     * get favorite record by type and id
     */
    favorite$(type, id) {
        return this.store.watchFavorite(type, id);
    }
    isFavorite$(type, id) {
        return this.favorite$(type, id).map(v => !!v);
    }
    add(type, id, index = this.indexAt('before')) {
        return this.store.addFavorite(type, id, index);
    }
    toggle(type, id, index = this.indexAt('before')) {
        if (this.favorite$(type, id).value) {
            return this.remove(type, id);
        }
        else {
            return this.add(type, id, index);
        }
    }
    remove(type, id) {
        return this.store.removeFavorite(type, id);
    }
    reorder(type, id, index) {
        return this.store.reorderFavorite(type, id, index);
    }
    indexAt(at, targetRecord) {
        if (!targetRecord) {
            if (at === 'before') {
                const first = this.sortedList$.value.at(0);
                return generateFractionalIndexingKeyBetween(null, first?.index || null);
            }
            else {
                const last = this.sortedList$.value.at(-1);
                return generateFractionalIndexingKeyBetween(last?.index || null, null);
            }
        }
        else {
            const sortedChildren = this.sortedList$.value;
            const targetIndex = sortedChildren.findIndex(node => node.id === targetRecord.id && node.type === targetRecord.type);
            if (targetIndex === -1) {
                throw new Error('Target favorite record not found');
            }
            const target = sortedChildren[targetIndex];
            const before = sortedChildren[targetIndex - 1] || null;
            const after = sortedChildren[targetIndex + 1] || null;
            if (at === 'before') {
                return generateFractionalIndexingKeyBetween(before?.index || null, target.index);
            }
            else {
                return generateFractionalIndexingKeyBetween(target.index, after?.index || null);
            }
        }
    }
}
//# sourceMappingURL=favorite-list.js.map