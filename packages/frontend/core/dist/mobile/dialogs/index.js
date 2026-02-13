import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { GlobalDialogService, WorkspaceDialogService, } from '@affine/core/modules/dialogs';
import { useLiveData, useService } from '@toeverything/infra';
import { CollectionSelectorDialog } from './selectors/collection-selector';
import { DateSelectorDialog } from './selectors/date-selector';
import { DocSelectorDialog } from './selectors/doc-selector';
import { TagSelectorDialog } from './selectors/tag-selector';
import { SettingDialog } from './setting';
import { SignInDialog } from './sign-in';
const GLOBAL_DIALOGS = {
    //   'create-workspace': CreateWorkspaceDialog,
    //   'import-workspace': ImportWorkspaceDialog,
    //   'import-template': ImportTemplateDialog,
    //   import: ImportDialog,
    'sign-in': SignInDialog,
};
const WORKSPACE_DIALOGS = {
    //   'doc-info': DocInfoDialog,
    //   'collection-editor': CollectionEditorDialog,
    'tag-selector': TagSelectorDialog,
    'doc-selector': DocSelectorDialog,
    'collection-selector': CollectionSelectorDialog,
    'date-selector': DateSelectorDialog,
    setting: SettingDialog,
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