import { showAILoginRequiredAtom } from '@affine/core/components/affine/auth/ai-login-required';
import { addContextBlobMutation, addContextCategoryMutation, addContextDocMutation, addContextFileMutation, applyDocUpdatesQuery, cleanupCopilotSessionMutation, createCopilotContextMutation, createCopilotMessageMutation, createCopilotSessionMutation, forkCopilotSessionMutation, getCopilotHistoriesQuery, getCopilotHistoryIdsQuery, getCopilotRecentSessionsQuery, getCopilotSessionQuery, getCopilotSessionsQuery, getWorkspaceEmbeddingStatusQuery, listContextObjectQuery, listContextQuery, matchContextQuery, removeContextBlobMutation, removeContextCategoryMutation, removeContextDocMutation, removeContextFileMutation, updateCopilotSessionMutation, } from '@affine/graphql';
import { getCurrentStore } from '@toeverything/infra';
import { GeneralNetworkError, PaymentRequiredError, UnauthorizedError, } from './error';
export var Endpoint;
(function (Endpoint) {
    Endpoint["Stream"] = "stream";
    Endpoint["StreamObject"] = "stream-object";
    Endpoint["Workflow"] = "workflow";
    Endpoint["Images"] = "images";
})(Endpoint || (Endpoint = {}));
function codeToError(error) {
    switch (error.status) {
        case 401:
            return new UnauthorizedError();
        case 402:
            return new PaymentRequiredError();
        default:
            return new GeneralNetworkError(error.code
                ? `${error.code}: ${error.message}\nIdentify: ${error.name}`
                : error.message);
    }
}
export function resolveError(err) {
    return codeToError(err);
}
export function handleError(src) {
    const err = resolveError(src);
    if (err instanceof UnauthorizedError) {
        getCurrentStore().set(showAILoginRequiredAtom, true);
    }
    return err;
}
export class CopilotClient {
    constructor(gql, fetcher, eventSource) {
        this.gql = gql;
        this.fetcher = fetcher;
        this.eventSource = eventSource;
    }
    async createSession(options) {
        try {
            const res = await this.gql({
                query: createCopilotSessionMutation,
                variables: {
                    options,
                },
            });
            return res.createCopilotSession;
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async updateSession(options) {
        try {
            const res = await this.gql({
                query: updateCopilotSessionMutation,
                variables: {
                    options,
                },
            });
            return res.updateCopilotSession;
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async forkSession(options) {
        try {
            const res = await this.gql({
                query: forkCopilotSessionMutation,
                variables: {
                    options,
                },
            });
            return res.forkCopilotSession;
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async createMessage(options) {
        try {
            const res = await this.gql({
                query: createCopilotMessageMutation,
                variables: {
                    options,
                },
            });
            return res.createCopilotMessage;
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async getSession(workspaceId, sessionId) {
        try {
            const res = await this.gql({
                query: getCopilotSessionQuery,
                variables: { sessionId, workspaceId },
            });
            return res.currentUser?.copilot?.chats?.edges?.[0]?.node;
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async getSessions(workspaceId, pagination, docId, options, signal) {
        try {
            const res = await this.gql({
                query: getCopilotSessionsQuery,
                variables: {
                    workspaceId,
                    pagination,
                    docId,
                    options,
                },
                signal,
            });
            return res.currentUser?.copilot?.chats.edges.map(e => e.node);
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async getRecentSessions(workspaceId, limit, offset) {
        try {
            const res = await this.gql({
                query: getCopilotRecentSessionsQuery,
                variables: {
                    workspaceId,
                    limit,
                    offset,
                },
            });
            return res.currentUser?.copilot?.chats.edges.map(e => e.node);
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async getHistories(workspaceId, pagination, docId, options) {
        try {
            const res = await this.gql({
                query: getCopilotHistoriesQuery,
                variables: {
                    workspaceId,
                    pagination,
                    docId,
                    options,
                },
            });
            return res.currentUser?.copilot?.chats.edges.map(e => e.node);
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async getHistoryIds(workspaceId, pagination, docId, options) {
        try {
            const res = await this.gql({
                query: getCopilotHistoryIdsQuery,
                variables: {
                    workspaceId,
                    pagination,
                    docId,
                    options,
                },
            });
            return res.currentUser?.copilot?.chats.edges.map(e => e.node);
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async cleanupSessions(input) {
        try {
            const res = await this.gql({
                query: cleanupCopilotSessionMutation,
                variables: {
                    input,
                },
            });
            return res.cleanupCopilotSession;
        }
        catch (err) {
            throw resolveError(err);
        }
    }
    async createContext(workspaceId, sessionId) {
        const res = await this.gql({
            query: createCopilotContextMutation,
            variables: {
                workspaceId,
                sessionId,
            },
        });
        return res.createCopilotContext;
    }
    async getContextId(workspaceId, sessionId) {
        const res = await this.gql({
            query: listContextQuery,
            variables: {
                workspaceId,
                sessionId,
            },
        });
        return res.currentUser?.copilot?.contexts?.[0]?.id || undefined;
    }
    async addContextDoc(options) {
        const res = await this.gql({
            query: addContextDocMutation,
            variables: {
                options,
            },
        });
        return res.addContextDoc;
    }
    async removeContextDoc(options) {
        const res = await this.gql({
            query: removeContextDocMutation,
            variables: {
                options,
            },
        });
        return res.removeContextDoc;
    }
    async addContextFile(content, options) {
        const res = await this.gql({
            query: addContextFileMutation,
            variables: {
                content,
                options,
            },
            timeout: 60000,
        });
        return res.addContextFile;
    }
    async removeContextFile(options) {
        const res = await this.gql({
            query: removeContextFileMutation,
            variables: {
                options,
            },
        });
        return res.removeContextFile;
    }
    async addContextCategory(options) {
        const res = await this.gql({
            query: addContextCategoryMutation,
            variables: {
                options,
            },
        });
        return res.addContextCategory;
    }
    async removeContextCategory(options) {
        const res = await this.gql({
            query: removeContextCategoryMutation,
            variables: {
                options,
            },
        });
        return res.removeContextCategory;
    }
    async getContextDocsAndFiles(workspaceId, sessionId, contextId) {
        const res = await this.gql({
            query: listContextObjectQuery,
            variables: {
                workspaceId,
                sessionId,
                contextId,
            },
        });
        return res.currentUser?.copilot?.contexts?.[0];
    }
    async matchContext(content, contextId, workspaceId, limit, scopedThreshold, threshold) {
        const res = await this.gql({
            query: matchContextQuery,
            variables: {
                content,
                contextId,
                workspaceId,
                limit,
                scopedThreshold,
                threshold,
            },
        });
        const { matchFiles: files, matchWorkspaceDocs: docs } = res.currentUser?.copilot?.contexts?.[0] || {};
        return { files, docs };
    }
    async chatText({ sessionId, messageId, reasoning, webSearch, modelId, toolsConfig, signal, }) {
        let url = `/api/copilot/chat/${sessionId}`;
        const queryString = this.paramsToQueryString({
            messageId,
            reasoning,
            webSearch,
            modelId,
            toolsConfig,
        });
        if (queryString) {
            url += `?${queryString}`;
        }
        const response = await this.fetcher(url.toString(), { signal });
        return response.text();
    }
    // Text or image to text
    chatTextStream({ sessionId, messageId, reasoning, webSearch, modelId, toolsConfig, }, endpoint = Endpoint.Stream) {
        let url = `/api/copilot/chat/${sessionId}/${endpoint}`;
        const queryString = this.paramsToQueryString({
            messageId,
            reasoning,
            webSearch,
            modelId,
            toolsConfig,
        });
        if (queryString) {
            url += `?${queryString}`;
        }
        return this.eventSource(url);
    }
    // Text or image to images
    imagesStream(sessionId, messageId, seed, endpoint = Endpoint.Images) {
        let url = `/api/copilot/chat/${sessionId}/${endpoint}`;
        const queryString = this.paramsToQueryString({
            messageId,
            seed,
        });
        if (queryString) {
            url += `?${queryString}`;
        }
        return this.eventSource(url);
    }
    paramsToQueryString(params) {
        const queryString = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (typeof value === 'boolean') {
                if (value) {
                    queryString.append(key, 'true');
                }
            }
            else if (typeof value === 'string') {
                queryString.append(key, value);
            }
            else if (typeof value === 'object' && value !== null) {
                queryString.append(key, JSON.stringify(value));
            }
        });
        return queryString.toString();
    }
    getEmbeddingStatus(workspaceId) {
        return this.gql({
            query: getWorkspaceEmbeddingStatusQuery,
            variables: { workspaceId },
        }).then(res => res.queryWorkspaceEmbeddingStatus);
    }
    applyDocUpdates(workspaceId, docId, op, updates) {
        return this.gql({
            query: applyDocUpdatesQuery,
            variables: {
                workspaceId,
                docId,
                op,
                updates,
            },
        }).then(res => res.applyDocUpdates);
    }
    addContextBlob(options) {
        return this.gql({
            query: addContextBlobMutation,
            variables: {
                options,
            },
        }).then(res => res.addContextBlob);
    }
    removeContextBlob(options) {
        return this.gql({
            query: removeContextBlobMutation,
            variables: {
                options,
            },
        }).then(res => res.removeContextBlob);
    }
}
//# sourceMappingURL=copilot-client.js.map