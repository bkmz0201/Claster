import { type ViewExtensionContext, ViewExtensionProvider } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
declare const optionsSchema: z.ZodObject<{
    framework: z.ZodOptional<z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>>;
}, "strip", z.ZodTypeAny, {
    framework?: FrameworkProvider | undefined;
}, {
    framework?: FrameworkProvider | undefined;
}>;
export declare class CodeBlockPreviewViewExtension extends ViewExtensionProvider {
    name: string;
    schema: z.ZodObject<{
        framework: z.ZodOptional<z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>>;
    }, "strip", z.ZodTypeAny, {
        framework?: FrameworkProvider | undefined;
    }, {
        framework?: FrameworkProvider | undefined;
    }>;
    effect(): void;
    setup(context: ViewExtensionContext, options?: z.infer<typeof optionsSchema>): void;
}
export {};
//# sourceMappingURL=index.d.ts.map