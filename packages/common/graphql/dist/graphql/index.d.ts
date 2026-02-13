export interface GraphQLQuery {
    id: string;
    op: string;
    query: string;
    file?: boolean;
    deprecations?: string[];
}
export declare const copilotChatMessageFragment = "fragment CopilotChatMessage on ChatMessage {\n  id\n  role\n  content\n  attachments\n  streamObjects {\n    type\n    textDelta\n    toolCallId\n    toolName\n    args\n    result\n  }\n  createdAt\n}";
export declare const copilotChatHistoryFragment = "fragment CopilotChatHistory on CopilotHistories {\n  sessionId\n  workspaceId\n  docId\n  parentSessionId\n  promptName\n  model\n  optionalModels\n  action\n  pinned\n  title\n  tokens\n  messages {\n    ...CopilotChatMessage\n  }\n  createdAt\n  updatedAt\n}";
export declare const paginatedCopilotChatsFragment = "fragment PaginatedCopilotChats on PaginatedCopilotHistoriesType {\n  pageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n  edges {\n    cursor\n    node {\n      ...CopilotChatHistory\n    }\n  }\n}";
export declare const credentialsRequirementsFragment = "fragment CredentialsRequirements on CredentialsRequirementType {\n  password {\n    ...PasswordLimits\n  }\n}";
export declare const passwordLimitsFragment = "fragment PasswordLimits on PasswordLimitsType {\n  minLength\n  maxLength\n}";
export declare const licenseBodyFragment = "fragment licenseBody on License {\n  expiredAt\n  installedAt\n  quantity\n  recurring\n  validatedAt\n  variant\n}";
export declare const generateUserAccessTokenMutation: {
    id: "generateUserAccessTokenMutation";
    op: string;
    query: string;
};
export declare const listUserAccessTokensQuery: {
    id: "listUserAccessTokensQuery";
    op: string;
    query: string;
};
export declare const revokeUserAccessTokenMutation: {
    id: "revokeUserAccessTokenMutation";
    op: string;
    query: string;
};
export declare const adminServerConfigQuery: {
    id: "adminServerConfigQuery";
    op: string;
    query: string;
};
export declare const createChangePasswordUrlMutation: {
    id: "createChangePasswordUrlMutation";
    op: string;
    query: string;
};
export declare const appConfigQuery: {
    id: "appConfigQuery";
    op: string;
    query: string;
};
export declare const getPromptsQuery: {
    id: "getPromptsQuery";
    op: string;
    query: string;
};
export declare const updatePromptMutation: {
    id: "updatePromptMutation";
    op: string;
    query: string;
};
export declare const createUserMutation: {
    id: "createUserMutation";
    op: string;
    query: string;
};
export declare const deleteUserMutation: {
    id: "deleteUserMutation";
    op: string;
    query: string;
};
export declare const disableUserMutation: {
    id: "disableUserMutation";
    op: string;
    query: string;
};
export declare const enableUserMutation: {
    id: "enableUserMutation";
    op: string;
    query: string;
};
export declare const getUserByEmailQuery: {
    id: "getUserByEmailQuery";
    op: string;
    query: string;
};
export declare const importUsersMutation: {
    id: "importUsersMutation";
    op: string;
    query: string;
};
export declare const listUsersQuery: {
    id: "listUsersQuery";
    op: string;
    query: string;
};
export declare const sendTestEmailMutation: {
    id: "sendTestEmailMutation";
    op: string;
    query: string;
};
export declare const updateAccountFeaturesMutation: {
    id: "updateAccountFeaturesMutation";
    op: string;
    query: string;
};
export declare const updateAccountMutation: {
    id: "updateAccountMutation";
    op: string;
    query: string;
};
export declare const updateAppConfigMutation: {
    id: "updateAppConfigMutation";
    op: string;
    query: string;
};
export declare const validateConfigMutation: {
    id: "validateConfigMutation";
    op: string;
    query: string;
};
export declare const deleteBlobMutation: {
    id: "deleteBlobMutation";
    op: string;
    query: string;
};
export declare const listBlobsQuery: {
    id: "listBlobsQuery";
    op: string;
    query: string;
};
export declare const releaseDeletedBlobsMutation: {
    id: "releaseDeletedBlobsMutation";
    op: string;
    query: string;
};
export declare const setBlobMutation: {
    id: "setBlobMutation";
    op: string;
    query: string;
    file: boolean;
};
export declare const cancelSubscriptionMutation: {
    id: "cancelSubscriptionMutation";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const changeEmailMutation: {
    id: "changeEmailMutation";
    op: string;
    query: string;
};
export declare const changePasswordMutation: {
    id: "changePasswordMutation";
    op: string;
    query: string;
};
export declare const listCommentChangesQuery: {
    id: "listCommentChangesQuery";
    op: string;
    query: string;
};
export declare const createCommentMutation: {
    id: "createCommentMutation";
    op: string;
    query: string;
};
export declare const deleteCommentMutation: {
    id: "deleteCommentMutation";
    op: string;
    query: string;
};
export declare const listCommentsQuery: {
    id: "listCommentsQuery";
    op: string;
    query: string;
};
export declare const createReplyMutation: {
    id: "createReplyMutation";
    op: string;
    query: string;
};
export declare const deleteReplyMutation: {
    id: "deleteReplyMutation";
    op: string;
    query: string;
};
export declare const updateReplyMutation: {
    id: "updateReplyMutation";
    op: string;
    query: string;
};
export declare const resolveCommentMutation: {
    id: "resolveCommentMutation";
    op: string;
    query: string;
};
export declare const updateCommentMutation: {
    id: "updateCommentMutation";
    op: string;
    query: string;
};
export declare const uploadCommentAttachmentMutation: {
    id: "uploadCommentAttachmentMutation";
    op: string;
    query: string;
    file: boolean;
};
export declare const applyDocUpdatesQuery: {
    id: "applyDocUpdatesQuery";
    op: string;
    query: string;
};
export declare const addContextBlobMutation: {
    id: "addContextBlobMutation";
    op: string;
    query: string;
};
export declare const removeContextBlobMutation: {
    id: "removeContextBlobMutation";
    op: string;
    query: string;
};
export declare const addContextCategoryMutation: {
    id: "addContextCategoryMutation";
    op: string;
    query: string;
};
export declare const removeContextCategoryMutation: {
    id: "removeContextCategoryMutation";
    op: string;
    query: string;
};
export declare const createCopilotContextMutation: {
    id: "createCopilotContextMutation";
    op: string;
    query: string;
};
export declare const addContextDocMutation: {
    id: "addContextDocMutation";
    op: string;
    query: string;
};
export declare const removeContextDocMutation: {
    id: "removeContextDocMutation";
    op: string;
    query: string;
};
export declare const addContextFileMutation: {
    id: "addContextFileMutation";
    op: string;
    query: string;
    file: boolean;
};
export declare const removeContextFileMutation: {
    id: "removeContextFileMutation";
    op: string;
    query: string;
};
export declare const listContextObjectQuery: {
    id: "listContextObjectQuery";
    op: string;
    query: string;
};
export declare const listContextQuery: {
    id: "listContextQuery";
    op: string;
    query: string;
};
export declare const matchContextQuery: {
    id: "matchContextQuery";
    op: string;
    query: string;
};
export declare const matchWorkspaceDocsQuery: {
    id: "matchWorkspaceDocsQuery";
    op: string;
    query: string;
};
export declare const matchFilesQuery: {
    id: "matchFilesQuery";
    op: string;
    query: string;
};
export declare const getWorkspaceEmbeddingStatusQuery: {
    id: "getWorkspaceEmbeddingStatusQuery";
    op: string;
    query: string;
};
export declare const queueWorkspaceEmbeddingMutation: {
    id: "queueWorkspaceEmbeddingMutation";
    op: string;
    query: string;
};
export declare const getCopilotHistoryIdsQuery: {
    id: "getCopilotHistoryIdsQuery";
    op: string;
    query: string;
};
export declare const getCopilotDocSessionsQuery: {
    id: "getCopilotDocSessionsQuery";
    op: string;
    query: string;
};
export declare const getCopilotPinnedSessionsQuery: {
    id: "getCopilotPinnedSessionsQuery";
    op: string;
    query: string;
};
export declare const getCopilotWorkspaceSessionsQuery: {
    id: "getCopilotWorkspaceSessionsQuery";
    op: string;
    query: string;
};
export declare const getCopilotHistoriesQuery: {
    id: "getCopilotHistoriesQuery";
    op: string;
    query: string;
};
export declare const submitAudioTranscriptionMutation: {
    id: "submitAudioTranscriptionMutation";
    op: string;
    query: string;
    file: boolean;
};
export declare const claimAudioTranscriptionMutation: {
    id: "claimAudioTranscriptionMutation";
    op: string;
    query: string;
};
export declare const getAudioTranscriptionQuery: {
    id: "getAudioTranscriptionQuery";
    op: string;
    query: string;
};
export declare const retryAudioTranscriptionMutation: {
    id: "retryAudioTranscriptionMutation";
    op: string;
    query: string;
};
export declare const createCopilotMessageMutation: {
    id: "createCopilotMessageMutation";
    op: string;
    query: string;
    file: boolean;
};
export declare const getPromptModelsQuery: {
    id: "getPromptModelsQuery";
    op: string;
    query: string;
};
export declare const copilotQuotaQuery: {
    id: "copilotQuotaQuery";
    op: string;
    query: string;
};
export declare const cleanupCopilotSessionMutation: {
    id: "cleanupCopilotSessionMutation";
    op: string;
    query: string;
};
export declare const createCopilotSessionMutation: {
    id: "createCopilotSessionMutation";
    op: string;
    query: string;
};
export declare const forkCopilotSessionMutation: {
    id: "forkCopilotSessionMutation";
    op: string;
    query: string;
};
export declare const getCopilotLatestDocSessionQuery: {
    id: "getCopilotLatestDocSessionQuery";
    op: string;
    query: string;
};
export declare const getCopilotSessionQuery: {
    id: "getCopilotSessionQuery";
    op: string;
    query: string;
};
export declare const getCopilotRecentSessionsQuery: {
    id: "getCopilotRecentSessionsQuery";
    op: string;
    query: string;
};
export declare const updateCopilotSessionMutation: {
    id: "updateCopilotSessionMutation";
    op: string;
    query: string;
};
export declare const getCopilotSessionsQuery: {
    id: "getCopilotSessionsQuery";
    op: string;
    query: string;
};
export declare const addWorkspaceEmbeddingFilesMutation: {
    id: "addWorkspaceEmbeddingFilesMutation";
    op: string;
    query: string;
    file: boolean;
};
export declare const getWorkspaceEmbeddingFilesQuery: {
    id: "getWorkspaceEmbeddingFilesQuery";
    op: string;
    query: string;
};
export declare const removeWorkspaceEmbeddingFilesMutation: {
    id: "removeWorkspaceEmbeddingFilesMutation";
    op: string;
    query: string;
};
export declare const addWorkspaceEmbeddingIgnoredDocsMutation: {
    id: "addWorkspaceEmbeddingIgnoredDocsMutation";
    op: string;
    query: string;
};
export declare const getAllWorkspaceEmbeddingIgnoredDocsQuery: {
    id: "getAllWorkspaceEmbeddingIgnoredDocsQuery";
    op: string;
    query: string;
};
export declare const getWorkspaceEmbeddingIgnoredDocsQuery: {
    id: "getWorkspaceEmbeddingIgnoredDocsQuery";
    op: string;
    query: string;
};
export declare const removeWorkspaceEmbeddingIgnoredDocsMutation: {
    id: "removeWorkspaceEmbeddingIgnoredDocsMutation";
    op: string;
    query: string;
};
export declare const createCheckoutSessionMutation: {
    id: "createCheckoutSessionMutation";
    op: string;
    query: string;
};
export declare const createCustomerPortalMutation: {
    id: "createCustomerPortalMutation";
    op: string;
    query: string;
};
export declare const createSelfhostCustomerPortalMutation: {
    id: "createSelfhostCustomerPortalMutation";
    op: string;
    query: string;
};
export declare const createWorkspaceMutation: {
    id: "createWorkspaceMutation";
    op: string;
    query: string;
};
export declare const deleteAccountMutation: {
    id: "deleteAccountMutation";
    op: string;
    query: string;
};
export declare const deleteWorkspaceMutation: {
    id: "deleteWorkspaceMutation";
    op: string;
    query: string;
};
export declare const getDocRolePermissionsQuery: {
    id: "getDocRolePermissionsQuery";
    op: string;
    query: string;
};
export declare const generateLicenseKeyMutation: {
    id: "generateLicenseKeyMutation";
    op: string;
    query: string;
};
export declare const getCurrentUserFeaturesQuery: {
    id: "getCurrentUserFeaturesQuery";
    op: string;
    query: string;
};
export declare const getCurrentUserQuery: {
    id: "getCurrentUserQuery";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const getDocCreatedByUpdatedByListQuery: {
    id: "getDocCreatedByUpdatedByListQuery";
    op: string;
    query: string;
};
export declare const getDocDefaultRoleQuery: {
    id: "getDocDefaultRoleQuery";
    op: string;
    query: string;
};
export declare const getDocSummaryQuery: {
    id: "getDocSummaryQuery";
    op: string;
    query: string;
};
export declare const getInviteInfoQuery: {
    id: "getInviteInfoQuery";
    op: string;
    query: string;
};
export declare const getMemberCountByWorkspaceIdQuery: {
    id: "getMemberCountByWorkspaceIdQuery";
    op: string;
    query: string;
};
export declare const getMembersByWorkspaceIdQuery: {
    id: "getMembersByWorkspaceIdQuery";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const oauthProvidersQuery: {
    id: "oauthProvidersQuery";
    op: string;
    query: string;
};
export declare const getPageGrantedUsersListQuery: {
    id: "getPageGrantedUsersListQuery";
    op: string;
    query: string;
};
export declare const getPublicUserByIdQuery: {
    id: "getPublicUserByIdQuery";
    op: string;
    query: string;
};
export declare const getRecentlyUpdatedDocsQuery: {
    id: "getRecentlyUpdatedDocsQuery";
    op: string;
    query: string;
};
export declare const getUserFeaturesQuery: {
    id: "getUserFeaturesQuery";
    op: string;
    query: string;
};
export declare const getUserSettingsQuery: {
    id: "getUserSettingsQuery";
    op: string;
    query: string;
};
export declare const getUserQuery: {
    id: "getUserQuery";
    op: string;
    query: string;
};
export declare const getWorkspaceInfoQuery: {
    id: "getWorkspaceInfoQuery";
    op: string;
    query: string;
};
export declare const getWorkspacePageByIdQuery: {
    id: "getWorkspacePageByIdQuery";
    op: string;
    query: string;
};
export declare const getWorkspacePageMetaByIdQuery: {
    id: "getWorkspacePageMetaByIdQuery";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const getWorkspacePublicByIdQuery: {
    id: "getWorkspacePublicByIdQuery";
    op: string;
    query: string;
};
export declare const getWorkspacePublicPagesQuery: {
    id: "getWorkspacePublicPagesQuery";
    op: string;
    query: string;
};
export declare const getWorkspaceSubscriptionQuery: {
    id: "getWorkspaceSubscriptionQuery";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const getWorkspaceQuery: {
    id: "getWorkspaceQuery";
    op: string;
    query: string;
};
export declare const getWorkspacesQuery: {
    id: "getWorkspacesQuery";
    op: string;
    query: string;
};
export declare const grantDocUserRolesMutation: {
    id: "grantDocUserRolesMutation";
    op: string;
    query: string;
};
export declare const listHistoryQuery: {
    id: "listHistoryQuery";
    op: string;
    query: string;
};
export declare const indexerAggregateQuery: {
    id: "indexerAggregateQuery";
    op: string;
    query: string;
};
export declare const indexerSearchDocsQuery: {
    id: "indexerSearchDocsQuery";
    op: string;
    query: string;
};
export declare const indexerSearchQuery: {
    id: "indexerSearchQuery";
    op: string;
    query: string;
};
export declare const getInvoicesCountQuery: {
    id: "getInvoicesCountQuery";
    op: string;
    query: string;
};
export declare const invoicesQuery: {
    id: "invoicesQuery";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const leaveWorkspaceMutation: {
    id: "leaveWorkspaceMutation";
    op: string;
    query: string;
};
export declare const activateLicenseMutation: {
    id: "activateLicenseMutation";
    op: string;
    query: string;
};
export declare const deactivateLicenseMutation: {
    id: "deactivateLicenseMutation";
    op: string;
    query: string;
};
export declare const getLicenseQuery: {
    id: "getLicenseQuery";
    op: string;
    query: string;
};
export declare const installLicenseMutation: {
    id: "installLicenseMutation";
    op: string;
    query: string;
    file: boolean;
};
export declare const listNotificationsQuery: {
    id: "listNotificationsQuery";
    op: string;
    query: string;
};
export declare const mentionUserMutation: {
    id: "mentionUserMutation";
    op: string;
    query: string;
};
export declare const notificationCountQuery: {
    id: "notificationCountQuery";
    op: string;
    query: string;
};
export declare const pricesQuery: {
    id: "pricesQuery";
    op: string;
    query: string;
};
export declare const publishPageMutation: {
    id: "publishPageMutation";
    op: string;
    query: string;
};
export declare const quotaQuery: {
    id: "quotaQuery";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const readAllNotificationsMutation: {
    id: "readAllNotificationsMutation";
    op: string;
    query: string;
};
export declare const readNotificationMutation: {
    id: "readNotificationMutation";
    op: string;
    query: string;
};
export declare const recoverDocMutation: {
    id: "recoverDocMutation";
    op: string;
    query: string;
};
export declare const removeAvatarMutation: {
    id: "removeAvatarMutation";
    op: string;
    query: string;
};
export declare const resumeSubscriptionMutation: {
    id: "resumeSubscriptionMutation";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const revokeDocUserRolesMutation: {
    id: "revokeDocUserRolesMutation";
    op: string;
    query: string;
};
export declare const revokeMemberPermissionMutation: {
    id: "revokeMemberPermissionMutation";
    op: string;
    query: string;
};
export declare const revokePublicPageMutation: {
    id: "revokePublicPageMutation";
    op: string;
    query: string;
};
export declare const sendChangeEmailMutation: {
    id: "sendChangeEmailMutation";
    op: string;
    query: string;
};
export declare const sendChangePasswordEmailMutation: {
    id: "sendChangePasswordEmailMutation";
    op: string;
    query: string;
};
export declare const sendSetPasswordEmailMutation: {
    id: "sendSetPasswordEmailMutation";
    op: string;
    query: string;
};
export declare const sendVerifyChangeEmailMutation: {
    id: "sendVerifyChangeEmailMutation";
    op: string;
    query: string;
};
export declare const sendVerifyEmailMutation: {
    id: "sendVerifyEmailMutation";
    op: string;
    query: string;
};
export declare const serverConfigQuery: {
    id: "serverConfigQuery";
    op: string;
    query: string;
};
export declare const setWorkspacePublicByIdMutation: {
    id: "setWorkspacePublicByIdMutation";
    op: string;
    query: string;
};
export declare const refreshSubscriptionMutation: {
    id: "refreshSubscriptionMutation";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const requestApplySubscriptionMutation: {
    id: "requestApplySubscriptionMutation";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const subscriptionQuery: {
    id: "subscriptionQuery";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const updateDocDefaultRoleMutation: {
    id: "updateDocDefaultRoleMutation";
    op: string;
    query: string;
};
export declare const updateDocUserRoleMutation: {
    id: "updateDocUserRoleMutation";
    op: string;
    query: string;
};
export declare const updateSubscriptionMutation: {
    id: "updateSubscriptionMutation";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const updateUserProfileMutation: {
    id: "updateUserProfileMutation";
    op: string;
    query: string;
};
export declare const updateUserSettingsMutation: {
    id: "updateUserSettingsMutation";
    op: string;
    query: string;
};
export declare const uploadAvatarMutation: {
    id: "uploadAvatarMutation";
    op: string;
    query: string;
    file: boolean;
};
export declare const verifyEmailMutation: {
    id: "verifyEmailMutation";
    op: string;
    query: string;
};
export declare const workspaceBlobQuotaQuery: {
    id: "workspaceBlobQuotaQuery";
    op: string;
    query: string;
};
export declare const getWorkspaceConfigQuery: {
    id: "getWorkspaceConfigQuery";
    op: string;
    query: string;
};
export declare const setEnableAiMutation: {
    id: "setEnableAiMutation";
    op: string;
    query: string;
};
export declare const setEnableDocEmbeddingMutation: {
    id: "setEnableDocEmbeddingMutation";
    op: string;
    query: string;
};
export declare const setEnableUrlPreviewMutation: {
    id: "setEnableUrlPreviewMutation";
    op: string;
    query: string;
};
export declare const inviteByEmailsMutation: {
    id: "inviteByEmailsMutation";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const acceptInviteByInviteIdMutation: {
    id: "acceptInviteByInviteIdMutation";
    op: string;
    query: string;
};
export declare const createInviteLinkMutation: {
    id: "createInviteLinkMutation";
    op: string;
    query: string;
};
export declare const revokeInviteLinkMutation: {
    id: "revokeInviteLinkMutation";
    op: string;
    query: string;
};
export declare const workspaceInvoicesQuery: {
    id: "workspaceInvoicesQuery";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const workspaceQuotaQuery: {
    id: "workspaceQuotaQuery";
    op: string;
    query: string;
};
export declare const getWorkspaceRolePermissionsQuery: {
    id: "getWorkspaceRolePermissionsQuery";
    op: string;
    query: string;
    deprecations: string[];
};
export declare const approveWorkspaceTeamMemberMutation: {
    id: "approveWorkspaceTeamMemberMutation";
    op: string;
    query: string;
};
export declare const grantWorkspaceTeamMemberMutation: {
    id: "grantWorkspaceTeamMemberMutation";
    op: string;
    query: string;
};
export declare const uploadCurriculumMutation: {
    id: "uploadCurriculumMutation";
    op: string;
    query: string;
    file: boolean;
};
//# sourceMappingURL=index.d.ts.map