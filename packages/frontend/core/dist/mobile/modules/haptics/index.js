import { HapticProvider } from './providers/haptic';
import { HapticsService } from './services/haptics';
export function configureMobileHapticsModule(framework) {
    framework.service(HapticsService, f => new HapticsService(f.getOptional(HapticProvider)));
}
export { HapticProvider, HapticsService };
//# sourceMappingURL=index.js.map