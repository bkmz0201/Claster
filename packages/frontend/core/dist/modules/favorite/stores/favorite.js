import { LiveData, Store } from '@toeverything/infra';
import { map } from 'rxjs';
import { isFavoriteSupportType } from '../constant';
export class FavoriteStore extends Store {
    constructor(workspaceDBService) {
        super();
        this.workspaceDBService = workspaceDBService;
    }
    watchIsLoading() {
        return this.workspaceDBService.userdataDB$
            .map(db => LiveData.from(db.favorite.isLoading$, false))
            .flat();
    }
    watchFavorites() {
        return this.workspaceDBService.userdataDB$
            .map(db => LiveData.from(db.favorite.find$(), []))
            .flat()
            .map(raw => {
            return raw
                .map(data => this.toRecord(data))
                .filter((record) => !!record);
        });
    }
    addFavorite(type, id, index) {
        const db = this.workspaceDBService.userdataDB$.value;
        const raw = db.favorite.create({
            key: this.encodeKey(type, id),
            index,
        });
        return this.toRecord(raw);
    }
    reorderFavorite(type, id, index) {
        const db = this.workspaceDBService.userdataDB$.value;
        db.favorite.update(this.encodeKey(type, id), { index });
    }
    removeFavorite(type, id) {
        const db = this.workspaceDBService.userdataDB$.value;
        db.favorite.delete(this.encodeKey(type, id));
    }
    watchFavorite(type, id) {
        const db = this.workspaceDBService.userdataDB$.value;
        return LiveData.from(db.favorite
            .get$(this.encodeKey(type, id))
            .pipe(map(data => (data ? this.toRecord(data) : undefined))), null);
    }
    toRecord(data) {
        const key = this.parseKey(data.key);
        if (!key) {
            return undefined;
        }
        return {
            type: key.type,
            id: key.id,
            index: data.index,
        };
    }
    /**
     * parse favorite key
     * key format: ${type}:${id}
     * type: collection | doc | tag
     * @returns null if key is invalid
     */
    parseKey(key) {
        const [type, id] = key.split(':');
        if (!type || !id) {
            return null;
        }
        if (!isFavoriteSupportType(type)) {
            return null;
        }
        return { type: type, id };
    }
    encodeKey(type, id) {
        return `${type}:${id}`;
    }
}
//# sourceMappingURL=favorite.js.map