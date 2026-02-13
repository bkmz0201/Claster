import type { ElementOrFactory } from '@affine/component';
import { type ViewExtensionContext, ViewExtensionProvider } from '@blocksuite/affine/ext-loader';
import type { TemplateResult } from 'lit';
import { z } from 'zod';
declare const optionsSchema: z.ZodObject<{
    enablePDFEmbedPreview: z.ZodOptional<z.ZodBoolean>;
    reactToLit: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<ElementOrFactory, z.ZodTypeDef, ElementOrFactory>, z.ZodOptional<z.ZodBoolean>], z.ZodUnknown>, z.ZodType<TemplateResult, z.ZodTypeDef, TemplateResult>>>;
}, "strip", z.ZodTypeAny, {
    reactToLit?: ((args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult) | undefined;
    enablePDFEmbedPreview?: boolean | undefined;
}, {
    reactToLit?: ((args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult) | undefined;
    enablePDFEmbedPreview?: boolean | undefined;
}>;
type PdfViewOptions = z.infer<typeof optionsSchema>;
export declare class PdfViewExtension extends ViewExtensionProvider<PdfViewOptions> {
    name: string;
    schema: z.ZodObject<{
        enablePDFEmbedPreview: z.ZodOptional<z.ZodBoolean>;
        reactToLit: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodType<ElementOrFactory, z.ZodTypeDef, ElementOrFactory>, z.ZodOptional<z.ZodBoolean>], z.ZodUnknown>, z.ZodType<TemplateResult, z.ZodTypeDef, TemplateResult>>>;
    }, "strip", z.ZodTypeAny, {
        reactToLit?: ((args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult) | undefined;
        enablePDFEmbedPreview?: boolean | undefined;
    }, {
        reactToLit?: ((args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult) | undefined;
        enablePDFEmbedPreview?: boolean | undefined;
    }>;
    setup(context: ViewExtensionContext, options?: PdfViewOptions): void;
}
export {};
//# sourceMappingURL=index.d.ts.map