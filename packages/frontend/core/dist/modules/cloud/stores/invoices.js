import { invoicesQuery, workspaceInvoicesQuery } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class InvoicesStore extends Store {
    constructor(graphqlService) {
        super();
        this.graphqlService = graphqlService;
    }
    async fetchInvoices(skip, take, signal) {
        const data = await this.graphqlService.gql({
            query: invoicesQuery,
            variables: { skip, take },
            context: { signal },
        });
        if (!data.currentUser) {
            throw new Error('No logged in');
        }
        return data.currentUser;
    }
    async fetchWorkspaceInvoices(skip, take, workspaceId, signal) {
        const data = await this.graphqlService.gql({
            query: workspaceInvoicesQuery,
            variables: { skip, take, workspaceId },
            context: { signal },
        });
        if (!data.workspace) {
            throw new Error('No workspace');
        }
        return data.workspace;
    }
}
//# sourceMappingURL=invoices.js.map