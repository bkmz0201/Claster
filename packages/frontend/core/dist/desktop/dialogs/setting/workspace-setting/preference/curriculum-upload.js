import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from '@affine/component';
import { Button } from '@affine/component/ui/button';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { GraphQLService } from '@affine/core/modules/cloud';
import { WorkspaceServerService } from '@affine/core/modules/cloud';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { uploadCurriculumMutation } from '@affine/graphql';
import { UploadIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback, useRef, useState } from 'react';
export const CurriculumUploadPanel = () => {
    const workspace = useService(WorkspaceService).workspace;
    const server = workspace?.scope.get(WorkspaceServerService).server;
    const workspaceInfo = useWorkspaceInfo(workspace);
    const graphql = useService(GraphQLService);
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    console.log('CurriculumUploadPanel', { workspaceInfo, server: !!server });
    console.log('workspaceInfo details:', workspaceInfo);
    const handleUpload = useCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file || !workspace?.id)
            return;
        setIsUploading(true);
        try {
            await graphql.gql({
                query: uploadCurriculumMutation,
                variables: {
                    workspaceId: workspace.id,
                    curriculum: file,
                },
            });
            toast('Curriculum uploaded successfully!');
        }
        catch (error) {
            console.error('Upload failed:', error);
            toast('Failed to upload curriculum');
        }
        finally {
            setIsUploading(false);
        }
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [graphql, workspace?.id]);
    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);
    return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx(Button, { onClick: handleClick, disabled: isUploading, prefix: _jsx(UploadIcon, {}), children: isUploading ? 'Uploading...' : 'Upload Curriculum' }), _jsx("input", { ref: fileInputRef, type: "file", accept: ".pdf,.doc,.docx,.txt", onChange: handleUpload, style: { display: 'none' } })] }));
};
//# sourceMappingURL=curriculum-upload.js.map