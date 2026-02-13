import { type ViewExtensionContext, ViewExtensionProvider } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
declare const optionsSchema: z.ZodObject<{
    enable: z.ZodOptional<z.ZodBoolean>;
    framework: z.ZodOptional<z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>>;
}, "strip", z.ZodTypeAny, {
    framework?: FrameworkProvider | undefined;
    enable?: boolean | undefined;
}, {
    framework?: FrameworkProvider | undefined;
    enable?: boolean | undefined;
}>;
type AIViewOptions = z.infer<typeof optionsSchema>;
export declare class AIViewExtension extends ViewExtensionProvider<AIViewOptions> {
    name: string;
    schema: z.ZodObject<{
        enable: z.ZodOptional<z.ZodBoolean>;
        framework: z.ZodOptional<z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>>;
    }, "strip", z.ZodTypeAny, {
        framework?: FrameworkProvider | undefined;
        enable?: boolean | undefined;
    }, {
        framework?: FrameworkProvider | undefined;
        enable?: boolean | undefined;
    }>;
    setup(context: ViewExtensionContext, options?: AIViewOptions): void;
}
export {};
//# sourceMappingURL=index.d.ts.map