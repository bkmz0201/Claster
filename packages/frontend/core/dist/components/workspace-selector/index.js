import { jsx as _jsx } from "react/jsx-runtime";
import { Menu } from '@affine/component';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspacesService, } from '@affine/core/modules/workspace';
import { track } from '@affine/track';
import { useLiveData, useServiceOptional, useServices, } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import { UserWithWorkspaceList } from './user-with-workspace-list';
import { WorkspaceCard } from './workspace-card';
export const WorkspaceSelector = ({ workspaceMetadata: outerWorkspaceMetadata, onSelectWorkspace, onCreatedWorkspace, showArrowDownIcon, disable, open: outerOpen, onOpenChange: outerOnOpenChange, showEnableCloudButton, showSyncStatus, className, menuContentOptions, dense, }) => {
    const { workspacesService, globalContextService } = useServices({
        GlobalContextService,
        WorkspacesService,
    });
    const [innerOpen, setOpened] = useState(false);
    const open = outerOpen ?? innerOpen;
    const onOpenChange = useCallback((open) => {
        outerOnOpenChange !== undefined
            ? outerOnOpenChange?.(open)
            : setOpened(open);
    }, [outerOnOpenChange]);
    const closeUserWorkspaceList = useCallback(() => {
        if (outerOnOpenChange) {
            outerOnOpenChange(false);
        }
        else {
            setOpened(false);
        }
    }, [outerOnOpenChange]);
    const openUserWorkspaceList = useCallback(() => {
        track.$.navigationPanel.workspaceList.open();
        if (outerOnOpenChange) {
            outerOnOpenChange(true);
        }
        else {
            setOpened(true);
        }
    }, [outerOnOpenChange]);
    const currentWorkspaceId = useLiveData(globalContextService.globalContext.workspaceId.$);
    const currentWorkspaceMetadata = useLiveData(currentWorkspaceId
        ? workspacesService.list.workspace$(currentWorkspaceId)
        : null);
    const workspaceMetadata = outerWorkspaceMetadata ?? currentWorkspaceMetadata;
    // revalidate workspace list when open workspace list
    useEffect(() => {
        if (open) {
            workspacesService.list.revalidate();
        }
    }, [workspacesService, open]);
    return (_jsx(Menu, { rootOptions: {
            open,
            onOpenChange,
        }, items: _jsx(UserWithWorkspaceList, { onEventEnd: closeUserWorkspaceList, onClickWorkspace: onSelectWorkspace, onCreatedWorkspace: onCreatedWorkspace, showEnableCloudButton: showEnableCloudButton }), contentOptions: {
            // hide trigger
            sideOffset: dense ? -32 : -58,
            onInteractOutside: closeUserWorkspaceList,
            onEscapeKeyDown: closeUserWorkspaceList,
            ...menuContentOptions,
            style: {
                width: '300px',
                maxHeight: 'min(800px, calc(100vh - 200px))',
                padding: 0,
                ...menuContentOptions?.style,
            },
        }, children: workspaceMetadata ? (_jsx(WorkspaceCard, { workspaceMetadata: workspaceMetadata, onClick: openUserWorkspaceList, showSyncStatus: showSyncStatus, className: className, showArrowDownIcon: showArrowDownIcon, disable: disable, hideCollaborationIcon: true, hideTeamWorkspaceIcon: true, "data-testid": "current-workspace-card", dense: dense })) : (_jsx("span", {})) }));
};
export const WorkspaceNavigator = ({ onSelectWorkspace, onCreatedWorkspace, ...props }) => {
    const { jumpToPage } = useNavigateHelper();
    const workbench = useServiceOptional(WorkbenchService)?.workbench;
    const handleClickWorkspace = useCallback((workspaceMetadata) => {
        onSelectWorkspace?.(workspaceMetadata);
        const closeInactiveViews = () => workbench?.views$.value.forEach(view => {
            if (workbench?.activeView$.value !== view) {
                workbench?.close(view);
            }
        });
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                closeInactiveViews();
                jumpToPage(workspaceMetadata.id, 'all');
                return new Promise(resolve => setTimeout(resolve, 150)); /* start transition after 150ms */
            });
        }
        else {
            closeInactiveViews();
            jumpToPage(workspaceMetadata.id, 'all');
        }
    }, [jumpToPage, onSelectWorkspace, workbench]);
    const handleCreatedWorkspace = useCallback((payload) => {
        onCreatedWorkspace?.(payload);
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                if (payload.defaultDocId) {
                    jumpToPage(payload.metadata.id, payload.defaultDocId);
                }
                else {
                    jumpToPage(payload.metadata.id, 'all');
                }
                return new Promise(resolve => setTimeout(resolve, 150)); /* start transition after 150ms */
            });
        }
        else {
            if (payload.defaultDocId) {
                jumpToPage(payload.metadata.id, payload.defaultDocId);
            }
            else {
                jumpToPage(payload.metadata.id, 'all');
            }
        }
    }, [jumpToPage, onCreatedWorkspace]);
    return (_jsx(WorkspaceSelector, { onSelectWorkspace: handleClickWorkspace, onCreatedWorkspace: handleCreatedWorkspace, ...props }));
};
//# sourceMappingURL=index.js.map