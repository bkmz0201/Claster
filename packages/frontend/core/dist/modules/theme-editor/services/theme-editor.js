import { LiveData, Service } from '@toeverything/infra';
import { map } from 'rxjs';
export class ThemeEditorService extends Service {
    constructor(globalState) {
        super();
        this.globalState = globalState;
        this._key = 'custom-theme';
        this.customTheme$ = LiveData.from(this.globalState.watch(this._key).pipe(map(value => {
            if (!value)
                return { light: {}, dark: {} };
            if (!value.light)
                value.light = {};
            if (!value.dark)
                value.dark = {};
            const removeEmpty = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v));
            return {
                light: removeEmpty(value.light),
                dark: removeEmpty(value.dark),
            };
        })), { light: {}, dark: {} });
        this.modified$ = LiveData.computed(get => {
            const theme = get(this.customTheme$);
            const isEmptyObj = (obj) => Object.keys(obj).length === 0;
            return theme && !(isEmptyObj(theme.light) && isEmptyObj(theme.dark));
        });
    }
    reset() {
        this.globalState.set(this._key, { light: {}, dark: {} });
    }
    setCustomTheme(theme) {
        this.globalState.set(this._key, theme);
    }
    updateCustomTheme(mode, key, value) {
        const prev = this.globalState.get(this._key) ?? {
            light: {},
            dark: {},
        };
        const next = {
            ...prev,
            [mode]: {
                ...prev[mode],
                [key]: value,
            },
        };
        if (!value) {
            delete next[mode][key];
        }
        this.globalState.set(this._key, next);
    }
}
//# sourceMappingURL=theme-editor.js.map