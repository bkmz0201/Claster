import type { IntegrationProperty } from '../../type';
import type { PropertyValueProps } from './type';
type IntegrationPropertyType = IntegrationProperty<any>['type'];
type ValueRendererProps = {
    type: IntegrationPropertyType;
    propertyKey: string;
} & Pick<PropertyValueProps, 'integration'>;
export declare const ValueRenderer: ({ integration, type, propertyKey, }: ValueRendererProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map