import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { GlobalDialogService, WorkspaceDialogService, } from '@affine/core/modules/dialogs';
import { useLiveData, useService } from '@toeverything/infra';
import { ChangePasswordDialog } from './change-password';
import { CollectionEditorDialog } from './collection-editor';
import { CreateWorkspaceDialog } from './create-workspace';
import { DeletedAccountDialog } from './deleted-account';
import { DocInfoDialog } from './doc-info';
import { EnableCloudDialog } from './enable-cloud';
import { ImportDialog } from './import';
import { ImportTemplateDialog } from './import-template';
import { ImportWorkspaceDialog } from './import-workspace';
import { CollectionSelectorDialog } from './selectors/collection';
import { DateSelectorDialog } from './selectors/date';
import { DocSelectorDialog } from './selectors/doc';
import { TagSelectorDialog } from './selectors/tag';
import { SettingDialog } from './setting';
import { SignInDialog } from './sign-in';
import { VerifyEmailDialog } from './verify-email';
const GLOBAL_DIALOGS = {
    'create-workspace': CreateWorkspaceDialog,
    'import-workspace': ImportWorkspaceDialog,
    'import-template': ImportTemplateDialog,
    'sign-in': SignInDialog,
    'change-password': ChangePasswordDialog,
    'verify-email': VerifyEmailDialog,
    'enable-cloud': EnableCloudDialog,
    'deleted-account': DeletedAccountDialog,
};
const WORKSPACE_DIALOGS = {
    'doc-info': DocInfoDialog,
    'collection-editor': CollectionEditorDialog,
    'tag-selector': TagSelectorDialog,
    'doc-selector': DocSelectorDialog,
    'collection-selector': CollectionSelectorDialog,
    'date-selector': DateSelectorDialog,
    setting: SettingDialog,
    import: ImportDialog,
};
export const GlobalDialogs = () => {
    const globalDialogService = useService(GlobalDialogService);
    const dialogs = useLiveData(globalDialogService.dialogs$);
    return (_jsx(_Fragment, { children: dialogs.map(dialog => {
            const DialogComponent = GLOBAL_DIALOGS[dialog.type];
            if (!DialogComponent) {
                return null;
            }
            return (_jsx(DialogComponent, { ...dialog.props, close: (result) => {
                    globalDialogService.close(dialog.id, result);
                } }, dialog.id));
        }) }));
};
export const WorkspaceDialogs = () => {
    const workspaceDialogService = useService(WorkspaceDialogService);
    const dialogs = useLiveData(workspaceDialogService.dialogs$);
    return (_jsx(_Fragment, { children: dialogs.map(dialog => {
            const DialogComponent = WORKSPACE_DIALOGS[dialog.type];
            if (!DialogComponent) {
                return null;
            }
            return (_jsx(DialogComponent, { ...dialog.props, close: (result) => {
                    workspaceDialogService.close(dialog.id, result);
                } }, dialog.id));
        }) }));
};
//# sourceMappingURL=index.js.map