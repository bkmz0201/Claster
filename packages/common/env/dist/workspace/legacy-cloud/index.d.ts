/**
 * @deprecated Remove this file after we migrate to the new cloud.
 */
import { z } from 'zod';
export interface User {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
    create_at: string;
}
export interface GetUserByEmailParams {
    email: string;
    workspace_id: string;
}
export declare const usageResponseSchema: z.ZodObject<{
    blob_usage: z.ZodObject<{
        usage: z.ZodNumber;
        max_usage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        usage: number;
        max_usage: number;
    }, {
        usage: number;
        max_usage: number;
    }>;
}, "strip", z.ZodTypeAny, {
    blob_usage: {
        usage: number;
        max_usage: number;
    };
}, {
    blob_usage: {
        usage: number;
        max_usage: number;
    };
}>;
export type UsageResponse = z.infer<typeof usageResponseSchema>;
export interface GetWorkspaceDetailParams {
    id: string;
}
export declare enum WorkspaceType {
    Private = 0,
    Normal = 1
}
export declare enum PermissionType {
    Read = 0,
    Write = 1,
    Admin = 10,
    Owner = 99
}
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    avatar_url: z.ZodString;
    created_at: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    email: string;
    avatar_url: string;
    created_at: number;
}, {
    name: string;
    id: string;
    email: string;
    avatar_url: string;
    created_at: number;
}>;
export declare const workspaceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof WorkspaceType>;
    public: z.ZodBoolean;
    permission: z.ZodNativeEnum<typeof PermissionType>;
}, "strip", z.ZodTypeAny, {
    type: WorkspaceType;
    id: string;
    public: boolean;
    permission: PermissionType;
}, {
    type: WorkspaceType;
    id: string;
    public: boolean;
    permission: PermissionType;
}>;
export type Workspace = z.infer<typeof workspaceSchema>;
export declare const workspaceDetailSchema: z.ZodObject<{
    permission: z.ZodUndefined;
    owner: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        avatar_url: z.ZodString;
        created_at: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        email: string;
        avatar_url: string;
        created_at: number;
    }, {
        name: string;
        id: string;
        email: string;
        avatar_url: string;
        created_at: number;
    }>;
    member_count: z.ZodNumber;
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof WorkspaceType>;
    public: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: WorkspaceType;
    id: string;
    public: boolean;
    owner: {
        name: string;
        id: string;
        email: string;
        avatar_url: string;
        created_at: number;
    };
    member_count: number;
    permission?: undefined;
}, {
    type: WorkspaceType;
    id: string;
    public: boolean;
    owner: {
        name: string;
        id: string;
        email: string;
        avatar_url: string;
        created_at: number;
    };
    member_count: number;
    permission?: undefined;
}>;
export type WorkspaceDetail = z.infer<typeof workspaceDetailSchema>;
export interface Permission {
    id: string;
    type: PermissionType;
    workspace_id: string;
    user_id: string;
    user_email: string;
    accepted: boolean;
    create_at: number;
}
export interface RegisteredUser extends User {
    type: 'Registered';
}
export interface UnregisteredUser {
    type: 'Unregistered';
    email: string;
}
export interface Member extends Permission {
    user: RegisteredUser | UnregisteredUser;
}
export interface GetWorkspaceMembersParams {
    id: string;
}
export interface CreateWorkspaceParams {
    name: string;
}
export interface UpdateWorkspaceParams {
    id: string;
    public: boolean;
}
export interface DeleteWorkspaceParams {
    id: string;
}
export interface InviteMemberParams {
    id: string;
    email: string;
}
export interface RemoveMemberParams {
    permissionId: number;
}
export interface AcceptInvitingParams {
    invitingCode: string;
}
export interface LeaveWorkspaceParams {
    id: number | string;
}
export declare const createWorkspaceResponseSchema: z.ZodObject<{
    id: z.ZodString;
    public: z.ZodBoolean;
    type: z.ZodNativeEnum<typeof WorkspaceType>;
    created_at: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: WorkspaceType;
    id: string;
    created_at: number;
    public: boolean;
}, {
    type: WorkspaceType;
    id: string;
    created_at: number;
    public: boolean;
}>;
//# sourceMappingURL=index.d.ts.map