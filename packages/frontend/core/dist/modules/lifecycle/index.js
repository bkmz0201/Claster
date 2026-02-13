import { LifecycleService } from './service/lifecycle';
export { ApplicationFocused, ApplicationStarted, LifecycleService, } from './service/lifecycle';
export function configureLifecycleModule(framework) {
    framework.service(LifecycleService);
}
//# sourceMappingURL=index.js.map