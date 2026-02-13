import { z } from 'zod';
export declare const appSchemes: z.ZodEnum<["affine", "affine-canary", "affine-beta", "affine-internal", "affine-dev"]>;
export type Scheme = z.infer<typeof appSchemes>;
export type Channel = 'stable' | 'canary' | 'beta' | 'internal';
export declare const schemeToChannel: Record<Scheme, Channel>;
export declare const channelToScheme: Record<Channel, Scheme>;
export declare const appIconMap: {
    stable: string;
    canary: string;
    beta: string;
    internal: string;
};
export declare const appNames: {
    stable: string;
    canary: string;
    beta: string;
    internal: string;
};
export declare const appSchemaUrl: z.ZodType<string, z.ZodTypeDef, string>;
//# sourceMappingURL=channel.d.ts.map