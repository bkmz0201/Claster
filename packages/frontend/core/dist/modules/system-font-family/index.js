import { SystemFontFamily } from './entities/system-font-family';
import { SystemFontFamilyService } from './services/system-font-family';
export { SystemFontFamilyService } from './services/system-font-family';
export function configureSystemFontFamilyModule(framework) {
    framework.service(SystemFontFamilyService).entity(SystemFontFamily);
}
//# sourceMappingURL=index.js.map