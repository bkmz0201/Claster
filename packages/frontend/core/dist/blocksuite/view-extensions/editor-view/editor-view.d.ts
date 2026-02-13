import type { ConfirmModalProps, ElementOrFactory } from '@affine/component';
import { type ViewExtensionContext, ViewExtensionProvider } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import type { TemplateResult } from 'lit';
import { z } from 'zod';
declare const optionsSchema: z.ZodObject<{
    framework: z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>;
    reactToLit: z.ZodFunction<z.ZodTuple<[z.ZodType<ElementOrFactory, z.ZodTypeDef, ElementOrFactory>, z.ZodOptional<z.ZodBoolean>], z.ZodUnknown>, z.ZodType<TemplateResult, z.ZodTypeDef, TemplateResult>>;
    confirmModal: z.ZodObject<{
        openConfirmModal: z.ZodFunction<z.ZodTuple<[z.ZodOptional<z.ZodType<ConfirmModalProps, z.ZodTypeDef, ConfirmModalProps>>, z.ZodOptional<z.ZodAny>], z.ZodUnknown>, z.ZodUnknown>;
        closeConfirmModal: z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        openConfirmModal: (args_0: ConfirmModalProps | undefined, args_1: any, ...args: unknown[]) => unknown;
        closeConfirmModal: (...args: unknown[]) => unknown;
    }, {
        openConfirmModal: (args_0: ConfirmModalProps | undefined, args_1: any, ...args: unknown[]) => unknown;
        closeConfirmModal: (...args: unknown[]) => unknown;
    }>;
    scope: z.ZodOptional<z.ZodEnum<["doc", "workspace"]>>;
}, "strip", z.ZodTypeAny, {
    framework: FrameworkProvider;
    reactToLit: (args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult;
    confirmModal: {
        openConfirmModal: (args_0: ConfirmModalProps | undefined, args_1: any, ...args: unknown[]) => unknown;
        closeConfirmModal: (...args: unknown[]) => unknown;
    };
    scope?: "doc" | "workspace" | undefined;
}, {
    framework: FrameworkProvider;
    reactToLit: (args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult;
    confirmModal: {
        openConfirmModal: (args_0: ConfirmModalProps | undefined, args_1: any, ...args: unknown[]) => unknown;
        closeConfirmModal: (...args: unknown[]) => unknown;
    };
    scope?: "doc" | "workspace" | undefined;
}>;
export type AffineEditorViewOptions = z.infer<typeof optionsSchema>;
export declare class AffineEditorViewExtension extends ViewExtensionProvider<AffineEditorViewOptions> {
    name: string;
    schema: z.ZodObject<{
        framework: z.ZodType<FrameworkProvider, z.ZodTypeDef, FrameworkProvider>;
        reactToLit: z.ZodFunction<z.ZodTuple<[z.ZodType<ElementOrFactory, z.ZodTypeDef, ElementOrFactory>, z.ZodOptional<z.ZodBoolean>], z.ZodUnknown>, z.ZodType<TemplateResult, z.ZodTypeDef, TemplateResult>>;
        confirmModal: z.ZodObject<{
            openConfirmModal: z.ZodFunction<z.ZodTuple<[z.ZodOptional<z.ZodType<ConfirmModalProps, z.ZodTypeDef, ConfirmModalProps>>, z.ZodOptional<z.ZodAny>], z.ZodUnknown>, z.ZodUnknown>;
            closeConfirmModal: z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            openConfirmModal: (args_0: ConfirmModalProps | undefined, args_1: any, ...args: unknown[]) => unknown;
            closeConfirmModal: (...args: unknown[]) => unknown;
        }, {
            openConfirmModal: (args_0: ConfirmModalProps | undefined, args_1: any, ...args: unknown[]) => unknown;
            closeConfirmModal: (...args: unknown[]) => unknown;
        }>;
        scope: z.ZodOptional<z.ZodEnum<["doc", "workspace"]>>;
    }, "strip", z.ZodTypeAny, {
        framework: FrameworkProvider;
        reactToLit: (args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult;
        confirmModal: {
            openConfirmModal: (args_0: ConfirmModalProps | undefined, args_1: any, ...args: unknown[]) => unknown;
            closeConfirmModal: (...args: unknown[]) => unknown;
        };
        scope?: "doc" | "workspace" | undefined;
    }, {
        framework: FrameworkProvider;
        reactToLit: (args_0: ElementOrFactory, args_1: boolean | undefined, ...args: unknown[]) => TemplateResult;
        confirmModal: {
            openConfirmModal: (args_0: ConfirmModalProps | undefined, args_1: any, ...args: unknown[]) => unknown;
            closeConfirmModal: (...args: unknown[]) => unknown;
        };
        scope?: "doc" | "workspace" | undefined;
    }>;
    private readonly _getCustomReferenceRenderer;
    setup(context: ViewExtensionContext, options?: AffineEditorViewOptions): void;
}
export {};
//# sourceMappingURL=editor-view.d.ts.map