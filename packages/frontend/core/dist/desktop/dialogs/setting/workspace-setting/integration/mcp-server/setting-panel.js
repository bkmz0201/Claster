import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, ErrorMessage, notify, Skeleton } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { AccessTokenService, ServerService } from '@affine/core/modules/cloud';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { UserFriendlyError } from '@affine/error';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect, useMemo, useState } from 'react';
import { IntegrationSettingHeader } from '../setting';
import MCPIcon from './MCP.inline.svg';
import * as styles from './setting-panel.css';
export const McpServerSettingPanel = () => {
    return _jsx(McpServerSetting, {});
};
const McpServerSettingHeader = ({ action }) => {
    const t = useI18n();
    return (_jsx(IntegrationSettingHeader, { icon: _jsx("img", { src: MCPIcon }), name: t['com.affine.integration.mcp-server.name'](), desc: t['com.affine.integration.mcp-server.desc'](), action: action }));
};
const McpServerSetting = () => {
    const workspaceService = useService(WorkspaceService);
    const serverService = useService(ServerService);
    const workspaceName = useLiveData(workspaceService.workspace.name$);
    const accessTokenService = useService(AccessTokenService);
    const accessTokens = useLiveData(accessTokenService.accessTokens$);
    const isRevalidating = useLiveData(accessTokenService.isRevalidating$);
    const error = useLiveData(accessTokenService.error$);
    const [mutating, setMutating] = useState(false);
    const t = useI18n();
    const mcpAccessToken = useMemo(() => {
        return accessTokens?.find(token => token.name === 'mcp');
    }, [accessTokens]);
    const code = useMemo(() => {
        return mcpAccessToken
            ? JSON.stringify({
                mcpServers: {
                    [`${workspaceName} - AFFiNE`]: {
                        type: 'streamable-http',
                        url: `${serverService.server.baseUrl}/api/workspaces/${workspaceService.workspace.id}/mcp`,
                        note: 'Read docs from AFFiNE workspace',
                        headers: {
                            Authorization: `Bearer ${mcpAccessToken.token}`,
                        },
                    },
                },
            }, null, 2)
            : null;
    }, [mcpAccessToken, workspaceName, workspaceService, serverService]);
    const showLoading = accessTokens === null && isRevalidating;
    const showError = accessTokens === null && error !== null;
    useEffect(() => {
        accessTokenService.revalidate();
    }, [accessTokenService]);
    const handleGenerateAccessToken = useAsyncCallback(async () => {
        setMutating(true);
        try {
            if (mcpAccessToken) {
                await accessTokenService.revokeUserAccessToken(mcpAccessToken.id);
            }
            await accessTokenService.generateUserAccessToken('mcp');
        }
        catch (err) {
            notify.error({
                error: UserFriendlyError.fromAny(err),
            });
        }
        finally {
            setMutating(false);
        }
    }, [accessTokenService, mcpAccessToken]);
    const handleRevokeAccessToken = useAsyncCallback(async () => {
        setMutating(true);
        try {
            if (mcpAccessToken) {
                await accessTokenService.revokeUserAccessToken(mcpAccessToken.id);
            }
        }
        catch (err) {
            notify.error({
                error: UserFriendlyError.fromAny(err),
            });
        }
        finally {
            setMutating(false);
        }
    }, [accessTokenService, mcpAccessToken]);
    if (showLoading) {
        return (_jsxs("div", { children: [_jsx(McpServerSettingHeader, {}), _jsx(Skeleton, {})] }));
    }
    if (showError) {
        return (_jsxs("div", { children: [_jsx(McpServerSettingHeader, {}), _jsx(ErrorMessage, { children: error })] }));
    }
    return (_jsxs("div", { children: [_jsx(McpServerSettingHeader, {}), _jsxs("div", { className: styles.section, children: [_jsxs("div", { className: styles.sectionHeader, children: [_jsx("div", { className: styles.sectionTitle, children: "Personal access token" }), !mcpAccessToken ? (_jsx(Button, { variant: "primary", onClick: handleGenerateAccessToken, disabled: mutating, children: "Create New" })) : (_jsx(Button, { variant: "error", onClick: handleRevokeAccessToken, disabled: mutating, children: "Delete" }))] }), _jsx("p", { className: styles.sectionDescription, children: "This access token is used for the MCP service, please keep this information secure. Deleting it will invalidate the access token." })] }), _jsxs("div", { className: styles.section, children: [_jsxs("div", { className: styles.sectionHeader, children: [_jsx("div", { className: styles.sectionTitle, children: "Server Config" }), _jsx(Button, { variant: "primary", onClick: () => {
                                    if (!code)
                                        return;
                                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                    navigator.clipboard.writeText(code);
                                    notify.success({
                                        title: t['Copied to clipboard'](),
                                    });
                                }, disabled: !code || mutating, children: "Copy json" })] }), code ? (_jsx("pre", { className: styles.preArea, children: code })) : (_jsx("p", { className: styles.sectionDescription, style: { textAlign: 'center' }, children: "No access token found, please generate one first." }))] }), _jsxs("div", { className: styles.section, children: [_jsx("div", { className: styles.sectionHeader, children: _jsx("div", { className: styles.sectionTitle, children: "Support tools" }) }), _jsx("br", {}), _jsxs("div", { className: styles.section, children: [_jsx("div", { className: styles.sectionHeader, children: _jsx("div", { className: styles.sectionTitle, children: "doc-read" }) }), _jsx("div", { className: styles.sectionDescription, children: "Return the complete text and basic metadata of a single document identified by docId; use this when the user needs the full content of a specific file rather than a search result." })] }), _jsxs("div", { className: styles.section, children: [_jsx("div", { className: styles.sectionHeader, children: _jsx("div", { className: styles.sectionTitle, children: "doc-semantic-search" }) }), _jsx("div", { className: styles.sectionDescription, children: "Retrieve conceptually related passages by performing vector-based semantic similarity search across embedded documents; use this tool only when exact keyword search fails or the user explicitly needs meaning-level matches (e.g., paraphrases, synonyms, broader concepts, recent documents)." })] }), _jsxs("div", { className: styles.section, children: [_jsx("div", { className: styles.sectionHeader, children: _jsx("div", { className: styles.sectionTitle, children: "doc-keyword-search" }) }), _jsx("div", { className: styles.sectionDescription, children: "Fuzzy search all workspace documents for the exact keyword or phrase supplied and return passages ranked by textual match. Use this tool by default whenever a straightforward term-based or keyword-base lookup is sufficient." })] })] })] }));
};
//# sourceMappingURL=setting-panel.js.map