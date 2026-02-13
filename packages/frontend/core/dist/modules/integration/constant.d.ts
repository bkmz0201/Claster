import type { I18nString } from '@affine/i18n';
import type { SVGProps } from 'react';
import type { IntegrationProperty, IntegrationType } from './type';
export declare const INTEGRATION_TYPE_NAME_MAP: Record<IntegrationType, I18nString>;
export declare const INTEGRATION_PROPERTY_SCHEMA: {
    [T in IntegrationType]: Record<string, IntegrationProperty<T>>;
};
export declare const INTEGRATION_ICON_MAP: Record<IntegrationType, React.ComponentType<SVGProps<SVGSVGElement>>>;
//# sourceMappingURL=constant.d.ts.map