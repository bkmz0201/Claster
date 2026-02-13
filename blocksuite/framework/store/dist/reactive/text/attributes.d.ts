import { z } from 'zod';
export declare const baseTextAttributes: z.ZodObject<{
    bold: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodLiteral<true>>>>;
    italic: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodLiteral<true>>>>;
    underline: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodLiteral<true>>>>;
    strike: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodLiteral<true>>>>;
    code: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodLiteral<true>>>>;
    link: z.ZodCatch<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    code?: true | null | undefined;
    bold?: true | null | undefined;
    italic?: true | null | undefined;
    underline?: true | null | undefined;
    strike?: true | null | undefined;
    link?: string | null | undefined;
}, {
    code?: unknown;
    bold?: unknown;
    italic?: unknown;
    underline?: unknown;
    strike?: unknown;
    link?: unknown;
}>;
export type BaseTextAttributes = z.infer<typeof baseTextAttributes>;
//# sourceMappingURL=attributes.d.ts.map