import { jsx as _jsx } from "react/jsx-runtime";
import { track } from '@affine/track';
import { SettingsIcon } from '@blocksuite/icons/rc';
import { registerAffineCommand } from './registry';
export function registerAffineLanguageCommands({ i18n, t, }) {
    // Display Language
    const disposables = i18n.languageList.map(language => {
        return registerAffineCommand({
            id: `affine:change-display-language-to-${language.name}`,
            label: `${t['com.affine.cmdk.affine.display-language.to']()} ${language.originalName}`,
            category: 'affine:settings',
            icon: _jsx(SettingsIcon, {}),
            preconditionStrategy: () => i18n.currentLanguage$.value.key !== language.key,
            run() {
                track.$.cmdk.settings.changeAppSetting({
                    key: 'language',
                    value: language.name,
                });
                i18n.changeLanguage(language.key);
            },
        });
    });
    return () => {
        disposables.forEach(dispose => dispose());
    };
}
//# sourceMappingURL=affine-i18n.js.map