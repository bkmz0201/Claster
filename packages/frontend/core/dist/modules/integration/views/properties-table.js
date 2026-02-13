import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { PropertyCollapsibleContent, PropertyCollapsibleSection, PropertyName, PropertyRoot, } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
import { IntegrationPropertyService } from '../services/integration-property';
import { ValueRenderer } from './property-values';
export const DocIntegrationPropertiesTable = ({ divider, }) => {
    const t = useI18n();
    const integrationPropertyService = useService(IntegrationPropertyService);
    const integrationType = useLiveData(integrationPropertyService.integrationType$);
    const schema = useLiveData(integrationPropertyService.schema$);
    const properties = useMemo(() => Object.values(schema || {}).sort((a, b) => {
        const aOrder = a.order ?? '9999';
        const bOrder = b.order ?? '9999';
        return aOrder.localeCompare(bOrder);
    }), [schema]);
    if (!schema || !integrationType)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx(PropertyCollapsibleSection, { title: t['com.affine.integration.properties'](), children: _jsx(PropertyCollapsibleContent, { children: properties.map(property => {
                        const Icon = property.icon;
                        const key = property.key;
                        const label = property.label;
                        const displayName = typeof label === 'string'
                            ? t[label]()
                            : t.t(label?.i18nKey, label?.options);
                        return (_jsxs(PropertyRoot, { children: [_jsx(PropertyName, { name: displayName, icon: Icon ? _jsx(Icon, {}) : null }), _jsx(ValueRenderer, { integration: integrationType, type: property.type, propertyKey: key })] }, key));
                    }) }) }), divider] }));
};
//# sourceMappingURL=properties-table.js.map