import { VirtualKeyboardProvider } from './providers/virtual-keyboard';
import { VirtualKeyboardService } from './services/virtual-keyboard';
export { VirtualKeyboardProvider, VirtualKeyboardService };
export function configureMobileVirtualKeyboardModule(framework) {
    framework.service(VirtualKeyboardService, [VirtualKeyboardProvider]);
}
//# sourceMappingURL=index.js.map