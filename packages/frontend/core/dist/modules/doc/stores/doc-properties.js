import { LiveData, Store, yjsGetPath, yjsObserveDeep, } from '@toeverything/infra';
import { isNil, omitBy } from 'lodash-es';
import { combineLatest, map, switchMap } from 'rxjs';
import { AbstractType as YAbstractType } from 'yjs';
export class DocPropertiesStore extends Store {
    constructor(workspaceService, dbService) {
        super();
        this.workspaceService = workspaceService;
        this.dbService = dbService;
    }
    updateDocProperties(id, config) {
        return this.dbService.db.docProperties.create({
            id,
            ...config,
        });
    }
    getDocProperties(id) {
        return {
            ...this.upgradeLegacyDocProperties(this.getLegacyDocProperties(id)),
            ...omitBy(this.dbService.db.docProperties.get(id), isNil),
            // db always override legacy, but nil value should not override
        };
    }
    watchDocProperties(id) {
        return combineLatest([
            this.watchLegacyDocProperties(id).pipe(map(this.upgradeLegacyDocProperties)),
            this.dbService.db.docProperties.get$(id),
        ]).pipe(map(([legacy, db]) => ({
            ...legacy,
            ...omitBy(db, isNil), // db always override legacy, but nil value should not override
        })));
    }
    /**
     * find doc ids by property key and value
     *
     * this apis will not include legacy properties
     */
    watchPropertyAllValues(propertyKey) {
        return LiveData.from(this.dbService.db.docProperties
            .select$(propertyKey)
            .pipe(map(o => new Map(o.map(i => [i.id, i[propertyKey]])))), new Map());
    }
    upgradeLegacyDocProperties(properties) {
        if (!properties) {
            return {};
        }
        const newProperties = {};
        for (const [key, info] of Object.entries(properties.system ?? {})) {
            if (info?.value !== undefined && info.value !== null) {
                newProperties[key] = info.value.toString();
            }
        }
        for (const [key, info] of Object.entries(properties.custom ?? {})) {
            if (info?.value !== undefined && info.value !== null) {
                newProperties['custom:' + key] = info.value.toString();
            }
        }
        return newProperties;
    }
    getLegacyDocProperties(id) {
        return this.workspaceService.workspace.rootYDoc
            .getMap('affine:workspace-properties')
            .get('pageProperties')
            ?.get(id)
            ?.toJSON();
    }
    watchLegacyDocProperties(id) {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('affine:workspace-properties'), `pageProperties.${id}`).pipe(switchMap(yjsObserveDeep), map(p => (p instanceof YAbstractType ? p.toJSON() : p)));
    }
}
//# sourceMappingURL=doc-properties.js.map