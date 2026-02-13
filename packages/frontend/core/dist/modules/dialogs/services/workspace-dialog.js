import { LiveData, Service } from '@toeverything/infra';
import { nanoid } from 'nanoid';
export class WorkspaceDialogService extends Service {
    constructor() {
        super(...arguments);
        this.dialogs$ = new LiveData([]);
    }
    open(type, props, callback) {
        const id = nanoid();
        this.dialogs$.next([
            ...this.dialogs$.value,
            {
                type,
                props,
                callback,
                id,
            },
        ]);
        return id;
    }
    close(id, result) {
        this.dialogs$.next(this.dialogs$.value.filter(dialog => {
            if (dialog.id === id) {
                if (dialog.callback) {
                    dialog.callback(result);
                }
                return false;
            }
            return true;
        }));
    }
    closeAll() {
        const dialogs = this.dialogs$.value;
        dialogs.forEach(dialog => {
            this.close(dialog.id);
        });
    }
}
//# sourceMappingURL=workspace-dialog.js.map