import { Service } from '@toeverything/infra';
import type { HapticProvider } from '../providers/haptic';
type ExtractArg<T extends keyof HapticProvider> = Parameters<HapticProvider[T]>[0];
export declare class HapticsService extends Service {
    private readonly provider?;
    constructor(provider?: HapticProvider | undefined);
    impact(options?: ExtractArg<'impact'>): void;
    notification(options?: ExtractArg<'notification'>): void;
    vibrate(options?: ExtractArg<'vibrate'>): void;
    selectionStart(): void;
    selectionChanged(): void;
    selectionEnd(): void;
}
export {};
//# sourceMappingURL=haptics.d.ts.map