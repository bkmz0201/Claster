/**
 * @deprecated Remove this file after we migrate to the new cloud.
 */
import { z } from 'zod';
export const usageResponseSchema = z.object({
    blob_usage: z.object({
        usage: z.number(),
        max_usage: z.number(),
    }),
});
export var WorkspaceType;
(function (WorkspaceType) {
    WorkspaceType[WorkspaceType["Private"] = 0] = "Private";
    WorkspaceType[WorkspaceType["Normal"] = 1] = "Normal";
})(WorkspaceType || (WorkspaceType = {}));
export var PermissionType;
(function (PermissionType) {
    PermissionType[PermissionType["Read"] = 0] = "Read";
    PermissionType[PermissionType["Write"] = 1] = "Write";
    PermissionType[PermissionType["Admin"] = 10] = "Admin";
    PermissionType[PermissionType["Owner"] = 99] = "Owner";
})(PermissionType || (PermissionType = {}));
export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatar_url: z.string(),
    created_at: z.number(),
});
export const workspaceSchema = z.object({
    id: z.string(),
    type: z.nativeEnum(WorkspaceType),
    public: z.boolean(),
    permission: z.nativeEnum(PermissionType),
});
export const workspaceDetailSchema = z.object({
    ...workspaceSchema.shape,
    permission: z.undefined(),
    owner: userSchema,
    member_count: z.number(),
});
export const createWorkspaceResponseSchema = z.object({
    id: z.string(),
    public: z.boolean(),
    type: z.nativeEnum(WorkspaceType),
    created_at: z.number(),
});
//# sourceMappingURL=index.js.map