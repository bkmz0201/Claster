import type { DocsPropertiesMeta } from '@blocksuite/affine/store';
import { z } from 'zod';
export declare const literalValueSchema: z.ZodType<LiteralValue, z.ZodTypeDef>;
export type LiteralValue = number | string | boolean | {
    [K: string]: LiteralValue;
} | Array<LiteralValue>;
export declare const refSchema: z.ZodType<Ref, z.ZodTypeDef>;
export type Ref = {
    type: 'ref';
    name: keyof VariableMap;
};
export interface VariableMap {
}
export declare const literalSchema: z.ZodObject<{
    type: z.ZodLiteral<"literal">;
    value: z.ZodType<LiteralValue, z.ZodTypeDef, LiteralValue>;
}, "strip", z.ZodTypeAny, {
    value: LiteralValue;
    type: "literal";
}, {
    value: LiteralValue;
    type: "literal";
}>;
export type Literal = z.input<typeof literalSchema>;
export declare const filterSchema: z.ZodObject<{
    type: z.ZodLiteral<"filter">;
    left: z.ZodType<Ref, z.ZodTypeDef, Ref>;
    funcName: z.ZodString;
    args: z.ZodArray<z.ZodObject<{
        type: z.ZodLiteral<"literal">;
        value: z.ZodType<LiteralValue, z.ZodTypeDef, LiteralValue>;
    }, "strip", z.ZodTypeAny, {
        value: LiteralValue;
        type: "literal";
    }, {
        value: LiteralValue;
        type: "literal";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "filter";
    left: Ref;
    funcName: string;
    args: {
        value: LiteralValue;
        type: "literal";
    }[];
}, {
    type: "filter";
    left: Ref;
    funcName: string;
    args: {
        value: LiteralValue;
        type: "literal";
    }[];
}>;
export type Filter = z.input<typeof filterSchema>;
export declare const collectionSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    filterList: z.ZodArray<z.ZodObject<{
        type: z.ZodLiteral<"filter">;
        left: z.ZodType<Ref, z.ZodTypeDef, Ref>;
        funcName: z.ZodString;
        args: z.ZodArray<z.ZodObject<{
            type: z.ZodLiteral<"literal">;
            value: z.ZodType<LiteralValue, z.ZodTypeDef, LiteralValue>;
        }, "strip", z.ZodTypeAny, {
            value: LiteralValue;
            type: "literal";
        }, {
            value: LiteralValue;
            type: "literal";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "filter";
        left: Ref;
        funcName: string;
        args: {
            value: LiteralValue;
            type: "literal";
        }[];
    }, {
        type: "filter";
        left: Ref;
        funcName: string;
        args: {
            value: LiteralValue;
            type: "literal";
        }[];
    }>, "many">;
    allowList: z.ZodArray<z.ZodString, "many">;
    createDate: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
    updateDate: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    filterList: {
        type: "filter";
        left: Ref;
        funcName: string;
        args: {
            value: LiteralValue;
            type: "literal";
        }[];
    }[];
    allowList: string[];
    createDate?: number | Date | undefined;
    updateDate?: number | Date | undefined;
}, {
    name: string;
    id: string;
    filterList: {
        type: "filter";
        left: Ref;
        funcName: string;
        args: {
            value: LiteralValue;
            type: "literal";
        }[];
    }[];
    allowList: string[];
    createDate?: number | Date | undefined;
    updateDate?: number | Date | undefined;
}>;
export type Collection = z.input<typeof collectionSchema>;
export type PropertiesMeta = DocsPropertiesMeta;
//# sourceMappingURL=filter.d.ts.map