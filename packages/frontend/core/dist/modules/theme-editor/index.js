import {} from '@toeverything/infra';
import { GlobalState } from '../storage';
import { ThemeEditorService } from './services/theme-editor';
export { ThemeEditorService };
export function configureThemeEditorModule(framework) {
    framework.service(ThemeEditorService, [GlobalState]);
}
//# sourceMappingURL=index.js.map