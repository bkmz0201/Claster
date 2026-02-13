import type { AttachmentBlockModel } from '@blocksuite/affine/model';
export declare const MenuItems: ({ model }: {
    model: AttachmentBlockModel;
}) => import("react/jsx-runtime").JSX.Element[];
export interface TitlebarProps {
    model: AttachmentBlockModel;
    name: string;
    ext: string;
    size: string;
    zoom?: number;
}
export declare const Titlebar: ({ model, name, ext, size, zoom, }: TitlebarProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=viewer.d.ts.map