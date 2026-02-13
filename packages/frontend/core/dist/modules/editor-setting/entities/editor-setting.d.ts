import type { DeepPartial } from '@blocksuite/affine/global/utils';
import { type Signal } from '@blocksuite/affine/shared/utils';
import { Entity, LiveData } from '@toeverything/infra';
import type { EditorSettingProvider } from '../provider/editor-setting-provider';
import { EditorSettingSchema } from '../schema';
type SettingItem<T> = {
    readonly value: T;
    set: (value: T) => void;
    $: LiveData<T>;
};
export declare class EditorSetting extends Entity {
    readonly provider: EditorSettingProvider;
    constructor(provider: EditorSettingProvider);
    settings$: LiveData<{
        text: {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
        };
        'affine:note': {
            edgeless: {
                style: {
                    borderRadius: number;
                    borderSize: number;
                    borderStyle: import("@blocksuite/affine-model").StrokeStyle;
                    shadowType: import("@blocksuite/affine-model").NoteShadow;
                };
            };
            background: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            displayMode: import("@blocksuite/affine-model").NoteDisplayMode;
        };
        fontFamily: "Sans" | "Serif" | "Mono" | "Custom";
        fontSize: number;
        customFontFamily: string;
        newDocDefaultMode: "page" | "edgeless" | "ask";
        fullWidthLayout: boolean;
        displayDocInfo: boolean;
        displayBiDirectionalLink: boolean;
        edgelessDefaultTheme: "auto" | "dark" | "light" | "specified";
        openDocMode: "open-in-active-view" | "open-in-new-view" | "open-in-new-tab" | "open-in-center-peek";
        enableMiddleClickPaste: boolean;
        edgelessScrollZoom: boolean;
        edgelessDisableScheduleUpdate: boolean;
        docCanvasPreferView: "affine:embed-linked-doc" | "affine:embed-synced-doc";
        connector: {
            mode: import("@blocksuite/affine-model").ConnectorMode;
            frontEndpointStyle: import("@blocksuite/affine-model").PointStyle;
            rearEndpointStyle: import("@blocksuite/affine-model").PointStyle;
            stroke: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: import("@blocksuite/affine-model").LineWidth;
            rough: boolean;
            labelStyle: {
                textAlign: import("@blocksuite/affine-model").TextAlign;
                color: string | {
                    normal: string;
                } | {
                    dark: string;
                    light: string;
                };
                fontSize: number;
                fontFamily: import("@blocksuite/affine-model").FontFamily;
                fontWeight: import("@blocksuite/affine-model").FontWeight;
                fontStyle: import("@blocksuite/affine-model").FontStyle;
            };
        };
        brush: {
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            lineWidth: import("@blocksuite/affine-model").LineWidth;
        };
        highlighter: {
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            lineWidth: number;
        };
        mindmap: {
            style: import("@blocksuite/affine-model").MindmapStyle;
            layoutType: import("@blocksuite/affine-model").LayoutType;
        };
        'affine:edgeless-text': {
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            textAlign: import("@blocksuite/affine-model").TextAlign;
        };
        'affine:frame': {
            background: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
        };
        'shape:diamond': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
        'shape:ellipse': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
        'shape:rect': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
        'shape:triangle': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
        'shape:roundedRect': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
    }>;
    settingSignal: Signal<Partial<EditorSettingSchema>>;
    get<K extends keyof EditorSettingSchema>(key: K): {
        text: {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
        };
        'affine:note': {
            edgeless: {
                style: {
                    borderRadius: number;
                    borderSize: number;
                    borderStyle: import("@blocksuite/affine-model").StrokeStyle;
                    shadowType: import("@blocksuite/affine-model").NoteShadow;
                };
            };
            background: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            displayMode: import("@blocksuite/affine-model").NoteDisplayMode;
        };
        fontFamily: "Sans" | "Serif" | "Mono" | "Custom";
        fontSize: number;
        customFontFamily: string;
        newDocDefaultMode: "page" | "edgeless" | "ask";
        fullWidthLayout: boolean;
        displayDocInfo: boolean;
        displayBiDirectionalLink: boolean;
        edgelessDefaultTheme: "auto" | "dark" | "light" | "specified";
        openDocMode: "open-in-active-view" | "open-in-new-view" | "open-in-new-tab" | "open-in-center-peek";
        enableMiddleClickPaste: boolean;
        edgelessScrollZoom: boolean;
        edgelessDisableScheduleUpdate: boolean;
        docCanvasPreferView: "affine:embed-linked-doc" | "affine:embed-synced-doc";
        connector: {
            mode: import("@blocksuite/affine-model").ConnectorMode;
            frontEndpointStyle: import("@blocksuite/affine-model").PointStyle;
            rearEndpointStyle: import("@blocksuite/affine-model").PointStyle;
            stroke: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: import("@blocksuite/affine-model").LineWidth;
            rough: boolean;
            labelStyle: {
                textAlign: import("@blocksuite/affine-model").TextAlign;
                color: string | {
                    normal: string;
                } | {
                    dark: string;
                    light: string;
                };
                fontSize: number;
                fontFamily: import("@blocksuite/affine-model").FontFamily;
                fontWeight: import("@blocksuite/affine-model").FontWeight;
                fontStyle: import("@blocksuite/affine-model").FontStyle;
            };
        };
        brush: {
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            lineWidth: import("@blocksuite/affine-model").LineWidth;
        };
        highlighter: {
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            lineWidth: number;
        };
        mindmap: {
            style: import("@blocksuite/affine-model").MindmapStyle;
            layoutType: import("@blocksuite/affine-model").LayoutType;
        };
        'affine:edgeless-text': {
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            textAlign: import("@blocksuite/affine-model").TextAlign;
        };
        'affine:frame': {
            background: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
        };
        'shape:diamond': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
        'shape:ellipse': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
        'shape:rect': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
        'shape:triangle': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
        'shape:roundedRect': {
            textAlign: import("@blocksuite/affine-model").TextAlign;
            radius: number;
            strokeStyle: import("@blocksuite/affine-model").StrokeStyle;
            strokeWidth: number;
            color: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            fontSize: number;
            fontFamily: import("@blocksuite/affine-model").FontFamily;
            fontWeight: import("@blocksuite/affine-model").FontWeight;
            fontStyle: import("@blocksuite/affine-model").FontStyle;
            fillColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            strokeColor: string | {
                normal: string;
            } | {
                dark: string;
                light: string;
            };
            shapeStyle: import("@blocksuite/affine-model").ShapeStyle;
            filled: boolean;
            roughness: number;
            textHorizontalAlign?: import("@blocksuite/affine-model").TextAlign | undefined;
            textVerticalAlign?: import("@blocksuite/affine-model").TextVerticalAlign | undefined;
        };
    }[K];
    set<K extends keyof EditorSettingSchema>(key: K, value: DeepPartial<EditorSettingSchema[K]>): void;
    private watchAll;
}
export type EditorSettingExt = EditorSetting & {
    [K in keyof EditorSettingSchema]: SettingItem<EditorSettingSchema[K]>;
};
export {};
//# sourceMappingURL=editor-setting.d.ts.map