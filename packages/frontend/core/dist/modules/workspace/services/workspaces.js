import { Service } from '@toeverything/infra';
export class WorkspacesService extends Service {
    get list() {
        return this.listService.list;
    }
    constructor(flavoursService, listService, profileRepo, transform, workspaceRepo, workspaceFactory, destroy) {
        super();
        this.flavoursService = flavoursService;
        this.listService = listService;
        this.profileRepo = profileRepo;
        this.transform = transform;
        this.workspaceRepo = workspaceRepo;
        this.workspaceFactory = workspaceFactory;
        this.destroy = destroy;
    }
    get deleteWorkspace() {
        return this.destroy.deleteWorkspace;
    }
    get getProfile() {
        return this.profileRepo.getProfile;
    }
    get transformLocalToCloud() {
        return this.transform.transformLocalToCloud;
    }
    get open() {
        return this.workspaceRepo.open;
    }
    get openByWorkspaceId() {
        return this.workspaceRepo.openByWorkspaceId;
    }
    get create() {
        return this.workspaceFactory.create;
    }
    async getWorkspaceBlob(meta, blob) {
        return await this.flavoursService.flavours$.value
            .find(x => x.flavour === meta.flavour)
            ?.getWorkspaceBlob(meta.id, blob);
    }
    getWorkspaceFlavourProvider(meta) {
        return this.flavoursService.flavours$.value.find(x => x.flavour === meta.flavour);
    }
    getAllWorkspaceProfile() {
        const list = this.listService.list.workspaces$.value;
        const profiles = list.map(meta => this.getProfile(meta));
        return profiles;
    }
}
//# sourceMappingURL=workspaces.js.map