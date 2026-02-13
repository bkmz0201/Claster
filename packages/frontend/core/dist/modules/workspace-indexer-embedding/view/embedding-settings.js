import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, notify, Switch, Tooltip } from '@affine/component';
import { SettingHeader, SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { Upload } from '@affine/core/components/pure/file-upload';
import { EnableCloudPanel } from '@affine/core/desktop/dialogs/setting/workspace-setting/preference/enable-cloud';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { UserFriendlyError } from '@affine/error';
import { ServerFeature } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';
import { ServerService } from '../../cloud/services/server';
import { WorkspaceService } from '../../workspace/services/workspace';
import { COUNT_PER_PAGE } from '../constants';
import { EmbeddingService } from '../services/embedding';
import { Attachments } from './attachments';
import EmbeddingProgress from './embedding-progress';
import { IgnoredDocs } from './ignored-docs';
const EmbeddingLocal = () => {
    return _jsx(EnableCloudPanel, {});
};
const EmbeddingCloud = ({ disabled }) => {
    const t = useI18n();
    const embeddingService = useService(EmbeddingService);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const embeddingEnabled = useLiveData(embeddingService.embeddingEnabled.enabled$);
    const attachments = useLiveData(embeddingService.additionalAttachments.mergedAttachments$);
    const ignoredDocs = useLiveData(embeddingService.ignoredDocs.docs$);
    const embeddingProgress = useLiveData(embeddingService.embeddingProgress.progress$);
    const { totalCount } = useLiveData(embeddingService.additionalAttachments.attachments$);
    const isIgnoredDocsLoading = useLiveData(embeddingService.ignoredDocs.loading$);
    const isEnabledLoading = useLiveData(embeddingService.embeddingEnabled.loading$);
    const handleEmbeddingToggle = useCallback((checked) => {
        track.$.settingsPanel.indexerEmbedding.toggleWorkspaceEmbedding({
            type: 'Embedding',
            control: 'Workspace embedding',
            option: checked ? 'on' : 'off',
        });
        embeddingService.embeddingEnabled
            .setEnabled(checked)
            .then(() => {
            if (checked) {
                embeddingService.embeddingProgress.startEmbeddingProgressPolling();
            }
        })
            .catch(error => {
            const err = UserFriendlyError.fromAny(error);
            notify.error({
                title: t['com.affine.settings.workspace.indexer-embedding.embedding.switch.error'](),
                message: t[`error.${err.name}`](err.data),
            });
        });
    }, [embeddingService.embeddingEnabled, embeddingService.embeddingProgress, t]);
    const handleAttachmentUpload = useCallback((file) => {
        track.$.settingsPanel.indexerEmbedding.addAdditionalDocs({
            type: 'Embedding',
            control: 'Select doc',
            docType: file.type,
        });
        embeddingService.additionalAttachments.addAttachments([file]);
        // Restart polling to track progress of newly uploaded files
        embeddingService.embeddingProgress.startEmbeddingProgressPolling();
    }, [embeddingService.additionalAttachments, embeddingService.embeddingProgress]);
    const handleAttachmentsDelete = useCallback((fileId) => {
        embeddingService.additionalAttachments
            .removeAttachment(fileId)
            .catch(error => {
            const err = UserFriendlyError.fromAny(error);
            notify.error({
                title: t['com.affine.settings.workspace.indexer-embedding.embedding.remove-attachment.error'](),
                message: t[`error.${err.name}`](err.data),
            });
        });
    }, [embeddingService.additionalAttachments, t]);
    const handleAttachmentsPageChange = useCallback((offset) => {
        embeddingService.additionalAttachments.getAttachments({
            offset,
        });
    }, [embeddingService.additionalAttachments]);
    const handleSelectDoc = useCallback(() => {
        if (isIgnoredDocsLoading) {
            return;
        }
        const initialIds = ignoredDocs.map(doc => doc.docId);
        workspaceDialogService.open('doc-selector', {
            init: initialIds,
        }, selectedIds => {
            if (selectedIds === undefined) {
                return;
            }
            track.$.settingsPanel.indexerEmbedding.addIgnoredDocs({
                type: 'Embedding',
                control: 'Additional docs',
                result: 'success',
            });
            const add = selectedIds.filter(id => !initialIds?.includes(id));
            const remove = initialIds?.filter(id => !selectedIds.includes(id));
            embeddingService.ignoredDocs
                .updateIgnoredDocs({ add, remove })
                .catch(error => {
                const err = UserFriendlyError.fromAny(error);
                notify.error({
                    title: t['com.affine.settings.workspace.indexer-embedding.embedding.update-ignored-docs.error'](),
                    message: t[`error.${err.name}`](err.data),
                });
            });
        });
    }, [
        ignoredDocs,
        isIgnoredDocsLoading,
        workspaceDialogService,
        embeddingService.ignoredDocs,
        t,
    ]);
    useEffect(() => {
        embeddingService.embeddingProgress.startEmbeddingProgressPolling();
        embeddingService.embeddingEnabled.getEnabled();
        embeddingService.additionalAttachments.getAttachments({
            first: COUNT_PER_PAGE,
            after: null,
        });
        embeddingService.ignoredDocs.getIgnoredDocs();
        embeddingService.embeddingProgress.getEmbeddingProgress();
        return () => {
            embeddingService.embeddingProgress.stopEmbeddingProgressPolling();
        };
    }, [
        embeddingService.embeddingProgress,
        embeddingService.embeddingEnabled,
        embeddingService.additionalAttachments,
        embeddingService.ignoredDocs,
    ]);
    return (_jsxs(SettingWrapper, { title: '', testId: "workspace-embedding-setting-wrapper", disabled: disabled, children: [_jsx(SettingRow, { name: t['com.affine.settings.workspace.indexer-embedding.embedding.switch.title'](), desc: t['com.affine.settings.workspace.indexer-embedding.embedding.switch.description'](), children: _jsx(Switch, { "data-testid": "workspace-embedding-setting-switch", checked: embeddingEnabled ?? false, onChange: handleEmbeddingToggle, disabled: isEnabledLoading }) }), _jsxs(_Fragment, { children: [_jsx(SettingRow, { name: t['com.affine.settings.workspace.indexer-embedding.embedding.progress.title'](), style: { marginBottom: '0px' } }), _jsx(EmbeddingProgress, { status: embeddingProgress })] }), _jsx(SettingRow, { name: t['com.affine.settings.workspace.indexer-embedding.embedding.additional-attachments.title'](), desc: t['com.affine.settings.workspace.indexer-embedding.embedding.additional-attachments.description'](), children: _jsx(Upload, { fileChange: handleAttachmentUpload, children: _jsx(Button, { "data-testid": "workspace-embedding-setting-upload-button", variant: "primary", children: t['com.affine.settings.workspace.indexer-embedding.embedding.upload-file']() }) }) }), attachments.length > 0 && (_jsx(Attachments, { disabled: disabled, attachments: attachments, onDelete: handleAttachmentsDelete, totalCount: totalCount, onPageChange: handleAttachmentsPageChange })), _jsx(SettingRow, { name: t['com.affine.settings.workspace.indexer-embedding.embedding.ignore-docs.title'](), desc: t['com.affine.settings.workspace.indexer-embedding.embedding.ignore-docs.description'](), children: _jsx(Button, { "data-testid": "workspace-embedding-setting-ignore-docs-button", variant: "primary", onClick: handleSelectDoc, children: t['com.affine.settings.workspace.indexer-embedding.embedding.select-doc']() }) }), ignoredDocs.length > 0 && (_jsx(IgnoredDocs, { ignoredDocs: ignoredDocs, isLoading: isIgnoredDocsLoading }))] }));
};
export const EmbeddingSettings = () => {
    const workspaceService = useService(WorkspaceService);
    const serverService = useService(ServerService);
    const isLocal = workspaceService.workspace.flavour === 'local';
    const serverConfig = useLiveData(serverService.server.config$);
    const isEmbeddingEnabled = serverConfig?.features.includes(ServerFeature.CopilotEmbedding);
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsx(Tooltip, { content: !isEmbeddingEnabled &&
                    t['com.affine.settings.workspace.indexer-embedding.embedding.disabled-tooltip'](), children: _jsx(SettingHeader, { "data-testid": "workspace-embedding-setting-header", title: t['com.affine.settings.workspace.indexer-embedding.embedding.title'](), subtitle: t['com.affine.settings.workspace.indexer-embedding.embedding.description']() }) }), isLocal ? (_jsx(EmbeddingLocal, {})) : (_jsx(EmbeddingCloud, { disabled: !isEmbeddingEnabled }))] }));
};
//# sourceMappingURL=embedding-settings.js.map