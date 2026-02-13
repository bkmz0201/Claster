import { type OpenDocConfigItem } from '@blocksuite/affine/shared/services';
type OpenDocAction = OpenDocConfigItem & {
    enabled: boolean;
    shortcut?: string;
};
export declare const openDocActions: Array<OpenDocAction>;
export declare function patchOpenDocExtension(): import("@blocksuite/store").ExtensionType;
export {};
//# sourceMappingURL=open-doc.d.ts.map