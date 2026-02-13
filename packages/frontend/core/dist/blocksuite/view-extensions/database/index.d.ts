import { type ViewExtensionContext, ViewExtensionProvider } from '@blocksuite/affine/ext-loader';
import { z } from 'zod';
declare const optionsSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export type AffineDatabaseViewOptions = z.infer<typeof optionsSchema>;
export declare class AffineDatabaseViewExtension extends ViewExtensionProvider<AffineDatabaseViewOptions> {
    name: string;
    schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    setup(context: ViewExtensionContext, options?: AffineDatabaseViewOptions): void;
}
export {};
//# sourceMappingURL=index.d.ts.map