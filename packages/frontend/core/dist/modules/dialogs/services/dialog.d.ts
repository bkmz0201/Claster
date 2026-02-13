import { LiveData, Service } from '@toeverything/infra';
import type { GLOBAL_DIALOG_SCHEMA } from '../constant';
import type { DialogProps, DialogResult, OpenedDialog } from '../types';
export declare class GlobalDialogService extends Service {
    readonly dialogs$: LiveData<OpenedDialog<GLOBAL_DIALOG_SCHEMA>[]>;
    open<T extends keyof GLOBAL_DIALOG_SCHEMA>(type: T, props: DialogProps<GLOBAL_DIALOG_SCHEMA[T]>, callback?: (result?: DialogResult<GLOBAL_DIALOG_SCHEMA[T]>) => void): string;
    close(id: string, result?: unknown): void;
}
//# sourceMappingURL=dialog.d.ts.map