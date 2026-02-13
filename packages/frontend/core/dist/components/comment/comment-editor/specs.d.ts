import { type PeekViewService } from '@blocksuite/affine/components/peek';
import { ViewExtensionManager } from '@blocksuite/affine/ext-loader';
import type { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
declare const commentEditorViewExtensionOptionsSchema: z.ZodObject<{
    peekView: z.ZodOptional<z.ZodType<PeekViewService, z.ZodTypeDef, PeekViewService>>;
    fontConfig: z.ZodOptional<z.ZodArray<z.ZodObject<{
        font: z.ZodString;
        weight: z.ZodString;
        url: z.ZodString;
        style: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        style: string;
        font: string;
        url: string;
        weight: string;
    }, {
        style: string;
        font: string;
        url: string;
        weight: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    fontConfig?: {
        style: string;
        font: string;
        url: string;
        weight: string;
    }[] | undefined;
    peekView?: PeekViewService | undefined;
}, {
    fontConfig?: {
        style: string;
        font: string;
        url: string;
        weight: string;
    }[] | undefined;
    peekView?: PeekViewService | undefined;
}>;
export type CommentEditorViewExtensionOptions = z.infer<typeof commentEditorViewExtensionOptionsSchema>;
export declare function getCommentEditorViewManager(framework: FrameworkProvider): ViewExtensionManager;
export {};
//# sourceMappingURL=specs.d.ts.map