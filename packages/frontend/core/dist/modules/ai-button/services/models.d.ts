import { type Signal } from '@blocksuite/affine/shared/utils';
import { Service } from '@toeverything/infra';
import type { GraphQLService, SubscriptionService } from '../../cloud';
import type { GlobalStateService } from '../../storage';
export interface AIModel {
    name: string;
    id: string;
    version: string;
    category: string;
    isPro: boolean;
    isDefault: boolean;
}
export declare class AIModelService extends Service {
    private readonly globalStateService;
    private readonly gqlService;
    private readonly subscriptionService;
    modelId: Signal<string | undefined>;
    models: Signal<AIModel[]>;
    private readonly modelId$;
    constructor(globalStateService: GlobalStateService, gqlService: GraphQLService, subscriptionService: SubscriptionService);
    resetModel: () => void;
    setModel: (modelId: string) => void;
    private readonly init;
    private readonly initModels;
    private readonly getModelsByPrompt;
}
//# sourceMappingURL=models.d.ts.map