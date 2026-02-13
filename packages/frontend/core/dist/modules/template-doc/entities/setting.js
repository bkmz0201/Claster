import { Entity } from '@toeverything/infra';
export class TemplateDocSetting extends Entity {
    constructor(store) {
        super();
        this.store = store;
        this.loading$ = this.store.watchIsLoading();
        this.setting$ = this.store.watchSetting();
        this.enablePageTemplate$ = this.store.watchSettingKey('enablePageTemplate');
        this.pageTemplateDocId$ = this.store.watchSettingKey('pageTemplateId');
        this.journalTemplateDocId$ = this.store.watchSettingKey('journalTemplateId');
    }
    togglePageTemplate(enable) {
        this.store.updateSetting('enablePageTemplate', enable);
    }
    updatePageTemplateDocId(id) {
        this.store.updateSetting('pageTemplateId', id);
    }
    updateJournalTemplateDocId(id) {
        this.store.updateSetting('journalTemplateId', id);
    }
}
//# sourceMappingURL=setting.js.map