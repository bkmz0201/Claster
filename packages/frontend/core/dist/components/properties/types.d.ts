import type { DocCustomPropertyInfo } from '@affine/core/modules/db';
export interface PropertyValueProps {
    propertyInfo?: DocCustomPropertyInfo;
    value: any;
    readonly?: boolean;
    onChange: (value: any, skipCommit?: boolean) => void;
}
//# sourceMappingURL=types.d.ts.map