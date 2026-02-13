import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { isSupportedSystemPropertyType, SystemPropertyTypes, } from '../../system-property-types';
import { Condition } from './condition';
import { UnknownFilterCondition } from './unknown';
export const SystemFilterCondition = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const t = useI18n();
    const type = isSupportedSystemPropertyType(filter.key)
        ? SystemPropertyTypes[filter.key]
        : undefined;
    if (!type) {
        return (_jsx(UnknownFilterCondition, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, filter: filter }));
    }
    const methods = type.filterMethod;
    const Value = type.filterValue;
    if (!methods || !Value) {
        return (_jsx(UnknownFilterCondition, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, filter: filter }));
    }
    return (_jsx(Condition, { filter: filter, icon: _jsx(type.icon, {}), isDraft: isDraft, onDraftCompleted: onDraftCompleted, name: t.t(type.name), methods: Object.entries(methods).map(([key, i18nKey]) => [
            key,
            t.t(i18nKey),
        ]), value: Value, onChange: onChange }));
};
//# sourceMappingURL=system.js.map