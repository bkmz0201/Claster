import { type ViewExtensionContext, ViewExtensionProvider } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import z from 'zod';
declare const optionsSchema: z.ZodObject<{
    enableComment: z.ZodOptional<z.ZodBoolean>;
    framework: z.ZodOptional<z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>>;
}, "strip", z.ZodTypeAny, {
    framework?: FrameworkProvider | undefined;
    enableComment?: boolean | undefined;
}, {
    framework?: FrameworkProvider | undefined;
    enableComment?: boolean | undefined;
}>;
type CommentViewOptions = z.infer<typeof optionsSchema>;
export declare class CommentViewExtension extends ViewExtensionProvider<CommentViewOptions> {
    name: string;
    schema: z.ZodObject<{
        enableComment: z.ZodOptional<z.ZodBoolean>;
        framework: z.ZodOptional<z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>>;
    }, "strip", z.ZodTypeAny, {
        framework?: FrameworkProvider | undefined;
        enableComment?: boolean | undefined;
    }, {
        framework?: FrameworkProvider | undefined;
        enableComment?: boolean | undefined;
    }>;
    setup(context: ViewExtensionContext, options?: CommentViewOptions): void;
}
export {};
//# sourceMappingURL=index.d.ts.map