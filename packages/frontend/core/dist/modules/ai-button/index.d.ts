export { AIButtonProvider } from './provider/ai-button';
export { AIButtonService } from './services/ai-button';
export { AIDraftService } from './services/ai-draft';
export { type AIToolsConfig, AIToolsConfigService, } from './services/tools-config';
import type { Framework } from '@toeverything/infra';
export declare const configureAIButtonModule: (framework: Framework) => void;
export declare function configureAINetworkSearchModule(framework: Framework): void;
export declare function configureAIReasoningModule(framework: Framework): void;
export declare function configureAIPlaygroundModule(framework: Framework): void;
export declare function configureAIDraftModule(framework: Framework): void;
export declare function configureAIToolsConfigModule(framework: Framework): void;
export declare function configureAIModelModule(framework: Framework): void;
//# sourceMappingURL=index.d.ts.map