import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Progress } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { cssVarV2 } from '@toeverything/theme/v2';
import { embeddingProgress, embeddingProgressTitle } from './styles-css';
const EmbeddingProgress = ({ status }) => {
    const t = useI18n();
    const loading = status === null;
    const percent = loading
        ? 0
        : status.total === 0
            ? 1
            : status.embedded / status.total;
    const progress = Math.round(percent * 100);
    const synced = percent === 1;
    return (_jsxs("div", { className: embeddingProgress, "data-testid": "embedding-progress-wrapper", children: [_jsxs("div", { className: embeddingProgressTitle, "data-testid": "embedding-progress-title", "data-progress": loading ? 'loading' : synced ? 'synced' : 'syncing', children: [_jsx("div", { children: loading
                            ? t['com.affine.settings.workspace.indexer-embedding.embedding.progress.loading-sync-status']()
                            : synced
                                ? t['com.affine.settings.workspace.indexer-embedding.embedding.progress.synced']()
                                : t['com.affine.settings.workspace.indexer-embedding.embedding.progress.syncing']() }), loading ? null : (_jsx("div", { "data-testid": "embedding-progress-count", children: `${status.embedded}/${status.total}` }))] }), _jsx(Progress, { testId: "embedding-progress", value: progress, readonly: true, style: {
                    visibility: loading ? 'hidden' : 'visible',
                    color: cssVarV2('text/primary'),
                } })] }));
};
export default EmbeddingProgress;
//# sourceMappingURL=embedding-progress.js.map