export var AiJobStatus;
(function (AiJobStatus) {
    AiJobStatus["claimed"] = "claimed";
    AiJobStatus["failed"] = "failed";
    AiJobStatus["finished"] = "finished";
    AiJobStatus["pending"] = "pending";
    AiJobStatus["running"] = "running";
})(AiJobStatus || (AiJobStatus = {}));
export var ChatHistoryOrder;
(function (ChatHistoryOrder) {
    ChatHistoryOrder["asc"] = "asc";
    ChatHistoryOrder["desc"] = "desc";
})(ChatHistoryOrder || (ChatHistoryOrder = {}));
/** Comment change action */
export var CommentChangeAction;
(function (CommentChangeAction) {
    CommentChangeAction["delete"] = "delete";
    CommentChangeAction["update"] = "update";
})(CommentChangeAction || (CommentChangeAction = {}));
export var ContextCategories;
(function (ContextCategories) {
    ContextCategories["Collection"] = "Collection";
    ContextCategories["Tag"] = "Tag";
})(ContextCategories || (ContextCategories = {}));
export var ContextEmbedStatus;
(function (ContextEmbedStatus) {
    ContextEmbedStatus["failed"] = "failed";
    ContextEmbedStatus["finished"] = "finished";
    ContextEmbedStatus["processing"] = "processing";
})(ContextEmbedStatus || (ContextEmbedStatus = {}));
export var CopilotPromptMessageRole;
(function (CopilotPromptMessageRole) {
    CopilotPromptMessageRole["assistant"] = "assistant";
    CopilotPromptMessageRole["system"] = "system";
    CopilotPromptMessageRole["user"] = "user";
})(CopilotPromptMessageRole || (CopilotPromptMessageRole = {}));
/** Doc mode */
export var DocMode;
(function (DocMode) {
    DocMode["edgeless"] = "edgeless";
    DocMode["page"] = "page";
})(DocMode || (DocMode = {}));
/** User permission in doc */
export var DocRole;
(function (DocRole) {
    DocRole["Commenter"] = "Commenter";
    DocRole["Editor"] = "Editor";
    DocRole["External"] = "External";
    DocRole["Manager"] = "Manager";
    DocRole["None"] = "None";
    DocRole["Owner"] = "Owner";
    DocRole["Reader"] = "Reader";
})(DocRole || (DocRole = {}));
export var ErrorNames;
(function (ErrorNames) {
    ErrorNames["ACCESS_DENIED"] = "ACCESS_DENIED";
    ErrorNames["ACTION_FORBIDDEN"] = "ACTION_FORBIDDEN";
    ErrorNames["ACTION_FORBIDDEN_ON_NON_TEAM_WORKSPACE"] = "ACTION_FORBIDDEN_ON_NON_TEAM_WORKSPACE";
    ErrorNames["ALREADY_IN_SPACE"] = "ALREADY_IN_SPACE";
    ErrorNames["AUTHENTICATION_REQUIRED"] = "AUTHENTICATION_REQUIRED";
    ErrorNames["BAD_REQUEST"] = "BAD_REQUEST";
    ErrorNames["BLOB_NOT_FOUND"] = "BLOB_NOT_FOUND";
    ErrorNames["BLOB_QUOTA_EXCEEDED"] = "BLOB_QUOTA_EXCEEDED";
    ErrorNames["CANNOT_DELETE_ACCOUNT_WITH_OWNED_TEAM_WORKSPACE"] = "CANNOT_DELETE_ACCOUNT_WITH_OWNED_TEAM_WORKSPACE";
    ErrorNames["CANNOT_DELETE_ALL_ADMIN_ACCOUNT"] = "CANNOT_DELETE_ALL_ADMIN_ACCOUNT";
    ErrorNames["CANNOT_DELETE_OWN_ACCOUNT"] = "CANNOT_DELETE_OWN_ACCOUNT";
    ErrorNames["CANT_UPDATE_ONETIME_PAYMENT_SUBSCRIPTION"] = "CANT_UPDATE_ONETIME_PAYMENT_SUBSCRIPTION";
    ErrorNames["CAN_NOT_BATCH_GRANT_DOC_OWNER_PERMISSIONS"] = "CAN_NOT_BATCH_GRANT_DOC_OWNER_PERMISSIONS";
    ErrorNames["CAN_NOT_REVOKE_YOURSELF"] = "CAN_NOT_REVOKE_YOURSELF";
    ErrorNames["CAPTCHA_VERIFICATION_FAILED"] = "CAPTCHA_VERIFICATION_FAILED";
    ErrorNames["COMMENT_ATTACHMENT_NOT_FOUND"] = "COMMENT_ATTACHMENT_NOT_FOUND";
    ErrorNames["COMMENT_ATTACHMENT_QUOTA_EXCEEDED"] = "COMMENT_ATTACHMENT_QUOTA_EXCEEDED";
    ErrorNames["COMMENT_NOT_FOUND"] = "COMMENT_NOT_FOUND";
    ErrorNames["COPILOT_ACTION_TAKEN"] = "COPILOT_ACTION_TAKEN";
    ErrorNames["COPILOT_CONTEXT_FILE_NOT_SUPPORTED"] = "COPILOT_CONTEXT_FILE_NOT_SUPPORTED";
    ErrorNames["COPILOT_DOCS_NOT_FOUND"] = "COPILOT_DOCS_NOT_FOUND";
    ErrorNames["COPILOT_DOC_NOT_FOUND"] = "COPILOT_DOC_NOT_FOUND";
    ErrorNames["COPILOT_EMBEDDING_DISABLED"] = "COPILOT_EMBEDDING_DISABLED";
    ErrorNames["COPILOT_EMBEDDING_UNAVAILABLE"] = "COPILOT_EMBEDDING_UNAVAILABLE";
    ErrorNames["COPILOT_FAILED_TO_ADD_WORKSPACE_FILE_EMBEDDING"] = "COPILOT_FAILED_TO_ADD_WORKSPACE_FILE_EMBEDDING";
    ErrorNames["COPILOT_FAILED_TO_CREATE_MESSAGE"] = "COPILOT_FAILED_TO_CREATE_MESSAGE";
    ErrorNames["COPILOT_FAILED_TO_GENERATE_EMBEDDING"] = "COPILOT_FAILED_TO_GENERATE_EMBEDDING";
    ErrorNames["COPILOT_FAILED_TO_GENERATE_TEXT"] = "COPILOT_FAILED_TO_GENERATE_TEXT";
    ErrorNames["COPILOT_FAILED_TO_MATCH_CONTEXT"] = "COPILOT_FAILED_TO_MATCH_CONTEXT";
    ErrorNames["COPILOT_FAILED_TO_MATCH_GLOBAL_CONTEXT"] = "COPILOT_FAILED_TO_MATCH_GLOBAL_CONTEXT";
    ErrorNames["COPILOT_FAILED_TO_MODIFY_CONTEXT"] = "COPILOT_FAILED_TO_MODIFY_CONTEXT";
    ErrorNames["COPILOT_INVALID_CONTEXT"] = "COPILOT_INVALID_CONTEXT";
    ErrorNames["COPILOT_MESSAGE_NOT_FOUND"] = "COPILOT_MESSAGE_NOT_FOUND";
    ErrorNames["COPILOT_PROMPT_INVALID"] = "COPILOT_PROMPT_INVALID";
    ErrorNames["COPILOT_PROMPT_NOT_FOUND"] = "COPILOT_PROMPT_NOT_FOUND";
    ErrorNames["COPILOT_PROVIDER_NOT_SUPPORTED"] = "COPILOT_PROVIDER_NOT_SUPPORTED";
    ErrorNames["COPILOT_PROVIDER_SIDE_ERROR"] = "COPILOT_PROVIDER_SIDE_ERROR";
    ErrorNames["COPILOT_QUOTA_EXCEEDED"] = "COPILOT_QUOTA_EXCEEDED";
    ErrorNames["COPILOT_SESSION_DELETED"] = "COPILOT_SESSION_DELETED";
    ErrorNames["COPILOT_SESSION_INVALID_INPUT"] = "COPILOT_SESSION_INVALID_INPUT";
    ErrorNames["COPILOT_SESSION_NOT_FOUND"] = "COPILOT_SESSION_NOT_FOUND";
    ErrorNames["COPILOT_TRANSCRIPTION_AUDIO_NOT_PROVIDED"] = "COPILOT_TRANSCRIPTION_AUDIO_NOT_PROVIDED";
    ErrorNames["COPILOT_TRANSCRIPTION_JOB_EXISTS"] = "COPILOT_TRANSCRIPTION_JOB_EXISTS";
    ErrorNames["COPILOT_TRANSCRIPTION_JOB_NOT_FOUND"] = "COPILOT_TRANSCRIPTION_JOB_NOT_FOUND";
    ErrorNames["CUSTOMER_PORTAL_CREATE_FAILED"] = "CUSTOMER_PORTAL_CREATE_FAILED";
    ErrorNames["DOC_ACTION_DENIED"] = "DOC_ACTION_DENIED";
    ErrorNames["DOC_DEFAULT_ROLE_CAN_NOT_BE_OWNER"] = "DOC_DEFAULT_ROLE_CAN_NOT_BE_OWNER";
    ErrorNames["DOC_HISTORY_NOT_FOUND"] = "DOC_HISTORY_NOT_FOUND";
    ErrorNames["DOC_IS_NOT_PUBLIC"] = "DOC_IS_NOT_PUBLIC";
    ErrorNames["DOC_NOT_FOUND"] = "DOC_NOT_FOUND";
    ErrorNames["DOC_UPDATE_BLOCKED"] = "DOC_UPDATE_BLOCKED";
    ErrorNames["EARLY_ACCESS_REQUIRED"] = "EARLY_ACCESS_REQUIRED";
    ErrorNames["EMAIL_ALREADY_USED"] = "EMAIL_ALREADY_USED";
    ErrorNames["EMAIL_SERVICE_NOT_CONFIGURED"] = "EMAIL_SERVICE_NOT_CONFIGURED";
    ErrorNames["EMAIL_TOKEN_NOT_FOUND"] = "EMAIL_TOKEN_NOT_FOUND";
    ErrorNames["EMAIL_VERIFICATION_REQUIRED"] = "EMAIL_VERIFICATION_REQUIRED";
    ErrorNames["EXPECT_TO_GRANT_DOC_USER_ROLES"] = "EXPECT_TO_GRANT_DOC_USER_ROLES";
    ErrorNames["EXPECT_TO_PUBLISH_DOC"] = "EXPECT_TO_PUBLISH_DOC";
    ErrorNames["EXPECT_TO_REVOKE_DOC_USER_ROLES"] = "EXPECT_TO_REVOKE_DOC_USER_ROLES";
    ErrorNames["EXPECT_TO_REVOKE_PUBLIC_DOC"] = "EXPECT_TO_REVOKE_PUBLIC_DOC";
    ErrorNames["EXPECT_TO_UPDATE_DOC_USER_ROLE"] = "EXPECT_TO_UPDATE_DOC_USER_ROLE";
    ErrorNames["FAILED_TO_CHECKOUT"] = "FAILED_TO_CHECKOUT";
    ErrorNames["FAILED_TO_SAVE_UPDATES"] = "FAILED_TO_SAVE_UPDATES";
    ErrorNames["FAILED_TO_UPSERT_SNAPSHOT"] = "FAILED_TO_UPSERT_SNAPSHOT";
    ErrorNames["GRAPHQL_BAD_REQUEST"] = "GRAPHQL_BAD_REQUEST";
    ErrorNames["HTTP_REQUEST_ERROR"] = "HTTP_REQUEST_ERROR";
    ErrorNames["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorNames["INVALID_APP_CONFIG"] = "INVALID_APP_CONFIG";
    ErrorNames["INVALID_APP_CONFIG_INPUT"] = "INVALID_APP_CONFIG_INPUT";
    ErrorNames["INVALID_AUTH_STATE"] = "INVALID_AUTH_STATE";
    ErrorNames["INVALID_CHECKOUT_PARAMETERS"] = "INVALID_CHECKOUT_PARAMETERS";
    ErrorNames["INVALID_EMAIL"] = "INVALID_EMAIL";
    ErrorNames["INVALID_EMAIL_TOKEN"] = "INVALID_EMAIL_TOKEN";
    ErrorNames["INVALID_HISTORY_TIMESTAMP"] = "INVALID_HISTORY_TIMESTAMP";
    ErrorNames["INVALID_INDEXER_INPUT"] = "INVALID_INDEXER_INPUT";
    ErrorNames["INVALID_INVITATION"] = "INVALID_INVITATION";
    ErrorNames["INVALID_LICENSE_SESSION_ID"] = "INVALID_LICENSE_SESSION_ID";
    ErrorNames["INVALID_LICENSE_TO_ACTIVATE"] = "INVALID_LICENSE_TO_ACTIVATE";
    ErrorNames["INVALID_LICENSE_UPDATE_PARAMS"] = "INVALID_LICENSE_UPDATE_PARAMS";
    ErrorNames["INVALID_OAUTH_CALLBACK_CODE"] = "INVALID_OAUTH_CALLBACK_CODE";
    ErrorNames["INVALID_OAUTH_CALLBACK_STATE"] = "INVALID_OAUTH_CALLBACK_STATE";
    ErrorNames["INVALID_OAUTH_RESPONSE"] = "INVALID_OAUTH_RESPONSE";
    ErrorNames["INVALID_PASSWORD_LENGTH"] = "INVALID_PASSWORD_LENGTH";
    ErrorNames["INVALID_RUNTIME_CONFIG_TYPE"] = "INVALID_RUNTIME_CONFIG_TYPE";
    ErrorNames["INVALID_SEARCH_PROVIDER_REQUEST"] = "INVALID_SEARCH_PROVIDER_REQUEST";
    ErrorNames["INVALID_SUBSCRIPTION_PARAMETERS"] = "INVALID_SUBSCRIPTION_PARAMETERS";
    ErrorNames["LICENSE_EXPIRED"] = "LICENSE_EXPIRED";
    ErrorNames["LICENSE_NOT_FOUND"] = "LICENSE_NOT_FOUND";
    ErrorNames["LICENSE_REVEALED"] = "LICENSE_REVEALED";
    ErrorNames["LINK_EXPIRED"] = "LINK_EXPIRED";
    ErrorNames["MAILER_SERVICE_IS_NOT_CONFIGURED"] = "MAILER_SERVICE_IS_NOT_CONFIGURED";
    ErrorNames["MANAGED_BY_APP_STORE_OR_PLAY"] = "MANAGED_BY_APP_STORE_OR_PLAY";
    ErrorNames["MEMBER_NOT_FOUND_IN_SPACE"] = "MEMBER_NOT_FOUND_IN_SPACE";
    ErrorNames["MEMBER_QUOTA_EXCEEDED"] = "MEMBER_QUOTA_EXCEEDED";
    ErrorNames["MENTION_USER_DOC_ACCESS_DENIED"] = "MENTION_USER_DOC_ACCESS_DENIED";
    ErrorNames["MENTION_USER_ONESELF_DENIED"] = "MENTION_USER_ONESELF_DENIED";
    ErrorNames["MISSING_OAUTH_QUERY_PARAMETER"] = "MISSING_OAUTH_QUERY_PARAMETER";
    ErrorNames["NETWORK_ERROR"] = "NETWORK_ERROR";
    ErrorNames["NEW_OWNER_IS_NOT_ACTIVE_MEMBER"] = "NEW_OWNER_IS_NOT_ACTIVE_MEMBER";
    ErrorNames["NOTIFICATION_NOT_FOUND"] = "NOTIFICATION_NOT_FOUND";
    ErrorNames["NOT_FOUND"] = "NOT_FOUND";
    ErrorNames["NOT_IN_SPACE"] = "NOT_IN_SPACE";
    ErrorNames["NO_COPILOT_PROVIDER_AVAILABLE"] = "NO_COPILOT_PROVIDER_AVAILABLE";
    ErrorNames["NO_MORE_SEAT"] = "NO_MORE_SEAT";
    ErrorNames["OAUTH_ACCOUNT_ALREADY_CONNECTED"] = "OAUTH_ACCOUNT_ALREADY_CONNECTED";
    ErrorNames["OAUTH_STATE_EXPIRED"] = "OAUTH_STATE_EXPIRED";
    ErrorNames["OWNER_CAN_NOT_LEAVE_WORKSPACE"] = "OWNER_CAN_NOT_LEAVE_WORKSPACE";
    ErrorNames["PASSWORD_REQUIRED"] = "PASSWORD_REQUIRED";
    ErrorNames["QUERY_TOO_LONG"] = "QUERY_TOO_LONG";
    ErrorNames["REPLY_NOT_FOUND"] = "REPLY_NOT_FOUND";
    ErrorNames["RUNTIME_CONFIG_NOT_FOUND"] = "RUNTIME_CONFIG_NOT_FOUND";
    ErrorNames["SAME_EMAIL_PROVIDED"] = "SAME_EMAIL_PROVIDED";
    ErrorNames["SAME_SUBSCRIPTION_RECURRING"] = "SAME_SUBSCRIPTION_RECURRING";
    ErrorNames["SEARCH_PROVIDER_NOT_FOUND"] = "SEARCH_PROVIDER_NOT_FOUND";
    ErrorNames["SIGN_UP_FORBIDDEN"] = "SIGN_UP_FORBIDDEN";
    ErrorNames["SPACE_ACCESS_DENIED"] = "SPACE_ACCESS_DENIED";
    ErrorNames["SPACE_NOT_FOUND"] = "SPACE_NOT_FOUND";
    ErrorNames["SPACE_OWNER_NOT_FOUND"] = "SPACE_OWNER_NOT_FOUND";
    ErrorNames["SPACE_SHOULD_HAVE_ONLY_ONE_OWNER"] = "SPACE_SHOULD_HAVE_ONLY_ONE_OWNER";
    ErrorNames["STORAGE_QUOTA_EXCEEDED"] = "STORAGE_QUOTA_EXCEEDED";
    ErrorNames["SUBSCRIPTION_ALREADY_EXISTS"] = "SUBSCRIPTION_ALREADY_EXISTS";
    ErrorNames["SUBSCRIPTION_EXPIRED"] = "SUBSCRIPTION_EXPIRED";
    ErrorNames["SUBSCRIPTION_HAS_BEEN_CANCELED"] = "SUBSCRIPTION_HAS_BEEN_CANCELED";
    ErrorNames["SUBSCRIPTION_HAS_NOT_BEEN_CANCELED"] = "SUBSCRIPTION_HAS_NOT_BEEN_CANCELED";
    ErrorNames["SUBSCRIPTION_NOT_EXISTS"] = "SUBSCRIPTION_NOT_EXISTS";
    ErrorNames["SUBSCRIPTION_PLAN_NOT_FOUND"] = "SUBSCRIPTION_PLAN_NOT_FOUND";
    ErrorNames["TOO_MANY_REQUEST"] = "TOO_MANY_REQUEST";
    ErrorNames["UNKNOWN_OAUTH_PROVIDER"] = "UNKNOWN_OAUTH_PROVIDER";
    ErrorNames["UNSPLASH_IS_NOT_CONFIGURED"] = "UNSPLASH_IS_NOT_CONFIGURED";
    ErrorNames["UNSUPPORTED_CLIENT_VERSION"] = "UNSUPPORTED_CLIENT_VERSION";
    ErrorNames["UNSUPPORTED_SUBSCRIPTION_PLAN"] = "UNSUPPORTED_SUBSCRIPTION_PLAN";
    ErrorNames["USER_AVATAR_NOT_FOUND"] = "USER_AVATAR_NOT_FOUND";
    ErrorNames["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    ErrorNames["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorNames["VERSION_REJECTED"] = "VERSION_REJECTED";
    ErrorNames["WORKSPACE_ID_REQUIRED_FOR_TEAM_SUBSCRIPTION"] = "WORKSPACE_ID_REQUIRED_FOR_TEAM_SUBSCRIPTION";
    ErrorNames["WORKSPACE_ID_REQUIRED_TO_UPDATE_TEAM_SUBSCRIPTION"] = "WORKSPACE_ID_REQUIRED_TO_UPDATE_TEAM_SUBSCRIPTION";
    ErrorNames["WORKSPACE_LICENSE_ALREADY_EXISTS"] = "WORKSPACE_LICENSE_ALREADY_EXISTS";
    ErrorNames["WORKSPACE_PERMISSION_NOT_FOUND"] = "WORKSPACE_PERMISSION_NOT_FOUND";
    ErrorNames["WRONG_SIGN_IN_CREDENTIALS"] = "WRONG_SIGN_IN_CREDENTIALS";
    ErrorNames["WRONG_SIGN_IN_METHOD"] = "WRONG_SIGN_IN_METHOD";
})(ErrorNames || (ErrorNames = {}));
export var FeatureType;
(function (FeatureType) {
    FeatureType["AIEarlyAccess"] = "AIEarlyAccess";
    FeatureType["Admin"] = "Admin";
    FeatureType["EarlyAccess"] = "EarlyAccess";
    FeatureType["FreePlan"] = "FreePlan";
    FeatureType["LifetimeProPlan"] = "LifetimeProPlan";
    FeatureType["ProPlan"] = "ProPlan";
    FeatureType["TeamPlan"] = "TeamPlan";
    FeatureType["UnlimitedCopilot"] = "UnlimitedCopilot";
    FeatureType["UnlimitedWorkspace"] = "UnlimitedWorkspace";
})(FeatureType || (FeatureType = {}));
export var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["Draft"] = "Draft";
    InvoiceStatus["Open"] = "Open";
    InvoiceStatus["Paid"] = "Paid";
    InvoiceStatus["Uncollectible"] = "Uncollectible";
    InvoiceStatus["Void"] = "Void";
})(InvoiceStatus || (InvoiceStatus = {}));
/** Notification level */
export var NotificationLevel;
(function (NotificationLevel) {
    NotificationLevel["Default"] = "Default";
    NotificationLevel["High"] = "High";
    NotificationLevel["Low"] = "Low";
    NotificationLevel["Min"] = "Min";
    NotificationLevel["None"] = "None";
})(NotificationLevel || (NotificationLevel = {}));
/** Notification type */
export var NotificationType;
(function (NotificationType) {
    NotificationType["Comment"] = "Comment";
    NotificationType["CommentMention"] = "CommentMention";
    NotificationType["Invitation"] = "Invitation";
    NotificationType["InvitationAccepted"] = "InvitationAccepted";
    NotificationType["InvitationBlocked"] = "InvitationBlocked";
    NotificationType["InvitationRejected"] = "InvitationRejected";
    NotificationType["InvitationReviewApproved"] = "InvitationReviewApproved";
    NotificationType["InvitationReviewDeclined"] = "InvitationReviewDeclined";
    NotificationType["InvitationReviewRequest"] = "InvitationReviewRequest";
    NotificationType["Mention"] = "Mention";
})(NotificationType || (NotificationType = {}));
export var OAuthProviderType;
(function (OAuthProviderType) {
    OAuthProviderType["Apple"] = "Apple";
    OAuthProviderType["GitHub"] = "GitHub";
    OAuthProviderType["Google"] = "Google";
    OAuthProviderType["OIDC"] = "OIDC";
})(OAuthProviderType || (OAuthProviderType = {}));
/** User permission in workspace */
export var Permission;
(function (Permission) {
    Permission["Admin"] = "Admin";
    Permission["Collaborator"] = "Collaborator";
    Permission["External"] = "External";
    Permission["Owner"] = "Owner";
})(Permission || (Permission = {}));
/** The mode which the public doc default in */
export var PublicDocMode;
(function (PublicDocMode) {
    PublicDocMode["Edgeless"] = "Edgeless";
    PublicDocMode["Page"] = "Page";
})(PublicDocMode || (PublicDocMode = {}));
/** Search query occur */
export var SearchQueryOccur;
(function (SearchQueryOccur) {
    SearchQueryOccur["must"] = "must";
    SearchQueryOccur["must_not"] = "must_not";
    SearchQueryOccur["should"] = "should";
})(SearchQueryOccur || (SearchQueryOccur = {}));
/** Search query type */
export var SearchQueryType;
(function (SearchQueryType) {
    SearchQueryType["all"] = "all";
    SearchQueryType["boolean"] = "boolean";
    SearchQueryType["boost"] = "boost";
    SearchQueryType["exists"] = "exists";
    SearchQueryType["match"] = "match";
})(SearchQueryType || (SearchQueryType = {}));
/** Search table */
export var SearchTable;
(function (SearchTable) {
    SearchTable["block"] = "block";
    SearchTable["doc"] = "doc";
})(SearchTable || (SearchTable = {}));
export var ServerDeploymentType;
(function (ServerDeploymentType) {
    ServerDeploymentType["Affine"] = "Affine";
    ServerDeploymentType["Selfhosted"] = "Selfhosted";
})(ServerDeploymentType || (ServerDeploymentType = {}));
export var ServerFeature;
(function (ServerFeature) {
    ServerFeature["Captcha"] = "Captcha";
    ServerFeature["Comment"] = "Comment";
    ServerFeature["Copilot"] = "Copilot";
    ServerFeature["CopilotEmbedding"] = "CopilotEmbedding";
    ServerFeature["Indexer"] = "Indexer";
    ServerFeature["LocalWorkspace"] = "LocalWorkspace";
    ServerFeature["OAuth"] = "OAuth";
    ServerFeature["Payment"] = "Payment";
})(ServerFeature || (ServerFeature = {}));
export var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["AI"] = "AI";
    SubscriptionPlan["Enterprise"] = "Enterprise";
    SubscriptionPlan["Free"] = "Free";
    SubscriptionPlan["Pro"] = "Pro";
    SubscriptionPlan["SelfHosted"] = "SelfHosted";
    SubscriptionPlan["SelfHostedTeam"] = "SelfHostedTeam";
    SubscriptionPlan["Team"] = "Team";
})(SubscriptionPlan || (SubscriptionPlan = {}));
export var SubscriptionRecurring;
(function (SubscriptionRecurring) {
    SubscriptionRecurring["Lifetime"] = "Lifetime";
    SubscriptionRecurring["Monthly"] = "Monthly";
    SubscriptionRecurring["Yearly"] = "Yearly";
})(SubscriptionRecurring || (SubscriptionRecurring = {}));
export var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["Active"] = "Active";
    SubscriptionStatus["Canceled"] = "Canceled";
    SubscriptionStatus["Incomplete"] = "Incomplete";
    SubscriptionStatus["IncompleteExpired"] = "IncompleteExpired";
    SubscriptionStatus["PastDue"] = "PastDue";
    SubscriptionStatus["Paused"] = "Paused";
    SubscriptionStatus["Trialing"] = "Trialing";
    SubscriptionStatus["Unpaid"] = "Unpaid";
})(SubscriptionStatus || (SubscriptionStatus = {}));
export var SubscriptionVariant;
(function (SubscriptionVariant) {
    SubscriptionVariant["EA"] = "EA";
    SubscriptionVariant["Onetime"] = "Onetime";
})(SubscriptionVariant || (SubscriptionVariant = {}));
/** Workspace invite link expire time */
export var WorkspaceInviteLinkExpireTime;
(function (WorkspaceInviteLinkExpireTime) {
    WorkspaceInviteLinkExpireTime["OneDay"] = "OneDay";
    WorkspaceInviteLinkExpireTime["OneMonth"] = "OneMonth";
    WorkspaceInviteLinkExpireTime["OneWeek"] = "OneWeek";
    WorkspaceInviteLinkExpireTime["ThreeDays"] = "ThreeDays";
})(WorkspaceInviteLinkExpireTime || (WorkspaceInviteLinkExpireTime = {}));
/** Member invite status in workspace */
export var WorkspaceMemberStatus;
(function (WorkspaceMemberStatus) {
    WorkspaceMemberStatus["Accepted"] = "Accepted";
    WorkspaceMemberStatus["AllocatingSeat"] = "AllocatingSeat";
    WorkspaceMemberStatus["NeedMoreSeat"] = "NeedMoreSeat";
    WorkspaceMemberStatus["NeedMoreSeatAndReview"] = "NeedMoreSeatAndReview";
    WorkspaceMemberStatus["Pending"] = "Pending";
    WorkspaceMemberStatus["UnderReview"] = "UnderReview";
})(WorkspaceMemberStatus || (WorkspaceMemberStatus = {}));
//# sourceMappingURL=schema.js.map