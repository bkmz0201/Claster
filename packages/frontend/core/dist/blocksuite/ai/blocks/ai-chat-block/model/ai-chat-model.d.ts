import { type GfxCommonBlockProps } from '@blocksuite/affine/std/gfx';
type AIChatProps = {
    messages: string;
    sessionId: string;
    rootWorkspaceId: string;
    rootDocId: string;
} & Omit<GfxCommonBlockProps, 'rotate'>;
export declare const AIChatBlockSchema: {
    version: number;
    model: {
        props: import("@blocksuite/store").PropsGetter<AIChatProps>;
        flavour: "affine:embed-ai-chat";
    } & {
        version: number;
        role: "content";
        children: never[];
    };
    transformer?: ((transformerConfig: Map<string, unknown>) => import("@blocksuite/store").BaseBlockTransformer<AIChatProps>) | undefined;
};
export declare const AIChatBlockSchemaExtension: import("@blocksuite/store").ExtensionType;
declare const AIChatBlockModel_base: {
    new (): import("@blocksuite/std/gfx").GfxBlockElementModel<AIChatProps>;
};
export declare class AIChatBlockModel extends AIChatBlockModel_base {
}
export {};
//# sourceMappingURL=ai-chat-model.d.ts.map