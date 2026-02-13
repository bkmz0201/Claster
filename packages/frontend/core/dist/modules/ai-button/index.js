export { AIButtonProvider } from './provider/ai-button';
export { AIButtonService } from './services/ai-button';
export { AIDraftService } from './services/ai-draft';
export { AIToolsConfigService, } from './services/tools-config';
import { GraphQLService, ServerScope, SubscriptionService } from '../cloud';
import { FeatureFlagService } from '../feature-flag';
import { CacheStorage, GlobalStateService } from '../storage';
import { WorkspaceScope } from '../workspace';
import { AIButtonProvider } from './provider/ai-button';
import { AIButtonService } from './services/ai-button';
import { AIDraftService } from './services/ai-draft';
import { AIModelService } from './services/models';
import { AINetworkSearchService } from './services/network-search';
import { AIPlaygroundService } from './services/playground';
import { AIReasoningService } from './services/reasoning';
import { AIToolsConfigService } from './services/tools-config';
export const configureAIButtonModule = (framework) => {
    framework.service(AIButtonService, container => {
        return new AIButtonService(container.getOptional(AIButtonProvider));
    });
};
export function configureAINetworkSearchModule(framework) {
    framework.service(AINetworkSearchService, [
        GlobalStateService,
        FeatureFlagService,
    ]);
}
export function configureAIReasoningModule(framework) {
    framework.service(AIReasoningService, [GlobalStateService]);
}
export function configureAIPlaygroundModule(framework) {
    framework.service(AIPlaygroundService, [FeatureFlagService]);
}
export function configureAIDraftModule(framework) {
    framework
        .scope(WorkspaceScope)
        .service(AIDraftService, [GlobalStateService, CacheStorage]);
}
export function configureAIToolsConfigModule(framework) {
    framework.service(AIToolsConfigService, [GlobalStateService]);
}
export function configureAIModelModule(framework) {
    framework
        .scope(ServerScope)
        .service(AIModelService, [
        GlobalStateService,
        GraphQLService,
        SubscriptionService,
    ]);
}
//# sourceMappingURL=index.js.map