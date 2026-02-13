import type { ElementOrFactory } from '@affine/component';
import { type ViewExtensionContext, ViewExtensionProvider } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import type { TemplateResult } from 'lit';
import { z } from 'zod';
declare const optionsSchema: z.ZodObject<{
    isInPeekView: z.ZodBoolean;
    framework: z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>;
    reactToLit: z.ZodFunction<z.ZodTuple<[z.ZodType<ElementOrFactory, z.ZodTypeDef, ElementOrFactory>, z.ZodOptional<z.ZodBoolean>], z.ZodUnknown>, z.ZodType<TemplateResult, z.ZodTypeDef, TemplateResult>>;
}, "strip", z.ZodTypeAny, {
    framework: FrameworkProvider;
    reactToLit: (args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult;
    isInPeekView: boolean;
}, {
    framework: FrameworkProvider;
    reactToLit: (args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult;
    isInPeekView: boolean;
}>;
export type EdgelessBlockHeaderViewOptions = z.infer<typeof optionsSchema>;
export declare class EdgelessBlockHeaderConfigViewExtension extends ViewExtensionProvider<EdgelessBlockHeaderViewOptions> {
    name: string;
    schema: z.ZodObject<{
        isInPeekView: z.ZodBoolean;
        framework: z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>;
        reactToLit: z.ZodFunction<z.ZodTuple<[z.ZodType<ElementOrFactory, z.ZodTypeDef, ElementOrFactory>, z.ZodOptional<z.ZodBoolean>], z.ZodUnknown>, z.ZodType<TemplateResult, z.ZodTypeDef, TemplateResult>>;
    }, "strip", z.ZodTypeAny, {
        framework: FrameworkProvider;
        reactToLit: (args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult;
        isInPeekView: boolean;
    }, {
        framework: FrameworkProvider;
        reactToLit: (args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult;
        isInPeekView: boolean;
    }>;
    setup(context: ViewExtensionContext, options?: EdgelessBlockHeaderViewOptions): void;
}
export {};
//# sourceMappingURL=index.d.ts.map