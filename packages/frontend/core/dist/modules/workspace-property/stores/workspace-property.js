import { Store, yjsGetPath, yjsObserveDeep } from '@toeverything/infra';
import { differenceBy } from 'lodash-es';
import { combineLatest, map, switchMap } from 'rxjs';
import { AbstractType as YAbstractType } from 'yjs';
import { BUILT_IN_CUSTOM_PROPERTY_TYPE } from '../constants';
export class WorkspacePropertyStore extends Store {
    constructor(workspaceService, dbService) {
        super();
        this.workspaceService = workspaceService;
        this.dbService = dbService;
    }
    getWorkspaceProperties() {
        const db = this.dbService.db.docCustomPropertyInfo.find();
        const legacy = this.upgradeLegacyWorkspacePropertyInfoList(this.getLegacyWorkspacePropertyInfoList());
        const builtIn = BUILT_IN_CUSTOM_PROPERTY_TYPE;
        const withLegacy = [...db, ...differenceBy(legacy, db, i => i.id)];
        const all = [
            ...withLegacy,
            ...differenceBy(builtIn, withLegacy, i => i.id),
        ];
        return all.filter(i => !i.isDeleted);
    }
    createWorkspaceProperty(config) {
        return this.dbService.db.docCustomPropertyInfo.create(config);
    }
    removeWorkspaceProperty(id) {
        this.updateWorkspaceProperty(id, {
            additionalData: {}, // also remove additional data to reduce size
            isDeleted: true,
        });
    }
    updateWorkspaceProperty(id, config) {
        const needMigration = !this.dbService.db.docCustomPropertyInfo.get(id);
        const isBuiltIn = needMigration && BUILT_IN_CUSTOM_PROPERTY_TYPE.some(i => i.id === id);
        if (isBuiltIn) {
            this.createWorkspacePropertyFromBuiltIn(id, config);
        }
        else if (needMigration) {
            // if this property is not in db, we need to migration it from legacy to db, only type and name is needed
            this.migrateLegacyWorkspaceProperty(id, config);
        }
        else {
            this.dbService.db.docCustomPropertyInfo.update(id, config);
        }
    }
    migrateLegacyWorkspaceProperty(id, override) {
        const legacy = this.getLegacyWorkspacePropertyInfo(id);
        this.dbService.db.docCustomPropertyInfo.create({
            id,
            type: (legacy?.type ??
                'unknown') /* should never reach here, just for safety, we need handle unknown property type */,
            name: legacy?.name,
            ...override,
        });
    }
    createWorkspacePropertyFromBuiltIn(id, override) {
        const builtIn = BUILT_IN_CUSTOM_PROPERTY_TYPE.find(i => i.id === id);
        if (!builtIn) {
            return;
        }
        this.createWorkspaceProperty({ ...builtIn, ...override });
    }
    watchWorkspaceProperties() {
        return combineLatest([
            this.watchLegacyWorkspacePropertyInfoList().pipe(map(this.upgradeLegacyWorkspacePropertyInfoList)),
            this.dbService.db.docCustomPropertyInfo.find$(),
        ]).pipe(map(([legacy, db]) => {
            const builtIn = BUILT_IN_CUSTOM_PROPERTY_TYPE;
            const withLegacy = [...db, ...differenceBy(legacy, db, i => i.id)];
            const all = [
                ...withLegacy,
                ...differenceBy(builtIn, withLegacy, i => i.id),
            ];
            return all.filter(i => !i.isDeleted);
        }));
    }
    upgradeLegacyWorkspacePropertyInfoList(infoList) {
        if (!infoList) {
            return [];
        }
        const newInfoList = [];
        for (const [id, info] of Object.entries(infoList ?? {})) {
            if (info?.type) {
                newInfoList.push({
                    id,
                    name: info.name,
                    type: info.type,
                    icon: info.icon,
                });
            }
        }
        return newInfoList;
    }
    getLegacyWorkspacePropertyInfoList() {
        return this.workspaceService.workspace.rootYDoc
            .getMap('affine:workspace-properties')
            .get('schema')
            ?.get('pageProperties')
            ?.get('custom')
            ?.toJSON();
    }
    watchLegacyWorkspacePropertyInfoList() {
        return yjsGetPath(this.workspaceService.workspace.rootYDoc.getMap('affine:workspace-properties'), 'schema.pageProperties.custom').pipe(switchMap(yjsObserveDeep), map(p => (p instanceof YAbstractType ? p.toJSON() : p)));
    }
    getLegacyWorkspacePropertyInfo(id) {
        return this.workspaceService.workspace.rootYDoc
            .getMap('affine:workspace-properties')
            .get('schema')
            ?.get('pageProperties')
            ?.get('custom')
            ?.get(id)
            ?.toJSON();
    }
}
//# sourceMappingURL=workspace-property.js.map