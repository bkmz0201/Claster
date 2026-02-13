import { createSignalFromObservable, } from '@blocksuite/affine/shared/utils';
import { Entity, LiveData } from '@toeverything/infra';
import { isObject, merge } from 'lodash-es';
import { map } from 'rxjs';
import { EditorSettingSchema } from '../schema';
export class EditorSetting extends Entity {
    constructor(provider) {
        super();
        this.provider = provider;
        this.settings$ = LiveData.from(this.watchAll(), null);
        const { signal, cleanup } = createSignalFromObservable(this.settings$, {});
        this.settingSignal = signal;
        this.disposables.push(cleanup);
        Object.entries(EditorSettingSchema.shape).forEach(([flagKey, flag]) => {
            const livedata$ = this.settings$.selector(s => s[flagKey]);
            const item = {
                ...flag,
                get value() {
                    return livedata$.value;
                },
                set: (value) => {
                    this.set(flagKey, value);
                },
                $: livedata$,
            };
            Object.defineProperty(this, flagKey, {
                get: () => {
                    return item;
                },
            });
        });
    }
    get(key) {
        return this.settings$.value[key];
    }
    set(key, value) {
        const schema = EditorSettingSchema.shape[key];
        const curValue = this.get(key);
        const nextValue = isObject(curValue) ? merge(curValue, value) : value;
        this.provider.set(key, JSON.stringify(schema.parse(nextValue)));
    }
    watchAll() {
        return this.provider.watchAll().pipe(map(all => Object.fromEntries(Object.entries(EditorSettingSchema.shape).map(([key, schema]) => {
            const value = all[key];
            const parsed = schema.safeParse(value ? JSON.parse(value) : undefined);
            return [
                key,
                // if parsing fails, return the default value
                parsed.success ? parsed.data : schema.parse(undefined),
            ];
        }))));
    }
}
//# sourceMappingURL=editor-setting.js.map