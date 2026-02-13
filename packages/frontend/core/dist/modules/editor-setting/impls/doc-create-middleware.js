import { Service } from '@toeverything/infra';
const getValueByDefaultTheme = (defaultTheme, currentAppTheme) => {
    switch (defaultTheme) {
        case 'dark':
            return 'dark';
        case 'light':
            return 'light';
        case 'specified':
            return currentAppTheme === 'dark' ? 'dark' : 'light';
        case 'auto':
            return 'system';
        default:
            return 'system';
    }
};
export class EditorSettingDocCreateMiddleware extends Service {
    constructor(editorSettingService, appThemeService) {
        super();
        this.editorSettingService = editorSettingService;
        this.appThemeService = appThemeService;
    }
    beforeCreate(docCreateOptions) {
        // clone the docCreateOptions to avoid mutating the original object
        docCreateOptions = {
            ...docCreateOptions,
        };
        const preferMode = this.editorSettingService.editorSetting.settings$.value.newDocDefaultMode;
        const mode = preferMode === 'ask' ? 'page' : preferMode;
        docCreateOptions.primaryMode ??= mode;
        docCreateOptions.docProps = {
            ...docCreateOptions.docProps,
            note: this.editorSettingService.editorSetting.get('affine:note'),
        };
        return docCreateOptions;
    }
    afterCreate(doc, _docCreateOptions) {
        const edgelessDefaultTheme = getValueByDefaultTheme(this.editorSettingService.editorSetting.get('edgelessDefaultTheme'), this.appThemeService.appTheme.theme$.value ?? 'light');
        doc.setProperty('edgelessColorTheme', edgelessDefaultTheme);
    }
}
//# sourceMappingURL=doc-create-middleware.js.map