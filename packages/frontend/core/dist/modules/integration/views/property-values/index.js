import { jsx as _jsx } from "react/jsx-runtime";
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
import { IntegrationPropertyService } from '../../services/integration-property';
import { DateValue } from './date-value';
import { LinkValue } from './link-value';
import { SourceValue } from './source-value';
import { TextValue } from './text-value';
const valueRenderers = {
    link: LinkValue,
    source: SourceValue,
    text: TextValue,
    date: DateValue,
};
export const ValueRenderer = ({ integration, type, propertyKey, }) => {
    const Renderer = valueRenderers[type];
    const integrationPropertyService = useService(IntegrationPropertyService);
    const propertyValue = useLiveData(useMemo(() => {
        return integrationPropertyService.integrationProperty$(integration, propertyKey);
    }, [integration, integrationPropertyService, propertyKey]));
    if (!Renderer) {
        return null;
    }
    return _jsx(Renderer, { integration: integration, value: propertyValue });
};
//# sourceMappingURL=index.js.map