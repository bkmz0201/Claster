import { type ViewExtensionContext, ViewExtensionProvider } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
declare const optionsSchema: z.ZodObject<{
    framework: z.ZodOptional<z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>>;
    enableCloud: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    framework?: FrameworkProvider | undefined;
    enableCloud?: boolean | undefined;
}, {
    framework?: FrameworkProvider | undefined;
    enableCloud?: boolean | undefined;
}>;
type CloudViewOptions = z.infer<typeof optionsSchema>;
export declare class CloudViewExtension extends ViewExtensionProvider<CloudViewOptions> {
    name: string;
    schema: z.ZodObject<{
        framework: z.ZodOptional<z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>>;
        enableCloud: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        framework?: FrameworkProvider | undefined;
        enableCloud?: boolean | undefined;
    }, {
        framework?: FrameworkProvider | undefined;
        enableCloud?: boolean | undefined;
    }>;
    setup(context: ViewExtensionContext, options?: CloudViewOptions): void;
}
export {};
//# sourceMappingURL=index.d.ts.map