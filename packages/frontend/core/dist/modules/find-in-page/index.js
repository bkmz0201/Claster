import { DesktopApiService } from '../desktop-api';
import { FindInPage } from './entities/find-in-page';
import { FindInPageService } from './services/find-in-page';
export { FindInPageService } from './services/find-in-page';
export function configureFindInPageModule(framework) {
    framework.service(FindInPageService).entity(FindInPage, [DesktopApiService]);
}
//# sourceMappingURL=index.js.map