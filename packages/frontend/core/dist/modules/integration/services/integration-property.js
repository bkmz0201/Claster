import { Service } from '@toeverything/infra';
import { INTEGRATION_PROPERTY_SCHEMA } from '../constant';
export class IntegrationPropertyService extends Service {
    constructor(docService) {
        super();
        this.docService = docService;
        this.integrationType$ = this.docService.doc.properties$.selector(p => p.integrationType);
        this.schema$ = this.docService.doc.properties$
            .selector(p => p.integrationType)
            .map(type => (type ? INTEGRATION_PROPERTY_SCHEMA[type] : null));
    }
    integrationProperty$(type, key) {
        return this.docService.doc.properties$.selector(p => p[`${type}:${key.toString()}`]);
    }
    updateIntegrationProperties(type, updates) {
        this.docService.doc.updateProperties({
            integrationType: type,
            ...Object.fromEntries(Object.entries(updates).map(([key, value]) => {
                return [`${type}:${key.toString()}`, value];
            })),
        });
    }
}
//# sourceMappingURL=integration-property.js.map