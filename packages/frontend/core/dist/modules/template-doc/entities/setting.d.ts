import { Entity } from '@toeverything/infra';
import type { TemplateDocSettingStore } from '../store/setting';
export declare class TemplateDocSetting extends Entity {
    private readonly store;
    constructor(store: TemplateDocSettingStore);
    loading$: import("@toeverything/infra").LiveData<boolean>;
    setting$: import("@toeverything/infra").LiveData<import("../type").TemplateDocSettings>;
    enablePageTemplate$: import("@toeverything/infra").LiveData<boolean | undefined>;
    pageTemplateDocId$: import("@toeverything/infra").LiveData<string | undefined>;
    journalTemplateDocId$: import("@toeverything/infra").LiveData<string | undefined>;
    togglePageTemplate(enable: boolean): void;
    updatePageTemplateDocId(id?: string): void;
    updateJournalTemplateDocId(id?: string): void;
}
//# sourceMappingURL=setting.d.ts.map