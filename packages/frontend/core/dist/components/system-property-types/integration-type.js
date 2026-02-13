import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@affine/component';
import { IntegrationTypeIcon } from '@affine/core/modules/integration';
import { INTEGRATION_TYPE_NAME_MAP } from '@affine/core/modules/integration/constant';
import { useI18n } from '@affine/i18n';
import { IntegrationsIcon, ReadwiseIcon } from '@blocksuite/icons/rc';
import { useLiveData } from '@toeverything/infra';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
export const IntegrationTypeFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const t = useI18n();
    return (_jsx(FilterValueMenu, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, items: Object.entries(INTEGRATION_TYPE_NAME_MAP).map(entries => {
            const type = entries[0];
            const i18nKey = entries[1];
            return (_jsx(MenuItem, { onClick: () => {
                    onChange?.({
                        ...filter,
                        value: type,
                    });
                }, prefixIcon: _jsx(IntegrationTypeIcon, { type: type }), selected: filter.value === type, children: t.t(i18nKey) }, type));
        }), children: _jsx("span", { children: INTEGRATION_TYPE_NAME_MAP[filter.value]
                ? t.t(INTEGRATION_TYPE_NAME_MAP[filter.value])
                : filter.value }) }));
};
export const IntegrationTypeDocListProperty = ({ doc }) => {
    const integrationType = useLiveData(doc.property$('integrationType'));
    if (!integrationType) {
        return null;
    }
    return (_jsx(StackProperty, { icon: integrationType === 'readwise' ? _jsx(ReadwiseIcon, {}) : _jsx(IntegrationsIcon, {}), children: integrationType }));
};
export const IntegrationTypeGroupHeader = ({ groupId, docCount, }) => {
    const t = useI18n();
    const text = groupId === 'readwise'
        ? t['com.affine.integration.readwise.name']()
        : groupId
            ? groupId
            : 'No integrations';
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: text }));
};
//# sourceMappingURL=integration-type.js.map