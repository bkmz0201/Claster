import { generateFractionalIndexingKeyBetween, LiveData, Service, } from '@toeverything/infra';
export class WorkspacePropertyService extends Service {
    constructor(workspacePropertiesStore) {
        super();
        this.workspacePropertiesStore = workspacePropertiesStore;
        this.properties$ = LiveData.from(this.workspacePropertiesStore.watchWorkspaceProperties(), []);
        this.sortedProperties$ = this.properties$.map(list => 
        // default index key is '', so always before any others
        list.toSorted((a, b) => ((a.index ?? '') > (b.index ?? '') ? 1 : -1)));
    }
    propertyInfo$(id) {
        return this.properties$.map(list => list.find(info => info.id === id));
    }
    updatePropertyInfo(id, properties) {
        this.workspacePropertiesStore.updateWorkspaceProperty(id, properties);
    }
    createProperty(properties) {
        return this.workspacePropertiesStore.createWorkspaceProperty(properties);
    }
    removeProperty(id) {
        this.workspacePropertiesStore.removeWorkspaceProperty(id);
    }
    indexAt(at, targetId) {
        const sortedChildren = this.sortedProperties$.value.filter(node => node.index);
        const targetIndex = targetId
            ? sortedChildren.findIndex(node => node.id === targetId)
            : -1;
        if (targetIndex === -1) {
            if (at === 'before') {
                const first = sortedChildren.at(0);
                return generateFractionalIndexingKeyBetween(null, first?.index ?? null);
            }
            else {
                const last = sortedChildren.at(-1);
                return generateFractionalIndexingKeyBetween(last?.index ?? null, null);
            }
        }
        else {
            const target = sortedChildren[targetIndex];
            const before = sortedChildren[targetIndex - 1] || null;
            const after = sortedChildren[targetIndex + 1] || null;
            if (at === 'before') {
                return generateFractionalIndexingKeyBetween(before?.index ?? null, target.index);
            }
            else {
                return generateFractionalIndexingKeyBetween(target.index, after?.index ?? null);
            }
        }
    }
}
//# sourceMappingURL=workspace-property.js.map