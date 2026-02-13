import { WorkspaceService } from '@affine/core/modules/workspace';
import { useService } from '@toeverything/infra';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback } from 'react';
export const displayPropertiesAtom = atomWithStorage('allDocDisplayProperties', {});
const defaultProps = {
    groupBy: 'updatedDate',
    displayProperties: {
        bodyNotes: true,
        tags: true,
        createDate: true,
        updatedDate: true,
    },
};
export const useAllDocDisplayProperties = () => {
    const workspace = useService(WorkspaceService).workspace;
    const [properties, setProperties] = useAtom(displayPropertiesAtom);
    const workspaceProperties = properties[workspace.id] || defaultProps;
    const onChange = useCallback((key, value) => {
        setProperties(prev => ({
            ...prev,
            [workspace.id]: {
                ...(prev[workspace.id] || defaultProps),
                [key]: value,
            },
        }));
    }, [setProperties, workspace.id]);
    return [workspaceProperties, onChange];
};
//# sourceMappingURL=use-all-doc-display-properties.js.map