import { jsx as _jsx } from "react/jsx-runtime";
import { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { WorkspacePropertyIcon, WorkspacePropertyName } from '../../properties';
import { isSupportedWorkspacePropertyType, WorkspacePropertyTypes, } from '../../workspace-property-types';
import { Condition } from './condition';
import { UnknownFilterCondition } from './unknown';
export const PropertyFilterCondition = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const t = useI18n();
    const workspacePropertyService = useService(WorkspacePropertyService);
    const propertyInfo = useLiveData(workspacePropertyService.propertyInfo$(filter.key));
    const propertyType = propertyInfo?.type;
    const type = isSupportedWorkspacePropertyType(propertyType)
        ? WorkspacePropertyTypes[propertyType]
        : undefined;
    const methods = type?.filterMethod;
    const Value = type?.filterValue;
    if (!propertyInfo || !type || !methods) {
        return (_jsx(UnknownFilterCondition, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, filter: filter }));
    }
    return (_jsx(Condition, { filter: filter, isDraft: isDraft, onDraftCompleted: onDraftCompleted, icon: _jsx(WorkspacePropertyIcon, { propertyInfo: propertyInfo }), name: _jsx(WorkspacePropertyName, { propertyInfo: propertyInfo }), methods: Object.entries(methods).map(([key, i18nKey]) => [
            key,
            t.t(i18nKey),
        ]), value: Value, onChange: onChange }));
};
//# sourceMappingURL=property.js.map