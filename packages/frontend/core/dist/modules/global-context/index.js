export { GlobalContextService } from './services/global-context';
import { GlobalContext } from './entities/global-context';
import { GlobalContextService } from './services/global-context';
export function configureGlobalContextModule(framework) {
    framework.service(GlobalContextService).entity(GlobalContext);
}
//# sourceMappingURL=index.js.map