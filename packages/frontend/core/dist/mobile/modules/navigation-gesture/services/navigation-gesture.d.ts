import { LiveData, Service } from '@toeverything/infra';
import type { NavigationGestureProvider } from '../providers/navigation-gesture';
export declare class NavigationGestureService extends Service {
    private readonly navigationGestureProvider?;
    enabled$: LiveData<boolean>;
    constructor(navigationGestureProvider?: NavigationGestureProvider | undefined);
    setEnabled: import("@toeverything/infra").Effect<boolean>;
    enable(): Promise<void | undefined>;
    disable(): Promise<void | undefined>;
}
//# sourceMappingURL=navigation-gesture.d.ts.map