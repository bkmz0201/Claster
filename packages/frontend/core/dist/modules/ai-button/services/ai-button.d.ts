import { Service } from '@toeverything/infra';
import type { AIButtonProvider } from '../provider/ai-button';
export declare class AIButtonService extends Service {
    private readonly aiButtonProvider?;
    constructor(aiButtonProvider?: AIButtonProvider | undefined);
    presentAIButton: import("@toeverything/infra").Effect<boolean>;
}
//# sourceMappingURL=ai-button.d.ts.map