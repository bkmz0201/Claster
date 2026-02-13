import { type Backlink } from '@affine/core/modules/doc-link';
import type { ExtensionType, TransformerMiddleware } from '@blocksuite/affine/store';
type BacklinkGroups = {
    docId: string;
    title: string;
    links: Backlink[];
};
type TextRendererOptions = {
    customHeading: boolean;
    extensions: ExtensionType[];
    additionalMiddlewares: TransformerMiddleware[];
};
export declare const BacklinkGroups: () => import("react/jsx-runtime").JSX.Element;
export declare const LinkPreview: ({ linkGroup, textRendererOptions, }: {
    linkGroup: BacklinkGroups;
    textRendererOptions: TextRendererOptions;
}) => import("react/jsx-runtime").JSX.Element;
export declare const BiDirectionalLinkPanel: () => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=bi-directional-link-panel.d.ts.map