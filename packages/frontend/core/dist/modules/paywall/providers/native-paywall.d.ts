export interface NativePaywallProvider {
    showPaywall(type: 'Pro' | 'AI'): Promise<void>;
}
export declare const NativePaywallProvider: import("@toeverything/infra").Identifier<NativePaywallProvider> & ((variant: string) => import("@toeverything/infra").Identifier<NativePaywallProvider>);
//# sourceMappingURL=native-paywall.d.ts.map