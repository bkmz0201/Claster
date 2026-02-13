import { type Color, ColorScheme, FontWeight, type Palette } from '@blocksuite/affine/model';
export declare const useResolvedTheme: () => ColorScheme;
export declare const usePalettes: (originalPalettes: Palette[], defaultColor: Color, isShapeText?: boolean) => {
    palettes: {
        key: string;
        value: string | {
            normal: string;
        } | {
            dark: string;
            light: string;
        };
        resolvedValue: string;
    }[];
    getCurrentColor: (color: Color) => {
        key: string;
        value: string | {
            normal: string;
        } | {
            dark: string;
            light: string;
        };
        resolvedValue: string;
    } | undefined;
};
export declare const sortedFontWeightEntries: [string, FontWeight][];
//# sourceMappingURL=utils.d.ts.map