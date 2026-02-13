import { Entity, LiveData } from '@toeverything/infra';
/**
 * # DocRecord
 *
 * Some data you can use without open a doc.
 */
export class DocRecord extends Entity {
    constructor(docsStore, docPropertiesStore) {
        super();
        this.docsStore = docsStore;
        this.docPropertiesStore = docPropertiesStore;
        this.id = this.props.id;
        this.meta$ = LiveData.from(this.docsStore.watchDocMeta(this.id), {});
        this.properties$ = LiveData.from(this.docPropertiesStore.watchDocProperties(this.id), { id: this.id });
        this.primaryMode$ = LiveData.from(this.docsStore.watchDocPrimaryModeSetting(this.id), 'page').map(mode => (mode === 'edgeless' ? 'edgeless' : 'page'));
        this.title$ = this.meta$.map(meta => meta.title ?? '');
        this.trash$ = this.meta$.map(meta => meta.trash ?? false);
        this.createdAt$ = this.meta$.map(meta => meta.createDate);
        this.updatedAt$ = this.meta$.map(meta => meta.updatedDate);
        this.createdBy$ = this.property$('createdBy');
        this.updatedBy$ = this.property$('updatedBy');
    }
    property$(propertyId) {
        return this.properties$.selector(p => p[propertyId]);
    }
    customProperty$(propertyId) {
        return this.properties$.selector(p => p['custom:' + propertyId]);
    }
    setCustomProperty(propertyId, value) {
        this.docPropertiesStore.updateDocProperties(this.id, {
            ['custom:' + propertyId]: value,
        });
    }
    getProperties() {
        return this.docPropertiesStore.getDocProperties(this.id);
    }
    updateProperties(properties) {
        this.docPropertiesStore.updateDocProperties(this.id, properties);
    }
    setProperty(propertyId, value) {
        this.docPropertiesStore.updateDocProperties(this.id, {
            [propertyId]: value,
        });
    }
    setMeta(meta) {
        this.docsStore.setDocMeta(this.id, meta);
    }
    setPrimaryMode(mode) {
        return this.docsStore.setDocPrimaryModeSetting(this.id, mode);
    }
    getPrimaryMode() {
        return this.docsStore.getDocPrimaryModeSetting(this.id);
    }
    moveToTrash() {
        return this.setMeta({ trash: true, trashDate: Date.now() });
    }
    restoreFromTrash() {
        return this.setMeta({ trash: false, trashDate: undefined });
    }
    setCreatedAt(createdAt) {
        this.setMeta({ createDate: createdAt });
    }
    setUpdatedAt(updatedAt) {
        this.setMeta({ updatedDate: updatedAt });
    }
    setCreatedBy(createdBy) {
        this.setProperty('createdBy', createdBy);
    }
    setUpdatedBy(updatedBy) {
        this.setProperty('updatedBy', updatedBy);
    }
}
//# sourceMappingURL=record.js.map