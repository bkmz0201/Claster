import { NavigationGestureProvider } from './providers/navigation-gesture';
import { NavigationGestureService } from './services/navigation-gesture';
export { NavigationGestureProvider, NavigationGestureService };
export function configureMobileNavigationGestureModule(framework) {
    framework.service(NavigationGestureService, f => new NavigationGestureService(f.getOptional(NavigationGestureProvider)));
}
//# sourceMappingURL=index.js.map