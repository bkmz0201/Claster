import { NativePaywallService } from './services/native-paywall';
export { NativePaywallProvider } from './providers/native-paywall';
export { NativePaywallService } from './services/native-paywall';
export function configurePaywallModule(framework) {
    framework.service(NativePaywallService);
}
//# sourceMappingURL=index.js.map