import { GlobalStateService } from '../storage';
import { Flags } from './entities/flags';
import { FeatureFlagService } from './services/feature-flag';
export { AFFINE_FLAGS } from './constant';
export { FeatureFlagService } from './services/feature-flag';
export function configureFeatureFlagModule(framework) {
    framework.service(FeatureFlagService).entity(Flags, [GlobalStateService]);
}
//# sourceMappingURL=index.js.map