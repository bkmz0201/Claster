import { Store } from '@toeverything/infra';
import type { GraphQLService } from '../services/graphql';
export declare class InvoicesStore extends Store {
    private readonly graphqlService;
    constructor(graphqlService: GraphQLService);
    fetchInvoices(skip: number, take: number, signal?: AbortSignal): Promise<{
        __typename?: "UserType";
        invoiceCount: number;
        invoices: Array<{
            __typename?: "InvoiceType";
            id: string | null;
            status: import("@affine/graphql").InvoiceStatus;
            currency: string;
            amount: number;
            reason: string;
            lastPaymentError: string | null;
            link: string | null;
            createdAt: string;
        }>;
    }>;
    fetchWorkspaceInvoices(skip: number, take: number, workspaceId: string, signal?: AbortSignal): Promise<{
        __typename?: "WorkspaceType";
        invoiceCount: number;
        invoices: Array<{
            __typename?: "InvoiceType";
            id: string | null;
            status: import("@affine/graphql").InvoiceStatus;
            currency: string;
            amount: number;
            reason: string;
            lastPaymentError: string | null;
            link: string | null;
            createdAt: string;
        }>;
    }>;
}
//# sourceMappingURL=invoices.d.ts.map