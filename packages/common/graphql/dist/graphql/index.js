export const copilotChatMessageFragment = `fragment CopilotChatMessage on ChatMessage {
  id
  role
  content
  attachments
  streamObjects {
    type
    textDelta
    toolCallId
    toolName
    args
    result
  }
  createdAt
}`;
export const copilotChatHistoryFragment = `fragment CopilotChatHistory on CopilotHistories {
  sessionId
  workspaceId
  docId
  parentSessionId
  promptName
  model
  optionalModels
  action
  pinned
  title
  tokens
  messages {
    ...CopilotChatMessage
  }
  createdAt
  updatedAt
}`;
export const paginatedCopilotChatsFragment = `fragment PaginatedCopilotChats on PaginatedCopilotHistoriesType {
  pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
  edges {
    cursor
    node {
      ...CopilotChatHistory
    }
  }
}`;
export const credentialsRequirementsFragment = `fragment CredentialsRequirements on CredentialsRequirementType {
  password {
    ...PasswordLimits
  }
}`;
export const passwordLimitsFragment = `fragment PasswordLimits on PasswordLimitsType {
  minLength
  maxLength
}`;
export const licenseBodyFragment = `fragment licenseBody on License {
  expiredAt
  installedAt
  quantity
  recurring
  validatedAt
  variant
}`;
export const generateUserAccessTokenMutation = {
    id: 'generateUserAccessTokenMutation',
    op: 'generateUserAccessToken',
    query: `mutation generateUserAccessToken($input: GenerateAccessTokenInput!) {
  generateUserAccessToken(input: $input) {
    id
    name
    token
    createdAt
    expiresAt
  }
}`,
};
export const listUserAccessTokensQuery = {
    id: 'listUserAccessTokensQuery',
    op: 'listUserAccessTokens',
    query: `query listUserAccessTokens {
  revealedAccessTokens {
    id
    name
    createdAt
    expiresAt
    token
  }
}`,
};
export const revokeUserAccessTokenMutation = {
    id: 'revokeUserAccessTokenMutation',
    op: 'revokeUserAccessToken',
    query: `mutation revokeUserAccessToken($id: String!) {
  revokeUserAccessToken(id: $id)
}`,
};
export const adminServerConfigQuery = {
    id: 'adminServerConfigQuery',
    op: 'adminServerConfig',
    query: `query adminServerConfig {
  serverConfig {
    version
    baseUrl
    name
    features
    type
    initialized
    credentialsRequirement {
      ...CredentialsRequirements
    }
    availableUpgrade {
      changelog
      version
      publishedAt
      url
    }
    availableUserFeatures
  }
}
${passwordLimitsFragment}
${credentialsRequirementsFragment}`,
};
export const createChangePasswordUrlMutation = {
    id: 'createChangePasswordUrlMutation',
    op: 'createChangePasswordUrl',
    query: `mutation createChangePasswordUrl($callbackUrl: String!, $userId: String!) {
  createChangePasswordUrl(callbackUrl: $callbackUrl, userId: $userId)
}`,
};
export const appConfigQuery = {
    id: 'appConfigQuery',
    op: 'appConfig',
    query: `query appConfig {
  appConfig
}`,
};
export const getPromptsQuery = {
    id: 'getPromptsQuery',
    op: 'getPrompts',
    query: `query getPrompts {
  listCopilotPrompts {
    name
    model
    action
    config {
      frequencyPenalty
      presencePenalty
      temperature
      topP
    }
    messages {
      role
      content
      params
    }
  }
}`,
};
export const updatePromptMutation = {
    id: 'updatePromptMutation',
    op: 'updatePrompt',
    query: `mutation updatePrompt($name: String!, $messages: [CopilotPromptMessageInput!]!) {
  updateCopilotPrompt(name: $name, messages: $messages) {
    name
    model
    action
    config {
      frequencyPenalty
      presencePenalty
      temperature
      topP
    }
    messages {
      role
      content
      params
    }
  }
}`,
};
export const createUserMutation = {
    id: 'createUserMutation',
    op: 'createUser',
    query: `mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}`,
};
export const deleteUserMutation = {
    id: 'deleteUserMutation',
    op: 'deleteUser',
    query: `mutation deleteUser($id: String!) {
  deleteUser(id: $id) {
    success
  }
}`,
};
export const disableUserMutation = {
    id: 'disableUserMutation',
    op: 'disableUser',
    query: `mutation disableUser($id: String!) {
  banUser(id: $id) {
    email
    disabled
  }
}`,
};
export const enableUserMutation = {
    id: 'enableUserMutation',
    op: 'enableUser',
    query: `mutation enableUser($id: String!) {
  enableUser(id: $id) {
    email
    disabled
  }
}`,
};
export const getUserByEmailQuery = {
    id: 'getUserByEmailQuery',
    op: 'getUserByEmail',
    query: `query getUserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
    name
    email
    features
    hasPassword
    emailVerified
    avatarUrl
    disabled
  }
}`,
};
export const importUsersMutation = {
    id: 'importUsersMutation',
    op: 'ImportUsers',
    query: `mutation ImportUsers($input: ImportUsersInput!) {
  importUsers(input: $input) {
    __typename
    ... on UserType {
      id
      name
      email
    }
    ... on UserImportFailedType {
      email
      error
    }
  }
}`,
};
export const listUsersQuery = {
    id: 'listUsersQuery',
    op: 'listUsers',
    query: `query listUsers($filter: ListUserInput!) {
  users(filter: $filter) {
    id
    name
    email
    disabled
    features
    hasPassword
    emailVerified
    avatarUrl
  }
  usersCount
}`,
};
export const sendTestEmailMutation = {
    id: 'sendTestEmailMutation',
    op: 'sendTestEmail',
    query: `mutation sendTestEmail($host: String!, $port: Int!, $sender: String!, $username: String!, $password: String!, $ignoreTLS: Boolean!) {
  sendTestEmail(
    config: {host: $host, port: $port, sender: $sender, username: $username, password: $password, ignoreTLS: $ignoreTLS}
  )
}`,
};
export const updateAccountFeaturesMutation = {
    id: 'updateAccountFeaturesMutation',
    op: 'updateAccountFeatures',
    query: `mutation updateAccountFeatures($userId: String!, $features: [FeatureType!]!) {
  updateUserFeatures(id: $userId, features: $features)
}`,
};
export const updateAccountMutation = {
    id: 'updateAccountMutation',
    op: 'updateAccount',
    query: `mutation updateAccount($id: String!, $input: ManageUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
  }
}`,
};
export const updateAppConfigMutation = {
    id: 'updateAppConfigMutation',
    op: 'updateAppConfig',
    query: `mutation updateAppConfig($updates: [UpdateAppConfigInput!]!) {
  updateAppConfig(updates: $updates)
}`,
};
export const validateConfigMutation = {
    id: 'validateConfigMutation',
    op: 'validateConfig',
    query: `mutation validateConfig($updates: [UpdateAppConfigInput!]!) {
  validateAppConfig(updates: $updates) {
    module
    key
    value
    valid
    error
  }
}`,
};
export const deleteBlobMutation = {
    id: 'deleteBlobMutation',
    op: 'deleteBlob',
    query: `mutation deleteBlob($workspaceId: String!, $key: String!, $permanently: Boolean) {
  deleteBlob(workspaceId: $workspaceId, key: $key, permanently: $permanently)
}`,
};
export const listBlobsQuery = {
    id: 'listBlobsQuery',
    op: 'listBlobs',
    query: `query listBlobs($workspaceId: String!) {
  workspace(id: $workspaceId) {
    blobs {
      key
      size
      mime
      createdAt
    }
  }
}`,
};
export const releaseDeletedBlobsMutation = {
    id: 'releaseDeletedBlobsMutation',
    op: 'releaseDeletedBlobs',
    query: `mutation releaseDeletedBlobs($workspaceId: String!) {
  releaseDeletedBlobs(workspaceId: $workspaceId)
}`,
};
export const setBlobMutation = {
    id: 'setBlobMutation',
    op: 'setBlob',
    query: `mutation setBlob($workspaceId: String!, $blob: Upload!) {
  setBlob(workspaceId: $workspaceId, blob: $blob)
}`,
    file: true,
};
export const cancelSubscriptionMutation = {
    id: 'cancelSubscriptionMutation',
    op: 'cancelSubscription',
    query: `mutation cancelSubscription($plan: SubscriptionPlan = Pro, $workspaceId: String) {
  cancelSubscription(plan: $plan, workspaceId: $workspaceId) {
    id
    status
    nextBillAt
    canceledAt
  }
}`,
    deprecations: ["'id' is deprecated: removed"],
};
export const changeEmailMutation = {
    id: 'changeEmailMutation',
    op: 'changeEmail',
    query: `mutation changeEmail($token: String!, $email: String!) {
  changeEmail(token: $token, email: $email) {
    id
    email
  }
}`,
};
export const changePasswordMutation = {
    id: 'changePasswordMutation',
    op: 'changePassword',
    query: `mutation changePassword($token: String!, $userId: String!, $newPassword: String!) {
  changePassword(token: $token, userId: $userId, newPassword: $newPassword)
}`,
};
export const listCommentChangesQuery = {
    id: 'listCommentChangesQuery',
    op: 'listCommentChanges',
    query: `query listCommentChanges($workspaceId: String!, $docId: String!, $pagination: PaginationInput!) {
  workspace(id: $workspaceId) {
    commentChanges(docId: $docId, pagination: $pagination) {
      totalCount
      edges {
        cursor
        node {
          action
          id
          commentId
          item
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}`,
};
export const createCommentMutation = {
    id: 'createCommentMutation',
    op: 'createComment',
    query: `mutation createComment($input: CommentCreateInput!) {
  createComment(input: $input) {
    id
    content
    resolved
    createdAt
    updatedAt
    user {
      id
      name
      avatarUrl
    }
    replies {
      commentId
      id
      content
      createdAt
      updatedAt
      user {
        id
        name
        avatarUrl
      }
    }
  }
}`,
};
export const deleteCommentMutation = {
    id: 'deleteCommentMutation',
    op: 'deleteComment',
    query: `mutation deleteComment($id: String!) {
  deleteComment(id: $id)
}`,
};
export const listCommentsQuery = {
    id: 'listCommentsQuery',
    op: 'listComments',
    query: `query listComments($workspaceId: String!, $docId: String!, $pagination: PaginationInput) {
  workspace(id: $workspaceId) {
    comments(docId: $docId, pagination: $pagination) {
      totalCount
      edges {
        cursor
        node {
          id
          content
          resolved
          createdAt
          updatedAt
          user {
            id
            name
            avatarUrl
          }
          replies {
            commentId
            id
            content
            createdAt
            updatedAt
            user {
              id
              name
              avatarUrl
            }
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}`,
};
export const createReplyMutation = {
    id: 'createReplyMutation',
    op: 'createReply',
    query: `mutation createReply($input: ReplyCreateInput!) {
  createReply(input: $input) {
    commentId
    id
    content
    createdAt
    updatedAt
    user {
      id
      name
      avatarUrl
    }
  }
}`,
};
export const deleteReplyMutation = {
    id: 'deleteReplyMutation',
    op: 'deleteReply',
    query: `mutation deleteReply($id: String!) {
  deleteReply(id: $id)
}`,
};
export const updateReplyMutation = {
    id: 'updateReplyMutation',
    op: 'updateReply',
    query: `mutation updateReply($input: ReplyUpdateInput!) {
  updateReply(input: $input)
}`,
};
export const resolveCommentMutation = {
    id: 'resolveCommentMutation',
    op: 'resolveComment',
    query: `mutation resolveComment($input: CommentResolveInput!) {
  resolveComment(input: $input)
}`,
};
export const updateCommentMutation = {
    id: 'updateCommentMutation',
    op: 'updateComment',
    query: `mutation updateComment($input: CommentUpdateInput!) {
  updateComment(input: $input)
}`,
};
export const uploadCommentAttachmentMutation = {
    id: 'uploadCommentAttachmentMutation',
    op: 'uploadCommentAttachment',
    query: `mutation uploadCommentAttachment($workspaceId: String!, $docId: String!, $attachment: Upload!) {
  uploadCommentAttachment(
    workspaceId: $workspaceId
    docId: $docId
    attachment: $attachment
  )
}`,
    file: true,
};
export const applyDocUpdatesQuery = {
    id: 'applyDocUpdatesQuery',
    op: 'applyDocUpdates',
    query: `query applyDocUpdates($workspaceId: String!, $docId: String!, $op: String!, $updates: String!) {
  applyDocUpdates(
    workspaceId: $workspaceId
    docId: $docId
    op: $op
    updates: $updates
  )
}`,
};
export const addContextBlobMutation = {
    id: 'addContextBlobMutation',
    op: 'addContextBlob',
    query: `mutation addContextBlob($options: AddContextBlobInput!) {
  addContextBlob(options: $options) {
    id
    createdAt
    status
  }
}`,
};
export const removeContextBlobMutation = {
    id: 'removeContextBlobMutation',
    op: 'removeContextBlob',
    query: `mutation removeContextBlob($options: RemoveContextBlobInput!) {
  removeContextBlob(options: $options)
}`,
};
export const addContextCategoryMutation = {
    id: 'addContextCategoryMutation',
    op: 'addContextCategory',
    query: `mutation addContextCategory($options: AddContextCategoryInput!) {
  addContextCategory(options: $options) {
    id
    createdAt
    type
    docs {
      id
      createdAt
      status
    }
  }
}`,
};
export const removeContextCategoryMutation = {
    id: 'removeContextCategoryMutation',
    op: 'removeContextCategory',
    query: `mutation removeContextCategory($options: RemoveContextCategoryInput!) {
  removeContextCategory(options: $options)
}`,
};
export const createCopilotContextMutation = {
    id: 'createCopilotContextMutation',
    op: 'createCopilotContext',
    query: `mutation createCopilotContext($workspaceId: String!, $sessionId: String!) {
  createCopilotContext(workspaceId: $workspaceId, sessionId: $sessionId)
}`,
};
export const addContextDocMutation = {
    id: 'addContextDocMutation',
    op: 'addContextDoc',
    query: `mutation addContextDoc($options: AddContextDocInput!) {
  addContextDoc(options: $options) {
    id
    createdAt
    status
  }
}`,
};
export const removeContextDocMutation = {
    id: 'removeContextDocMutation',
    op: 'removeContextDoc',
    query: `mutation removeContextDoc($options: RemoveContextDocInput!) {
  removeContextDoc(options: $options)
}`,
};
export const addContextFileMutation = {
    id: 'addContextFileMutation',
    op: 'addContextFile',
    query: `mutation addContextFile($content: Upload!, $options: AddContextFileInput!) {
  addContextFile(content: $content, options: $options) {
    id
    createdAt
    name
    mimeType
    chunkSize
    error
    status
    blobId
  }
}`,
    file: true,
};
export const removeContextFileMutation = {
    id: 'removeContextFileMutation',
    op: 'removeContextFile',
    query: `mutation removeContextFile($options: RemoveContextFileInput!) {
  removeContextFile(options: $options)
}`,
};
export const listContextObjectQuery = {
    id: 'listContextObjectQuery',
    op: 'listContextObject',
    query: `query listContextObject($workspaceId: String!, $sessionId: String!, $contextId: String!) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      contexts(sessionId: $sessionId, contextId: $contextId) {
        blobs {
          id
          status
          createdAt
        }
        docs {
          id
          status
          createdAt
        }
        files {
          id
          name
          mimeType
          blobId
          chunkSize
          error
          status
          createdAt
        }
        tags {
          type
          id
          docs {
            id
            status
            createdAt
          }
          createdAt
        }
        collections {
          type
          id
          docs {
            id
            status
            createdAt
          }
          createdAt
        }
      }
    }
  }
}`,
};
export const listContextQuery = {
    id: 'listContextQuery',
    op: 'listContext',
    query: `query listContext($workspaceId: String!, $sessionId: String!) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      contexts(sessionId: $sessionId) {
        id
        workspaceId
      }
    }
  }
}`,
};
export const matchContextQuery = {
    id: 'matchContextQuery',
    op: 'matchContext',
    query: `query matchContext($contextId: String, $workspaceId: String, $content: String!, $limit: SafeInt, $scopedThreshold: Float, $threshold: Float) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      contexts(contextId: $contextId) {
        matchFiles(
          content: $content
          limit: $limit
          scopedThreshold: $scopedThreshold
          threshold: $threshold
        ) {
          fileId
          blobId
          name
          mimeType
          chunk
          content
          distance
        }
        matchWorkspaceDocs(
          content: $content
          limit: $limit
          scopedThreshold: $scopedThreshold
          threshold: $threshold
        ) {
          docId
          chunk
          content
          distance
        }
      }
    }
  }
}`,
};
export const matchWorkspaceDocsQuery = {
    id: 'matchWorkspaceDocsQuery',
    op: 'matchWorkspaceDocs',
    query: `query matchWorkspaceDocs($contextId: String, $workspaceId: String, $content: String!, $limit: SafeInt, $scopedThreshold: Float, $threshold: Float) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      contexts(contextId: $contextId) {
        matchWorkspaceDocs(
          content: $content
          limit: $limit
          scopedThreshold: $scopedThreshold
          threshold: $threshold
        ) {
          docId
          chunk
          content
          distance
        }
      }
    }
  }
}`,
};
export const matchFilesQuery = {
    id: 'matchFilesQuery',
    op: 'matchFiles',
    query: `query matchFiles($contextId: String, $workspaceId: String, $content: String!, $limit: SafeInt, $scopedThreshold: Float, $threshold: Float) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      contexts(contextId: $contextId) {
        matchFiles(
          content: $content
          limit: $limit
          scopedThreshold: $scopedThreshold
          threshold: $threshold
        ) {
          fileId
          blobId
          chunk
          content
          distance
        }
      }
    }
  }
}`,
};
export const getWorkspaceEmbeddingStatusQuery = {
    id: 'getWorkspaceEmbeddingStatusQuery',
    op: 'getWorkspaceEmbeddingStatus',
    query: `query getWorkspaceEmbeddingStatus($workspaceId: String!) {
  queryWorkspaceEmbeddingStatus(workspaceId: $workspaceId) {
    total
    embedded
  }
}`,
};
export const queueWorkspaceEmbeddingMutation = {
    id: 'queueWorkspaceEmbeddingMutation',
    op: 'queueWorkspaceEmbedding',
    query: `mutation queueWorkspaceEmbedding($workspaceId: String!, $docId: [String!]!) {
  queueWorkspaceEmbedding(workspaceId: $workspaceId, docId: $docId)
}`,
};
export const getCopilotHistoryIdsQuery = {
    id: 'getCopilotHistoryIdsQuery',
    op: 'getCopilotHistoryIds',
    query: `query getCopilotHistoryIds($workspaceId: String!, $pagination: PaginationInput!, $docId: String, $options: QueryChatHistoriesInput) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      chats(pagination: $pagination, docId: $docId, options: $options) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            sessionId
            pinned
            messages {
              id
              role
              createdAt
            }
          }
        }
      }
    }
  }
}`,
};
export const getCopilotDocSessionsQuery = {
    id: 'getCopilotDocSessionsQuery',
    op: 'getCopilotDocSessions',
    query: `query getCopilotDocSessions($workspaceId: String!, $docId: String!, $pagination: PaginationInput!, $options: QueryChatHistoriesInput) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      chats(pagination: $pagination, docId: $docId, options: $options) {
        ...PaginatedCopilotChats
      }
    }
  }
}
${copilotChatMessageFragment}
${copilotChatHistoryFragment}
${paginatedCopilotChatsFragment}`,
};
export const getCopilotPinnedSessionsQuery = {
    id: 'getCopilotPinnedSessionsQuery',
    op: 'getCopilotPinnedSessions',
    query: `query getCopilotPinnedSessions($workspaceId: String!, $docId: String, $messageOrder: ChatHistoryOrder, $withPrompt: Boolean) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      chats(
        pagination: {first: 1}
        docId: $docId
        options: {pinned: true, messageOrder: $messageOrder, withPrompt: $withPrompt}
      ) {
        ...PaginatedCopilotChats
      }
    }
  }
}
${copilotChatMessageFragment}
${copilotChatHistoryFragment}
${paginatedCopilotChatsFragment}`,
};
export const getCopilotWorkspaceSessionsQuery = {
    id: 'getCopilotWorkspaceSessionsQuery',
    op: 'getCopilotWorkspaceSessions',
    query: `query getCopilotWorkspaceSessions($workspaceId: String!, $pagination: PaginationInput!, $options: QueryChatHistoriesInput) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      chats(pagination: $pagination, docId: null, options: $options) {
        ...PaginatedCopilotChats
      }
    }
  }
}
${copilotChatMessageFragment}
${copilotChatHistoryFragment}
${paginatedCopilotChatsFragment}`,
};
export const getCopilotHistoriesQuery = {
    id: 'getCopilotHistoriesQuery',
    op: 'getCopilotHistories',
    query: `query getCopilotHistories($workspaceId: String!, $pagination: PaginationInput!, $docId: String, $options: QueryChatHistoriesInput) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      chats(pagination: $pagination, docId: $docId, options: $options) {
        ...PaginatedCopilotChats
      }
    }
  }
}
${copilotChatMessageFragment}
${copilotChatHistoryFragment}
${paginatedCopilotChatsFragment}`,
};
export const submitAudioTranscriptionMutation = {
    id: 'submitAudioTranscriptionMutation',
    op: 'submitAudioTranscription',
    query: `mutation submitAudioTranscription($workspaceId: String!, $blobId: String!, $blob: Upload, $blobs: [Upload!]) {
  submitAudioTranscription(
    blob: $blob
    blobs: $blobs
    blobId: $blobId
    workspaceId: $workspaceId
  ) {
    id
    status
  }
}`,
    file: true,
};
export const claimAudioTranscriptionMutation = {
    id: 'claimAudioTranscriptionMutation',
    op: 'claimAudioTranscription',
    query: `mutation claimAudioTranscription($jobId: String!) {
  claimAudioTranscription(jobId: $jobId) {
    id
    status
    title
    summary
    actions
    transcription {
      speaker
      start
      end
      transcription
    }
  }
}`,
};
export const getAudioTranscriptionQuery = {
    id: 'getAudioTranscriptionQuery',
    op: 'getAudioTranscription',
    query: `query getAudioTranscription($workspaceId: String!, $jobId: String, $blobId: String) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      audioTranscription(jobId: $jobId, blobId: $blobId) {
        id
        status
        title
        summary
        transcription {
          speaker
          start
          end
          transcription
        }
      }
    }
  }
}`,
};
export const retryAudioTranscriptionMutation = {
    id: 'retryAudioTranscriptionMutation',
    op: 'retryAudioTranscription',
    query: `mutation retryAudioTranscription($workspaceId: String!, $jobId: String!) {
  retryAudioTranscription(workspaceId: $workspaceId, jobId: $jobId) {
    id
    status
  }
}`,
};
export const createCopilotMessageMutation = {
    id: 'createCopilotMessageMutation',
    op: 'createCopilotMessage',
    query: `mutation createCopilotMessage($options: CreateChatMessageInput!) {
  createCopilotMessage(options: $options)
}`,
    file: true,
};
export const getPromptModelsQuery = {
    id: 'getPromptModelsQuery',
    op: 'getPromptModels',
    query: `query getPromptModels($promptName: String!) {
  currentUser {
    copilot {
      models(promptName: $promptName) {
        defaultModel
        optionalModels {
          id
          name
        }
        proModels {
          id
          name
        }
      }
    }
  }
}`,
};
export const copilotQuotaQuery = {
    id: 'copilotQuotaQuery',
    op: 'copilotQuota',
    query: `query copilotQuota {
  currentUser {
    copilot {
      quota {
        limit
        used
      }
    }
  }
}`,
};
export const cleanupCopilotSessionMutation = {
    id: 'cleanupCopilotSessionMutation',
    op: 'cleanupCopilotSession',
    query: `mutation cleanupCopilotSession($input: DeleteSessionInput!) {
  cleanupCopilotSession(options: $input)
}`,
};
export const createCopilotSessionMutation = {
    id: 'createCopilotSessionMutation',
    op: 'createCopilotSession',
    query: `mutation createCopilotSession($options: CreateChatSessionInput!) {
  createCopilotSession(options: $options)
}`,
};
export const forkCopilotSessionMutation = {
    id: 'forkCopilotSessionMutation',
    op: 'forkCopilotSession',
    query: `mutation forkCopilotSession($options: ForkChatSessionInput!) {
  forkCopilotSession(options: $options)
}`,
};
export const getCopilotLatestDocSessionQuery = {
    id: 'getCopilotLatestDocSessionQuery',
    op: 'getCopilotLatestDocSession',
    query: `query getCopilotLatestDocSession($workspaceId: String!, $docId: String!) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      chats(
        pagination: {first: 1}
        docId: $docId
        options: {sessionOrder: desc, action: false, fork: false, withMessages: true}
      ) {
        ...PaginatedCopilotChats
      }
    }
  }
}
${copilotChatMessageFragment}
${copilotChatHistoryFragment}
${paginatedCopilotChatsFragment}`,
};
export const getCopilotSessionQuery = {
    id: 'getCopilotSessionQuery',
    op: 'getCopilotSession',
    query: `query getCopilotSession($workspaceId: String!, $sessionId: String!) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      chats(pagination: {first: 1}, options: {sessionId: $sessionId}) {
        ...PaginatedCopilotChats
      }
    }
  }
}
${copilotChatMessageFragment}
${copilotChatHistoryFragment}
${paginatedCopilotChatsFragment}`,
};
export const getCopilotRecentSessionsQuery = {
    id: 'getCopilotRecentSessionsQuery',
    op: 'getCopilotRecentSessions',
    query: `query getCopilotRecentSessions($workspaceId: String!, $limit: Int = 10, $offset: Int = 0) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      chats(
        pagination: {first: $limit, offset: $offset}
        options: {action: false, fork: false, sessionOrder: desc, withMessages: false}
      ) {
        ...PaginatedCopilotChats
      }
    }
  }
}
${copilotChatMessageFragment}
${copilotChatHistoryFragment}
${paginatedCopilotChatsFragment}`,
};
export const updateCopilotSessionMutation = {
    id: 'updateCopilotSessionMutation',
    op: 'updateCopilotSession',
    query: `mutation updateCopilotSession($options: UpdateChatSessionInput!) {
  updateCopilotSession(options: $options)
}`,
};
export const getCopilotSessionsQuery = {
    id: 'getCopilotSessionsQuery',
    op: 'getCopilotSessions',
    query: `query getCopilotSessions($workspaceId: String!, $pagination: PaginationInput!, $docId: String, $options: QueryChatHistoriesInput) {
  currentUser {
    copilot(workspaceId: $workspaceId) {
      chats(pagination: $pagination, docId: $docId, options: $options) {
        ...PaginatedCopilotChats
      }
    }
  }
}
${copilotChatMessageFragment}
${copilotChatHistoryFragment}
${paginatedCopilotChatsFragment}`,
};
export const addWorkspaceEmbeddingFilesMutation = {
    id: 'addWorkspaceEmbeddingFilesMutation',
    op: 'addWorkspaceEmbeddingFiles',
    query: `mutation addWorkspaceEmbeddingFiles($workspaceId: String!, $blob: Upload!) {
  addWorkspaceEmbeddingFiles(workspaceId: $workspaceId, blob: $blob) {
    fileId
    fileName
    blobId
    mimeType
    size
    createdAt
  }
}`,
    file: true,
};
export const getWorkspaceEmbeddingFilesQuery = {
    id: 'getWorkspaceEmbeddingFilesQuery',
    op: 'getWorkspaceEmbeddingFiles',
    query: `query getWorkspaceEmbeddingFiles($workspaceId: String!, $pagination: PaginationInput!) {
  workspace(id: $workspaceId) {
    embedding {
      files(pagination: $pagination) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            fileId
            fileName
            blobId
            mimeType
            size
            createdAt
          }
        }
      }
    }
  }
}`,
};
export const removeWorkspaceEmbeddingFilesMutation = {
    id: 'removeWorkspaceEmbeddingFilesMutation',
    op: 'removeWorkspaceEmbeddingFiles',
    query: `mutation removeWorkspaceEmbeddingFiles($workspaceId: String!, $fileId: String!) {
  removeWorkspaceEmbeddingFiles(workspaceId: $workspaceId, fileId: $fileId)
}`,
};
export const addWorkspaceEmbeddingIgnoredDocsMutation = {
    id: 'addWorkspaceEmbeddingIgnoredDocsMutation',
    op: 'addWorkspaceEmbeddingIgnoredDocs',
    query: `mutation addWorkspaceEmbeddingIgnoredDocs($workspaceId: String!, $add: [String!]!) {
  updateWorkspaceEmbeddingIgnoredDocs(workspaceId: $workspaceId, add: $add)
}`,
};
export const getAllWorkspaceEmbeddingIgnoredDocsQuery = {
    id: 'getAllWorkspaceEmbeddingIgnoredDocsQuery',
    op: 'getAllWorkspaceEmbeddingIgnoredDocs',
    query: `query getAllWorkspaceEmbeddingIgnoredDocs($workspaceId: String!) {
  workspace(id: $workspaceId) {
    embedding {
      allIgnoredDocs {
        docId
        createdAt
      }
    }
  }
}`,
};
export const getWorkspaceEmbeddingIgnoredDocsQuery = {
    id: 'getWorkspaceEmbeddingIgnoredDocsQuery',
    op: 'getWorkspaceEmbeddingIgnoredDocs',
    query: `query getWorkspaceEmbeddingIgnoredDocs($workspaceId: String!, $pagination: PaginationInput!) {
  workspace(id: $workspaceId) {
    embedding {
      ignoredDocs(pagination: $pagination) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            docId
            createdAt
            docCreatedAt
            docUpdatedAt
            title
            createdBy
            createdByAvatar
            updatedBy
          }
        }
      }
    }
  }
}`,
};
export const removeWorkspaceEmbeddingIgnoredDocsMutation = {
    id: 'removeWorkspaceEmbeddingIgnoredDocsMutation',
    op: 'removeWorkspaceEmbeddingIgnoredDocs',
    query: `mutation removeWorkspaceEmbeddingIgnoredDocs($workspaceId: String!, $remove: [String!]!) {
  updateWorkspaceEmbeddingIgnoredDocs(workspaceId: $workspaceId, remove: $remove)
}`,
};
export const createCheckoutSessionMutation = {
    id: 'createCheckoutSessionMutation',
    op: 'createCheckoutSession',
    query: `mutation createCheckoutSession($input: CreateCheckoutSessionInput!) {
  createCheckoutSession(input: $input)
}`,
};
export const createCustomerPortalMutation = {
    id: 'createCustomerPortalMutation',
    op: 'createCustomerPortal',
    query: `mutation createCustomerPortal {
  createCustomerPortal
}`,
};
export const createSelfhostCustomerPortalMutation = {
    id: 'createSelfhostCustomerPortalMutation',
    op: 'createSelfhostCustomerPortal',
    query: `mutation createSelfhostCustomerPortal($workspaceId: String!) {
  createSelfhostWorkspaceCustomerPortal(workspaceId: $workspaceId)
}`,
};
export const createWorkspaceMutation = {
    id: 'createWorkspaceMutation',
    op: 'createWorkspace',
    query: `mutation createWorkspace {
  createWorkspace {
    id
    public
    createdAt
  }
}`,
};
export const deleteAccountMutation = {
    id: 'deleteAccountMutation',
    op: 'deleteAccount',
    query: `mutation deleteAccount {
  deleteAccount {
    success
  }
}`,
};
export const deleteWorkspaceMutation = {
    id: 'deleteWorkspaceMutation',
    op: 'deleteWorkspace',
    query: `mutation deleteWorkspace($id: String!) {
  deleteWorkspace(id: $id)
}`,
};
export const getDocRolePermissionsQuery = {
    id: 'getDocRolePermissionsQuery',
    op: 'getDocRolePermissions',
    query: `query getDocRolePermissions($workspaceId: String!, $docId: String!) {
  workspace(id: $workspaceId) {
    doc(docId: $docId) {
      permissions {
        Doc_Copy
        Doc_Delete
        Doc_Duplicate
        Doc_Properties_Read
        Doc_Properties_Update
        Doc_Publish
        Doc_Read
        Doc_Restore
        Doc_TransferOwner
        Doc_Trash
        Doc_Update
        Doc_Users_Manage
        Doc_Users_Read
        Doc_Comments_Create
        Doc_Comments_Delete
        Doc_Comments_Read
        Doc_Comments_Resolve
      }
    }
  }
}`,
};
export const generateLicenseKeyMutation = {
    id: 'generateLicenseKeyMutation',
    op: 'generateLicenseKey',
    query: `mutation generateLicenseKey($sessionId: String!) {
  generateLicenseKey(sessionId: $sessionId)
}`,
};
export const getCurrentUserFeaturesQuery = {
    id: 'getCurrentUserFeaturesQuery',
    op: 'getCurrentUserFeatures',
    query: `query getCurrentUserFeatures {
  currentUser {
    id
    name
    email
    emailVerified
    avatarUrl
    features
  }
}`,
};
export const getCurrentUserQuery = {
    id: 'getCurrentUserQuery',
    op: 'getCurrentUser',
    query: `query getCurrentUser {
  currentUser {
    id
    name
    email
    emailVerified
    avatarUrl
    token {
      sessionToken
    }
  }
}`,
    deprecations: ["'token' is deprecated: use [/api/auth/sign-in?native=true] instead"],
};
export const getDocCreatedByUpdatedByListQuery = {
    id: 'getDocCreatedByUpdatedByListQuery',
    op: 'getDocCreatedByUpdatedByList',
    query: `query getDocCreatedByUpdatedByList($workspaceId: String!, $pagination: PaginationInput!) {
  workspace(id: $workspaceId) {
    docs(pagination: $pagination) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          creatorId
          lastUpdaterId
        }
      }
    }
  }
}`,
};
export const getDocDefaultRoleQuery = {
    id: 'getDocDefaultRoleQuery',
    op: 'getDocDefaultRole',
    query: `query getDocDefaultRole($workspaceId: String!, $docId: String!) {
  workspace(id: $workspaceId) {
    doc(docId: $docId) {
      defaultRole
    }
  }
}`,
};
export const getDocSummaryQuery = {
    id: 'getDocSummaryQuery',
    op: 'getDocSummary',
    query: `query getDocSummary($workspaceId: String!, $docId: String!) {
  workspace(id: $workspaceId) {
    doc(docId: $docId) {
      summary
    }
  }
}`,
};
export const getInviteInfoQuery = {
    id: 'getInviteInfoQuery',
    op: 'getInviteInfo',
    query: `query getInviteInfo($inviteId: String!) {
  getInviteInfo(inviteId: $inviteId) {
    workspace {
      id
      name
      avatar
    }
    user {
      id
      name
      avatarUrl
    }
    status
    invitee {
      id
      name
      email
      avatarUrl
    }
  }
}`,
};
export const getMemberCountByWorkspaceIdQuery = {
    id: 'getMemberCountByWorkspaceIdQuery',
    op: 'getMemberCountByWorkspaceId',
    query: `query getMemberCountByWorkspaceId($workspaceId: String!) {
  workspace(id: $workspaceId) {
    memberCount
  }
}`,
};
export const getMembersByWorkspaceIdQuery = {
    id: 'getMembersByWorkspaceIdQuery',
    op: 'getMembersByWorkspaceId',
    query: `query getMembersByWorkspaceId($workspaceId: String!, $skip: Int, $take: Int, $query: String) {
  workspace(id: $workspaceId) {
    memberCount
    members(skip: $skip, take: $take, query: $query) {
      id
      name
      email
      avatarUrl
      permission
      inviteId
      emailVerified
      status
    }
  }
}`,
    deprecations: ["'permission' is deprecated: Use role instead"],
};
export const oauthProvidersQuery = {
    id: 'oauthProvidersQuery',
    op: 'oauthProviders',
    query: `query oauthProviders {
  serverConfig {
    oauthProviders
  }
}`,
};
export const getPageGrantedUsersListQuery = {
    id: 'getPageGrantedUsersListQuery',
    op: 'getPageGrantedUsersList',
    query: `query getPageGrantedUsersList($pagination: PaginationInput!, $docId: String!, $workspaceId: String!) {
  workspace(id: $workspaceId) {
    doc(docId: $docId) {
      grantedUsersList(pagination: $pagination) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            role
            user {
              id
              name
              email
              avatarUrl
            }
          }
        }
      }
    }
  }
}`,
};
export const getPublicUserByIdQuery = {
    id: 'getPublicUserByIdQuery',
    op: 'getPublicUserById',
    query: `query getPublicUserById($id: String!) {
  publicUserById(id: $id) {
    id
    avatarUrl
    name
  }
}`,
};
export const getRecentlyUpdatedDocsQuery = {
    id: 'getRecentlyUpdatedDocsQuery',
    op: 'getRecentlyUpdatedDocs',
    query: `query getRecentlyUpdatedDocs($workspaceId: String!, $pagination: PaginationInput!) {
  workspace(id: $workspaceId) {
    recentlyUpdatedDocs(pagination: $pagination) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          title
          createdAt
          updatedAt
          creatorId
          lastUpdaterId
        }
      }
    }
  }
}`,
};
export const getUserFeaturesQuery = {
    id: 'getUserFeaturesQuery',
    op: 'getUserFeatures',
    query: `query getUserFeatures {
  currentUser {
    id
    features
  }
}`,
};
export const getUserSettingsQuery = {
    id: 'getUserSettingsQuery',
    op: 'getUserSettings',
    query: `query getUserSettings {
  currentUser {
    settings {
      receiveInvitationEmail
      receiveMentionEmail
      receiveCommentEmail
    }
  }
}`,
};
export const getUserQuery = {
    id: 'getUserQuery',
    op: 'getUser',
    query: `query getUser($email: String!) {
  user(email: $email) {
    __typename
    ... on UserType {
      id
      name
      avatarUrl
      email
      hasPassword
    }
    ... on LimitedUserType {
      email
      hasPassword
    }
  }
}`,
};
export const getWorkspaceInfoQuery = {
    id: 'getWorkspaceInfoQuery',
    op: 'getWorkspaceInfo',
    query: `query getWorkspaceInfo($workspaceId: String!) {
  workspace(id: $workspaceId) {
    role
    team
  }
}`,
};
export const getWorkspacePageByIdQuery = {
    id: 'getWorkspacePageByIdQuery',
    op: 'getWorkspacePageById',
    query: `query getWorkspacePageById($workspaceId: String!, $pageId: String!) {
  workspace(id: $workspaceId) {
    doc(docId: $pageId) {
      id
      mode
      defaultRole
      public
      title
      summary
    }
  }
}`,
};
export const getWorkspacePageMetaByIdQuery = {
    id: 'getWorkspacePageMetaByIdQuery',
    op: 'getWorkspacePageMetaById',
    query: `query getWorkspacePageMetaById($id: String!, $pageId: String!) {
  workspace(id: $id) {
    pageMeta(pageId: $pageId) {
      createdAt
      updatedAt
      createdBy {
        name
        avatarUrl
      }
      updatedBy {
        name
        avatarUrl
      }
    }
  }
}`,
    deprecations: ["'pageMeta' is deprecated: use [WorkspaceType.doc] instead"],
};
export const getWorkspacePublicByIdQuery = {
    id: 'getWorkspacePublicByIdQuery',
    op: 'getWorkspacePublicById',
    query: `query getWorkspacePublicById($id: String!) {
  workspace(id: $id) {
    public
  }
}`,
};
export const getWorkspacePublicPagesQuery = {
    id: 'getWorkspacePublicPagesQuery',
    op: 'getWorkspacePublicPages',
    query: `query getWorkspacePublicPages($workspaceId: String!) {
  workspace(id: $workspaceId) {
    publicDocs {
      id
      mode
    }
  }
}`,
};
export const getWorkspaceSubscriptionQuery = {
    id: 'getWorkspaceSubscriptionQuery',
    op: 'getWorkspaceSubscription',
    query: `query getWorkspaceSubscription($workspaceId: String!) {
  workspace(id: $workspaceId) {
    subscription {
      id
      status
      plan
      recurring
      start
      end
      nextBillAt
      canceledAt
      variant
    }
  }
}`,
    deprecations: ["'id' is deprecated: removed"],
};
export const getWorkspaceQuery = {
    id: 'getWorkspaceQuery',
    op: 'getWorkspace',
    query: `query getWorkspace($id: String!) {
  workspace(id: $id) {
    id
  }
}`,
};
export const getWorkspacesQuery = {
    id: 'getWorkspacesQuery',
    op: 'getWorkspaces',
    query: `query getWorkspaces {
  workspaces {
    id
    initialized
    team
    owner {
      id
    }
  }
}`,
};
export const grantDocUserRolesMutation = {
    id: 'grantDocUserRolesMutation',
    op: 'grantDocUserRoles',
    query: `mutation grantDocUserRoles($input: GrantDocUserRolesInput!) {
  grantDocUserRoles(input: $input)
}`,
};
export const listHistoryQuery = {
    id: 'listHistoryQuery',
    op: 'listHistory',
    query: `query listHistory($workspaceId: String!, $pageDocId: String!, $take: Int, $before: DateTime) {
  workspace(id: $workspaceId) {
    histories(guid: $pageDocId, take: $take, before: $before) {
      id
      timestamp
      editor {
        name
        avatarUrl
      }
    }
  }
}`,
};
export const indexerAggregateQuery = {
    id: 'indexerAggregateQuery',
    op: 'indexerAggregate',
    query: `query indexerAggregate($id: String!, $input: AggregateInput!) {
  workspace(id: $id) {
    aggregate(input: $input) {
      buckets {
        key
        count
        hits {
          nodes {
            fields
            highlights
          }
        }
      }
      pagination {
        count
        hasMore
        nextCursor
      }
    }
  }
}`,
};
export const indexerSearchDocsQuery = {
    id: 'indexerSearchDocsQuery',
    op: 'indexerSearchDocs',
    query: `query indexerSearchDocs($id: String!, $input: SearchDocsInput!) {
  workspace(id: $id) {
    searchDocs(input: $input) {
      docId
      title
      blockId
      highlight
      createdAt
      updatedAt
      createdByUser {
        id
        name
        avatarUrl
      }
      updatedByUser {
        id
        name
        avatarUrl
      }
    }
  }
}`,
};
export const indexerSearchQuery = {
    id: 'indexerSearchQuery',
    op: 'indexerSearch',
    query: `query indexerSearch($id: String!, $input: SearchInput!) {
  workspace(id: $id) {
    search(input: $input) {
      nodes {
        fields
        highlights
      }
      pagination {
        count
        hasMore
        nextCursor
      }
    }
  }
}`,
};
export const getInvoicesCountQuery = {
    id: 'getInvoicesCountQuery',
    op: 'getInvoicesCount',
    query: `query getInvoicesCount {
  currentUser {
    invoiceCount
  }
}`,
};
export const invoicesQuery = {
    id: 'invoicesQuery',
    op: 'invoices',
    query: `query invoices($take: Int!, $skip: Int!) {
  currentUser {
    invoiceCount
    invoices(take: $take, skip: $skip) {
      id
      status
      currency
      amount
      reason
      lastPaymentError
      link
      createdAt
    }
  }
}`,
    deprecations: ["'id' is deprecated: removed"],
};
export const leaveWorkspaceMutation = {
    id: 'leaveWorkspaceMutation',
    op: 'leaveWorkspace',
    query: `mutation leaveWorkspace($workspaceId: String!, $sendLeaveMail: Boolean) {
  leaveWorkspace(workspaceId: $workspaceId, sendLeaveMail: $sendLeaveMail)
}`,
};
export const activateLicenseMutation = {
    id: 'activateLicenseMutation',
    op: 'activateLicense',
    query: `mutation activateLicense($workspaceId: String!, $license: String!) {
  activateLicense(workspaceId: $workspaceId, license: $license) {
    ...licenseBody
  }
}
${licenseBodyFragment}`,
};
export const deactivateLicenseMutation = {
    id: 'deactivateLicenseMutation',
    op: 'deactivateLicense',
    query: `mutation deactivateLicense($workspaceId: String!) {
  deactivateLicense(workspaceId: $workspaceId)
}`,
};
export const getLicenseQuery = {
    id: 'getLicenseQuery',
    op: 'getLicense',
    query: `query getLicense($workspaceId: String!) {
  workspace(id: $workspaceId) {
    license {
      ...licenseBody
    }
  }
}
${licenseBodyFragment}`,
};
export const installLicenseMutation = {
    id: 'installLicenseMutation',
    op: 'installLicense',
    query: `mutation installLicense($workspaceId: String!, $license: Upload!) {
  installLicense(workspaceId: $workspaceId, license: $license) {
    ...licenseBody
  }
}
${licenseBodyFragment}`,
    file: true,
};
export const listNotificationsQuery = {
    id: 'listNotificationsQuery',
    op: 'listNotifications',
    query: `query listNotifications($pagination: PaginationInput!) {
  currentUser {
    notifications(pagination: $pagination) {
      totalCount
      edges {
        cursor
        node {
          id
          type
          level
          read
          createdAt
          updatedAt
          body
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}`,
};
export const mentionUserMutation = {
    id: 'mentionUserMutation',
    op: 'mentionUser',
    query: `mutation mentionUser($input: MentionInput!) {
  mentionUser(input: $input)
}`,
};
export const notificationCountQuery = {
    id: 'notificationCountQuery',
    op: 'notificationCount',
    query: `query notificationCount {
  currentUser {
    notificationCount
  }
}`,
};
export const pricesQuery = {
    id: 'pricesQuery',
    op: 'prices',
    query: `query prices {
  prices {
    type
    plan
    currency
    amount
    yearlyAmount
    lifetimeAmount
  }
}`,
};
export const publishPageMutation = {
    id: 'publishPageMutation',
    op: 'publishPage',
    query: `mutation publishPage($workspaceId: String!, $pageId: String!, $mode: PublicDocMode = Page) {
  publishDoc(workspaceId: $workspaceId, docId: $pageId, mode: $mode) {
    id
    mode
  }
}`,
};
export const quotaQuery = {
    id: 'quotaQuery',
    op: 'quota',
    query: `query quota {
  currentUser {
    id
    quota {
      name
      blobLimit
      storageQuota
      historyPeriod
      memberLimit
      humanReadable {
        name
        blobLimit
        storageQuota
        historyPeriod
        memberLimit
      }
    }
    quotaUsage {
      storageQuota
    }
  }
}`,
    deprecations: ["'storageQuota' is deprecated: use `UserQuotaType['usedStorageQuota']` instead"],
};
export const readAllNotificationsMutation = {
    id: 'readAllNotificationsMutation',
    op: 'readAllNotifications',
    query: `mutation readAllNotifications {
  readAllNotifications
}`,
};
export const readNotificationMutation = {
    id: 'readNotificationMutation',
    op: 'readNotification',
    query: `mutation readNotification($id: String!) {
  readNotification(id: $id)
}`,
};
export const recoverDocMutation = {
    id: 'recoverDocMutation',
    op: 'recoverDoc',
    query: `mutation recoverDoc($workspaceId: String!, $docId: String!, $timestamp: DateTime!) {
  recoverDoc(workspaceId: $workspaceId, guid: $docId, timestamp: $timestamp)
}`,
};
export const removeAvatarMutation = {
    id: 'removeAvatarMutation',
    op: 'removeAvatar',
    query: `mutation removeAvatar {
  removeAvatar {
    success
  }
}`,
};
export const resumeSubscriptionMutation = {
    id: 'resumeSubscriptionMutation',
    op: 'resumeSubscription',
    query: `mutation resumeSubscription($plan: SubscriptionPlan = Pro, $workspaceId: String) {
  resumeSubscription(plan: $plan, workspaceId: $workspaceId) {
    id
    status
    nextBillAt
    start
    end
  }
}`,
    deprecations: ["'id' is deprecated: removed"],
};
export const revokeDocUserRolesMutation = {
    id: 'revokeDocUserRolesMutation',
    op: 'revokeDocUserRoles',
    query: `mutation revokeDocUserRoles($input: RevokeDocUserRoleInput!) {
  revokeDocUserRoles(input: $input)
}`,
};
export const revokeMemberPermissionMutation = {
    id: 'revokeMemberPermissionMutation',
    op: 'revokeMemberPermission',
    query: `mutation revokeMemberPermission($workspaceId: String!, $userId: String!) {
  revokeMember(workspaceId: $workspaceId, userId: $userId)
}`,
};
export const revokePublicPageMutation = {
    id: 'revokePublicPageMutation',
    op: 'revokePublicPage',
    query: `mutation revokePublicPage($workspaceId: String!, $pageId: String!) {
  revokePublicDoc(workspaceId: $workspaceId, docId: $pageId) {
    id
    mode
    public
  }
}`,
};
export const sendChangeEmailMutation = {
    id: 'sendChangeEmailMutation',
    op: 'sendChangeEmail',
    query: `mutation sendChangeEmail($callbackUrl: String!) {
  sendChangeEmail(callbackUrl: $callbackUrl)
}`,
};
export const sendChangePasswordEmailMutation = {
    id: 'sendChangePasswordEmailMutation',
    op: 'sendChangePasswordEmail',
    query: `mutation sendChangePasswordEmail($callbackUrl: String!) {
  sendChangePasswordEmail(callbackUrl: $callbackUrl)
}`,
};
export const sendSetPasswordEmailMutation = {
    id: 'sendSetPasswordEmailMutation',
    op: 'sendSetPasswordEmail',
    query: `mutation sendSetPasswordEmail($callbackUrl: String!) {
  sendSetPasswordEmail(callbackUrl: $callbackUrl)
}`,
};
export const sendVerifyChangeEmailMutation = {
    id: 'sendVerifyChangeEmailMutation',
    op: 'sendVerifyChangeEmail',
    query: `mutation sendVerifyChangeEmail($token: String!, $email: String!, $callbackUrl: String!) {
  sendVerifyChangeEmail(token: $token, email: $email, callbackUrl: $callbackUrl)
}`,
};
export const sendVerifyEmailMutation = {
    id: 'sendVerifyEmailMutation',
    op: 'sendVerifyEmail',
    query: `mutation sendVerifyEmail($callbackUrl: String!) {
  sendVerifyEmail(callbackUrl: $callbackUrl)
}`,
};
export const serverConfigQuery = {
    id: 'serverConfigQuery',
    op: 'serverConfig',
    query: `query serverConfig {
  serverConfig {
    version
    baseUrl
    name
    features
    type
    initialized
    credentialsRequirement {
      ...CredentialsRequirements
    }
  }
}
${passwordLimitsFragment}
${credentialsRequirementsFragment}`,
};
export const setWorkspacePublicByIdMutation = {
    id: 'setWorkspacePublicByIdMutation',
    op: 'setWorkspacePublicById',
    query: `mutation setWorkspacePublicById($id: ID!, $public: Boolean!) {
  updateWorkspace(input: {id: $id, public: $public}) {
    id
  }
}`,
};
export const refreshSubscriptionMutation = {
    id: 'refreshSubscriptionMutation',
    op: 'refreshSubscription',
    query: `mutation refreshSubscription {
  refreshUserSubscriptions {
    id
    status
    plan
    recurring
    start
    end
    nextBillAt
    canceledAt
    variant
  }
}`,
    deprecations: ["'id' is deprecated: removed"],
};
export const requestApplySubscriptionMutation = {
    id: 'requestApplySubscriptionMutation',
    op: 'requestApplySubscription',
    query: `mutation requestApplySubscription($transactionId: String!) {
  requestApplySubscription(transactionId: $transactionId) {
    id
    status
    plan
    recurring
    start
    end
    nextBillAt
    canceledAt
    variant
  }
}`,
    deprecations: ["'id' is deprecated: removed"],
};
export const subscriptionQuery = {
    id: 'subscriptionQuery',
    op: 'subscription',
    query: `query subscription {
  currentUser {
    id
    subscriptions {
      id
      status
      plan
      recurring
      start
      end
      nextBillAt
      canceledAt
      variant
    }
  }
}`,
    deprecations: ["'id' is deprecated: removed"],
};
export const updateDocDefaultRoleMutation = {
    id: 'updateDocDefaultRoleMutation',
    op: 'updateDocDefaultRole',
    query: `mutation updateDocDefaultRole($input: UpdateDocDefaultRoleInput!) {
  updateDocDefaultRole(input: $input)
}`,
};
export const updateDocUserRoleMutation = {
    id: 'updateDocUserRoleMutation',
    op: 'updateDocUserRole',
    query: `mutation updateDocUserRole($input: UpdateDocUserRoleInput!) {
  updateDocUserRole(input: $input)
}`,
};
export const updateSubscriptionMutation = {
    id: 'updateSubscriptionMutation',
    op: 'updateSubscription',
    query: `mutation updateSubscription($plan: SubscriptionPlan = Pro, $recurring: SubscriptionRecurring!, $workspaceId: String) {
  updateSubscriptionRecurring(
    plan: $plan
    recurring: $recurring
    workspaceId: $workspaceId
  ) {
    id
    plan
    recurring
    nextBillAt
  }
}`,
    deprecations: ["'id' is deprecated: removed"],
};
export const updateUserProfileMutation = {
    id: 'updateUserProfileMutation',
    op: 'updateUserProfile',
    query: `mutation updateUserProfile($input: UpdateUserInput!) {
  updateProfile(input: $input) {
    id
    name
  }
}`,
};
export const updateUserSettingsMutation = {
    id: 'updateUserSettingsMutation',
    op: 'updateUserSettings',
    query: `mutation updateUserSettings($input: UpdateUserSettingsInput!) {
  updateSettings(input: $input)
}`,
};
export const uploadAvatarMutation = {
    id: 'uploadAvatarMutation',
    op: 'uploadAvatar',
    query: `mutation uploadAvatar($avatar: Upload!) {
  uploadAvatar(avatar: $avatar) {
    id
    name
    avatarUrl
    email
  }
}`,
    file: true,
};
export const verifyEmailMutation = {
    id: 'verifyEmailMutation',
    op: 'verifyEmail',
    query: `mutation verifyEmail($token: String!) {
  verifyEmail(token: $token)
}`,
};
export const workspaceBlobQuotaQuery = {
    id: 'workspaceBlobQuotaQuery',
    op: 'workspaceBlobQuota',
    query: `query workspaceBlobQuota($id: String!) {
  workspace(id: $id) {
    quota {
      blobLimit
      humanReadable {
        blobLimit
      }
    }
  }
}`,
};
export const getWorkspaceConfigQuery = {
    id: 'getWorkspaceConfigQuery',
    op: 'getWorkspaceConfig',
    query: `query getWorkspaceConfig($id: String!) {
  workspace(id: $id) {
    enableAi
    enableUrlPreview
    enableDocEmbedding
    inviteLink {
      link
      expireTime
    }
  }
}`,
};
export const setEnableAiMutation = {
    id: 'setEnableAiMutation',
    op: 'setEnableAi',
    query: `mutation setEnableAi($id: ID!, $enableAi: Boolean!) {
  updateWorkspace(input: {id: $id, enableAi: $enableAi}) {
    id
  }
}`,
};
export const setEnableDocEmbeddingMutation = {
    id: 'setEnableDocEmbeddingMutation',
    op: 'setEnableDocEmbedding',
    query: `mutation setEnableDocEmbedding($id: ID!, $enableDocEmbedding: Boolean!) {
  updateWorkspace(input: {id: $id, enableDocEmbedding: $enableDocEmbedding}) {
    id
  }
}`,
};
export const setEnableUrlPreviewMutation = {
    id: 'setEnableUrlPreviewMutation',
    op: 'setEnableUrlPreview',
    query: `mutation setEnableUrlPreview($id: ID!, $enableUrlPreview: Boolean!) {
  updateWorkspace(input: {id: $id, enableUrlPreview: $enableUrlPreview}) {
    id
  }
}`,
};
export const inviteByEmailsMutation = {
    id: 'inviteByEmailsMutation',
    op: 'inviteByEmails',
    query: `mutation inviteByEmails($workspaceId: String!, $emails: [String!]!) {
  inviteMembers(workspaceId: $workspaceId, emails: $emails) {
    email
    inviteId
    sentSuccess
  }
}`,
    deprecations: ["'sentSuccess' is deprecated: Notification will be sent asynchronously"],
};
export const acceptInviteByInviteIdMutation = {
    id: 'acceptInviteByInviteIdMutation',
    op: 'acceptInviteByInviteId',
    query: `mutation acceptInviteByInviteId($workspaceId: String!, $inviteId: String!) {
  acceptInviteById(workspaceId: $workspaceId, inviteId: $inviteId)
}`,
};
export const createInviteLinkMutation = {
    id: 'createInviteLinkMutation',
    op: 'createInviteLink',
    query: `mutation createInviteLink($workspaceId: String!, $expireTime: WorkspaceInviteLinkExpireTime!) {
  createInviteLink(workspaceId: $workspaceId, expireTime: $expireTime) {
    link
    expireTime
  }
}`,
};
export const revokeInviteLinkMutation = {
    id: 'revokeInviteLinkMutation',
    op: 'revokeInviteLink',
    query: `mutation revokeInviteLink($workspaceId: String!) {
  revokeInviteLink(workspaceId: $workspaceId)
}`,
};
export const workspaceInvoicesQuery = {
    id: 'workspaceInvoicesQuery',
    op: 'workspaceInvoices',
    query: `query workspaceInvoices($take: Int!, $skip: Int!, $workspaceId: String!) {
  workspace(id: $workspaceId) {
    invoiceCount
    invoices(take: $take, skip: $skip) {
      id
      status
      currency
      amount
      reason
      lastPaymentError
      link
      createdAt
    }
  }
}`,
    deprecations: ["'id' is deprecated: removed"],
};
export const workspaceQuotaQuery = {
    id: 'workspaceQuotaQuery',
    op: 'workspaceQuota',
    query: `query workspaceQuota($id: String!) {
  workspace(id: $id) {
    quota {
      name
      blobLimit
      storageQuota
      usedStorageQuota
      historyPeriod
      memberLimit
      memberCount
      overcapacityMemberCount
      humanReadable {
        name
        blobLimit
        storageQuota
        historyPeriod
        memberLimit
        memberCount
        overcapacityMemberCount
      }
    }
  }
}`,
};
export const getWorkspaceRolePermissionsQuery = {
    id: 'getWorkspaceRolePermissionsQuery',
    op: 'getWorkspaceRolePermissions',
    query: `query getWorkspaceRolePermissions($id: String!) {
  workspaceRolePermissions(id: $id) {
    permissions {
      Workspace_Administrators_Manage
      Workspace_Blobs_List
      Workspace_Blobs_Read
      Workspace_Blobs_Write
      Workspace_Copilot
      Workspace_CreateDoc
      Workspace_Delete
      Workspace_Organize_Read
      Workspace_Payment_Manage
      Workspace_Properties_Create
      Workspace_Properties_Delete
      Workspace_Properties_Read
      Workspace_Properties_Update
      Workspace_Read
      Workspace_Settings_Read
      Workspace_Settings_Update
      Workspace_Sync
      Workspace_TransferOwner
      Workspace_Users_Manage
      Workspace_Users_Read
    }
  }
}`,
    deprecations: ["'workspaceRolePermissions' is deprecated: use WorkspaceType[permissions] instead"],
};
export const approveWorkspaceTeamMemberMutation = {
    id: 'approveWorkspaceTeamMemberMutation',
    op: 'approveWorkspaceTeamMember',
    query: `mutation approveWorkspaceTeamMember($workspaceId: String!, $userId: String!) {
  approveMember(workspaceId: $workspaceId, userId: $userId)
}`,
};
export const grantWorkspaceTeamMemberMutation = {
    id: 'grantWorkspaceTeamMemberMutation',
    op: 'grantWorkspaceTeamMember',
    query: `mutation grantWorkspaceTeamMember($workspaceId: String!, $userId: String!, $permission: Permission!) {
  grantMember(workspaceId: $workspaceId, userId: $userId, permission: $permission)
}`,
};
export const uploadCurriculumMutation = {
    id: 'uploadCurriculumMutation',
    op: 'uploadCurriculum',
    query: `mutation uploadCurriculum($workspaceId: String!, $curriculum: Upload!) {
  uploadCurriculum(workspaceId: $workspaceId, curriculum: $curriculum)
}`,
    file: true,
};
//# sourceMappingURL=index.js.map