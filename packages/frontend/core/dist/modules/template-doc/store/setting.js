import { LiveData, Store } from '@toeverything/infra';
export class TemplateDocSettingStore extends Store {
    constructor(dbService) {
        super();
        this.dbService = dbService;
        this.key = 'templateDoc';
    }
    watchIsLoading() {
        return this.dbService.userdataDB$
            .map(db => LiveData.from(db.settings.isLoading$, false))
            .flat();
    }
    watchSetting() {
        return this.dbService.userdataDB$
            .map(db => LiveData.from(db.settings.find$({ key: this.key }), []))
            .flat()
            .map(raw => raw?.[0]?.value);
    }
    watchSettingKey(key) {
        return this.dbService.userdataDB$
            .map(db => LiveData.from(db.settings.find$({ key: this.key }), []))
            .flat()
            .map(raw => {
            const value = raw?.[0]?.value;
            if (!value)
                return undefined;
            return value[key];
        });
    }
    updateSetting(key, value) {
        const db = this.dbService.userdataDB$.value;
        const prev = db.settings.find({ key: this.key })[0]?.value ?? {};
        db.settings.create({
            key: this.key,
            value: { ...prev, [key]: value },
        });
    }
}
//# sourceMappingURL=setting.js.map