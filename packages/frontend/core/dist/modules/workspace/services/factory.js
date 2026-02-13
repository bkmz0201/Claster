import { Service } from '@toeverything/infra';
export class WorkspaceFactoryService extends Service {
    constructor(flavoursService) {
        super();
        this.flavoursService = flavoursService;
        /**
         * create workspace
         * @param flavour workspace flavour
         * @param initial callback to put initial data to workspace
         * @returns workspace id
         */
        this.create = async (flavour, initial = () => Promise.resolve()) => {
            const provider = this.flavoursService.flavours$.value.find(x => x.flavour === flavour);
            if (!provider) {
                throw new Error(`Unknown workspace flavour: ${flavour}`);
            }
            const metadata = await provider.createWorkspace(initial);
            return metadata;
        };
    }
}
//# sourceMappingURL=factory.js.map