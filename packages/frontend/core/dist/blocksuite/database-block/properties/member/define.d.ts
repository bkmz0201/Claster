import zod from 'zod';
export declare const memberColumnType: {
    type: "member";
    modelConfig: <PropertyData extends Record<string, unknown> = Record<string, never>, RawValue = unknown, JsonValue = unknown>(ops: import("@blocksuite/data-view").PropertyConfig<PropertyData, RawValue, JsonValue>) => import("@blocksuite/data-view").PropertyModel<"member", PropertyData, RawValue, JsonValue>;
};
export declare const MemberItemSchema: zod.ZodString;
export type MemberItemType = zod.TypeOf<typeof MemberItemSchema>;
declare const MemberCellRawValueTypeSchema: zod.ZodArray<zod.ZodString, "many">;
export declare const MemberCellJsonValueTypeSchema: zod.ZodArray<zod.ZodString, "many">;
export type MemberCellRawValueType = zod.TypeOf<typeof MemberCellRawValueTypeSchema>;
export type MemberCellJsonValueType = zod.TypeOf<typeof MemberCellJsonValueTypeSchema>;
export declare const memberPropertyModelConfig: import("@blocksuite/data-view").PropertyModel<"member", {}, string[], string[]>;
export {};
//# sourceMappingURL=define.d.ts.map