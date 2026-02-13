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
type MobileViewOptions = z.infer<typeof optionsSchema>;
export declare class MobileViewExtension extends ViewExtensionProvider<MobileViewOptions> {
    name: string;
    schema: z.ZodObject<{
        framework: z.ZodOptional<z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>>;
    }, "strip", z.ZodTypeAny, {
        framework?: FrameworkProvider | undefined;
    }, {
        framework?: FrameworkProvider | undefined;
    }>;
    setup(context: ViewExtensionContext, options?: MobileViewOptions): void;
}
export {};
//# sourceMappingURL=index.d.ts.map