import type { InvoicesQuery } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { WorkspaceServerService } from '../services/workspace-server';
import { InvoicesStore } from '../stores/invoices';
export type Invoice = NonNullable<InvoicesQuery['currentUser']>['invoices'][number];
export declare class WorkspaceInvoices extends Entity {
    private readonly workspaceService;
    private readonly workspaceServerService;
    constructor(workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService);
    store: InvoicesStore | undefined;
    pageNum$: LiveData<number>;
    invoiceCount$: LiveData<number | undefined>;
    pageInvoices$: LiveData<{
        __typename?: "InvoiceType";
        id: string | null;
        status: import("@affine/graphql").InvoiceStatus;
        currency: string;
        amount: number;
        reason: string;
        lastPaymentError: string | null;
        link: string | null;
        createdAt: string;
    }[] | undefined>;
    isLoading$: LiveData<boolean>;
    error$: LiveData<any>;
    readonly PAGE_SIZE = 8;
    readonly revalidate: import("@toeverything/infra").Effect<unknown>;
    setPageNum(pageNum: number): void;
    dispose(): void;
}
//# sourceMappingURL=workspace-invoices.d.ts.map