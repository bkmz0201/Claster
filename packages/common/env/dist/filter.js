import { z } from 'zod';
export const literalValueSchema = z.union([
    z.number(),
    z.string(),
    z.boolean(),
    z.array(z.lazy(() => literalValueSchema)),
    z.record(z.lazy(() => literalValueSchema)),
]);
export const refSchema = z.object({
    type: z.literal('ref'),
    name: z.never(),
});
export const literalSchema = z.object({
    type: z.literal('literal'),
    value: literalValueSchema,
});
export const filterSchema = z.object({
    type: z.literal('filter'),
    left: refSchema,
    funcName: z.string(),
    args: z.array(literalSchema),
});
export const collectionSchema = z.object({
    id: z.string(),
    name: z.string(),
    filterList: z.array(filterSchema),
    allowList: z.array(z.string()),
    createDate: z.union([z.date(), z.number()]).optional(),
    updateDate: z.union([z.date(), z.number()]).optional(),
});
//# sourceMappingURL=filter.js.map