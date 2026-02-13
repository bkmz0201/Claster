import { Service } from '@toeverything/infra';
export class WorkspaceDestroyService extends Service {
    constructor(flavoursService) {
        super();
        this.flavoursService = flavoursService;
        this.deleteWorkspace = async (metadata) => {
            const provider = this.flavoursService.flavours$.value.find(p => p.flavour === metadata.flavour);
            if (!provider) {
                throw new Error(`Unknown workspace flavour: ${metadata.flavour}`);
            }
            return provider.deleteWorkspace(metadata.id);
        };
    }
}
//# sourceMappingURL=destroy.js.map