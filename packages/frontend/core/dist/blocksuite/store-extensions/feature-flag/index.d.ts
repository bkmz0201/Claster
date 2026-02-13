import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { type StoreExtensionContext, StoreExtensionProvider } from '@blocksuite/affine/ext-loader';
import { z } from 'zod';
declare const optionsSchema: z.ZodObject<{
    featureFlagService: z.ZodOptional<z.ZodType<FeatureFlagService, z.ZodTypeDef, FeatureFlagService>>;
}, "strip", z.ZodTypeAny, {
    featureFlagService?: FeatureFlagService | undefined;
}, {
    featureFlagService?: FeatureFlagService | undefined;
}>;
export declare class FeatureFlagStoreExtension extends StoreExtensionProvider {
    name: string;
    schema: z.ZodObject<{
        featureFlagService: z.ZodOptional<z.ZodType<FeatureFlagService, z.ZodTypeDef, FeatureFlagService>>;
    }, "strip", z.ZodTypeAny, {
        featureFlagService?: FeatureFlagService | undefined;
    }, {
        featureFlagService?: FeatureFlagService | undefined;
    }>;
    setup(context: StoreExtensionContext, options?: z.infer<typeof optionsSchema>): void;
}
export {};
//# sourceMappingURL=index.d.ts.map