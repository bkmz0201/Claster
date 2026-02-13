export { AppThemeService } from './services/theme';
import {} from '@toeverything/infra';
import { AppTheme } from './entities/theme';
import { AppThemeService } from './services/theme';
export function configureAppThemeModule(framework) {
    framework.service(AppThemeService).entity(AppTheme);
}
export function configureEssentialThemeModule(framework) {
    framework.service(AppThemeService).entity(AppTheme);
}
//# sourceMappingURL=index.js.map