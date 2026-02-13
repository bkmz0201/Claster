import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FlexWrapper, Input, notify, Wrapper } from '@affine/component';
import { Button } from '@affine/component/ui/button';
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { Upload } from '@affine/core/components/pure/file-upload';
import { WorkspaceAvatar } from '@affine/core/components/workspace-avatar';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { validateAndReduceImage } from '@affine/core/utils/reduce-image';
import { UNTITLED_WORKSPACE_NAME } from '@affine/env/constant';
import { useI18n } from '@affine/i18n';
import { CameraIcon } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { map } from 'rxjs';
import * as style from './style.css';
export const ProfilePanel = () => {
    const t = useI18n();
    const workspace = useService(WorkspaceService).workspace;
    const permissionService = useService(WorkspacePermissionService);
    const isOwner = useLiveData(permissionService.permission.isOwner$);
    useEffect(() => {
        permissionService.permission.revalidate();
    }, [permissionService]);
    const workspaceIsReady = useLiveData(useMemo(() => {
        return workspace
            ? LiveData.from(workspace.engine.doc
                .docState$(workspace.id)
                .pipe(map(v => v.ready)), false)
            : null;
    }, [workspace]));
    const [name, setName] = useState('');
    const currentName = useLiveData(workspace.name$);
    useEffect(() => {
        setName(currentName ?? UNTITLED_WORKSPACE_NAME);
    }, [currentName]);
    const setWorkspaceAvatar = useCallback(async (file) => {
        if (!workspace) {
            return;
        }
        if (!file) {
            workspace.setAvatar('');
            return;
        }
        try {
            const reducedFile = await validateAndReduceImage(file);
            const blobs = workspace.docCollection.blobSync;
            const blobId = await blobs.set(reducedFile);
            workspace.setAvatar(blobId);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }, [workspace]);
    const setWorkspaceName = useCallback((name) => {
        if (!workspace) {
            return;
        }
        workspace.setName(name);
    }, [workspace]);
    const [input, setInput] = useState('');
    useEffect(() => {
        setInput(name);
    }, [name]);
    const handleUpdateWorkspaceName = useCallback((name) => {
        setWorkspaceName(name);
        notify.success({ title: t['Update workspace name success']() });
    }, [setWorkspaceName, t]);
    const handleSetInput = useCallback((value) => {
        setInput(value);
    }, []);
    const handleKeyUp = useCallback((e) => {
        if (e.code === 'Enter' && name !== input) {
            handleUpdateWorkspaceName(input);
        }
    }, [handleUpdateWorkspaceName, input, name]);
    const handleClick = useCallback(() => {
        handleUpdateWorkspaceName(input);
    }, [handleUpdateWorkspaceName, input]);
    const handleRemoveUserAvatar = useCatchEventCallback(async () => {
        await setWorkspaceAvatar(null);
    }, [setWorkspaceAvatar]);
    const handleUploadAvatar = useCallback((file) => {
        setWorkspaceAvatar(file)
            .then(() => {
            notify.success({ title: 'Update workspace avatar success' });
        })
            .catch(error => {
            notify.error({
                title: 'Update workspace avatar failed',
                message: error,
            });
        });
    }, [setWorkspaceAvatar]);
    const canAdjustAvatar = workspaceIsReady && isOwner;
    return (_jsxs("div", { className: style.profileWrapper, children: [_jsx(Upload, { accept: "image/gif,image/jpeg,image/jpg,image/png,image/svg", fileChange: handleUploadAvatar, "data-testid": "upload-avatar", disabled: !isOwner, children: _jsx(WorkspaceAvatar, { meta: workspace.meta, size: 56, name: name, rounded: 8, colorfulFallback: true, hoverIcon: isOwner ? _jsx(CameraIcon, {}) : undefined, onRemove: canAdjustAvatar ? handleRemoveUserAvatar : undefined, avatarTooltipOptions: canAdjustAvatar
                        ? { content: t['Click to replace photo']() }
                        : undefined, removeTooltipOptions: canAdjustAvatar ? { content: t['Remove photo']() } : undefined, "data-testid": "workspace-setting-avatar", removeButtonProps: {
                        ['data-testid']: 'workspace-setting-remove-avatar-button',
                    } }) }), _jsxs(Wrapper, { marginLeft: 20, children: [_jsx("div", { className: style.label, children: t['Workspace Name']() }), _jsxs(FlexWrapper, { alignItems: "center", flexGrow: "1", children: [_jsx(Input, { disabled: !workspaceIsReady || !isOwner, value: input, style: { width: 280, height: 32 }, "data-testid": "workspace-name-input", placeholder: t['Workspace Name'](), maxLength: 64, minLength: 0, onChange: handleSetInput, onKeyUp: handleKeyUp }), input === name ? null : (_jsx(Button, { "data-testid": "save-workspace-name", onClick: handleClick, style: {
                                    marginLeft: '12px',
                                }, children: t['com.affine.editCollection.save']() }))] })] })] }));
};
//# sourceMappingURL=profile.js.map