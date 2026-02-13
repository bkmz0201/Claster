import { type RadioItem } from '@affine/component';
import { type FontFamily } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
export declare const getBaseFontStyleOptions: (t: ReturnType<typeof useI18n>) => Array<Omit<RadioItem, "value"> & {
    value: FontFamily;
}>;
export declare const General: () => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=general.d.ts.map