import { type LiveData, Service } from '@toeverything/infra';
import type { DocService } from '../../doc';
import type { IntegrationDocPropertiesMap, IntegrationType } from '../type';
export declare class IntegrationPropertyService extends Service {
    private readonly docService;
    constructor(docService: DocService);
    integrationType$: LiveData<"readwise" | null | undefined>;
    schema$: LiveData<Record<string, import("../type").IntegrationProperty<"readwise">> | null>;
    integrationProperty$(type: IntegrationType, key: string): LiveData<Record<string, any> | undefined | null>;
    updateIntegrationProperties<T extends IntegrationType>(type: T, updates: Partial<IntegrationDocPropertiesMap[T]>): void;
}
//# sourceMappingURL=integration-property.d.ts.map