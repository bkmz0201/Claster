import { LiveData, Service } from '@toeverything/infra';
import type { WORKSPACE_DIALOG_SCHEMA } from '../constant';
import type { DialogProps, DialogResult, OpenedDialog } from '../types';
export declare class WorkspaceDialogService extends Service {
    readonly dialogs$: LiveData<OpenedDialog<WORKSPACE_DIALOG_SCHEMA>[]>;
    open<T extends keyof WORKSPACE_DIALOG_SCHEMA>(type: T, props: DialogProps<WORKSPACE_DIALOG_SCHEMA[T]>, callback?: (result?: DialogResult<WORKSPACE_DIALOG_SCHEMA[T]>) => void): string;
    close(id: string, result?: unknown): void;
    closeAll(): void;
}
//# sourceMappingURL=workspace-dialog.d.ts.map