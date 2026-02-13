export interface HapticProvider {
    impact: (options?: {
        style?: 'HEAVY' | 'LIGHT' | 'MEDIUM';
    }) => Promise<void>;
    notification: (options?: {
        type?: 'SUCCESS' | 'ERROR' | 'WARNING';
    }) => Promise<void>;
    vibrate: (options?: {
        duration?: number;
    }) => Promise<void>;
    selectionStart: () => Promise<void>;
    selectionChanged: () => Promise<void>;
    selectionEnd: () => Promise<void>;
}
export declare const HapticProvider: import("@toeverything/infra").Identifier<HapticProvider> & ((variant: string) => import("@toeverything/infra").Identifier<HapticProvider>);
//# sourceMappingURL=haptic.d.ts.map