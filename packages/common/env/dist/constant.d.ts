declare global {
    var __appInfo: {
        electron: boolean;
        scheme: string;
        windowName: string;
    };
}
export declare const DEFAULT_WORKSPACE_NAME = "Demo Workspace";
export declare const UNTITLED_WORKSPACE_NAME = "Untitled";
export declare const DEFAULT_SORT_KEY = "updatedDate";
export declare const MessageCode: {
    readonly loginError: 0;
    readonly noPermission: 1;
    readonly loadListFailed: 2;
    readonly getDetailFailed: 3;
    readonly createWorkspaceFailed: 4;
    readonly getMembersFailed: 5;
    readonly updateWorkspaceFailed: 6;
    readonly deleteWorkspaceFailed: 7;
    readonly inviteMemberFailed: 8;
    readonly removeMemberFailed: 9;
    readonly acceptInvitingFailed: 10;
    readonly getBlobFailed: 11;
    readonly leaveWorkspaceFailed: 12;
    readonly downloadWorkspaceFailed: 13;
    readonly refreshTokenError: 14;
    readonly blobTooLarge: 15;
};
export declare const Messages: {
    readonly 0: {
        readonly message: "Login failed";
    };
    readonly 1: {
        readonly message: "No permission";
    };
    readonly 2: {
        readonly message: "Load list failed";
    };
    readonly 3: {
        readonly message: "Get detail failed";
    };
    readonly 4: {
        readonly message: "Create workspace failed";
    };
    readonly 5: {
        readonly message: "Get members failed";
    };
    readonly 6: {
        readonly message: "Update workspace failed";
    };
    readonly 7: {
        readonly message: "Delete workspace failed";
    };
    readonly 8: {
        readonly message: "Invite member failed";
    };
    readonly 9: {
        readonly message: "Remove member failed";
    };
    readonly 10: {
        readonly message: "Accept inviting failed";
    };
    readonly 11: {
        readonly message: "Get blob failed";
    };
    readonly 12: {
        readonly message: "Leave workspace failed";
    };
    readonly 13: {
        readonly message: "Download workspace failed";
    };
    readonly 14: {
        readonly message: "Refresh token failed";
    };
    readonly 15: {
        readonly message: "Blob too large";
    };
};
export declare class WorkspaceNotFoundError extends TypeError {
    readonly workspaceId: string;
    constructor(workspaceId: string);
}
export declare class QueryParamError extends TypeError {
    readonly targetKey: string;
    readonly query: unknown;
    constructor(targetKey: string, query: unknown);
}
export declare class Unreachable extends Error {
    constructor(message?: string);
}
//# sourceMappingURL=constant.d.ts.map