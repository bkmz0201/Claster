import { type ViewExtensionContext, ViewExtensionProvider } from '@blocksuite/affine/ext-loader';
import { z } from 'zod';
declare const optionsSchema: z.ZodObject<{
    enableTurboRenderer: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    enableTurboRenderer?: boolean | undefined;
}, {
    enableTurboRenderer?: boolean | undefined;
}>;
type TurboRendererViewOptions = z.infer<typeof optionsSchema>;
export declare class TurboRendererViewExtension extends ViewExtensionProvider<TurboRendererViewOptions> {
    name: string;
    schema: z.ZodObject<{
        enableTurboRenderer: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enableTurboRenderer?: boolean | undefined;
    }, {
        enableTurboRenderer?: boolean | undefined;
    }>;
    setup(context: ViewExtensionContext, options?: TurboRendererViewOptions): void;
}
export {};
//# sourceMappingURL=index.d.ts.map