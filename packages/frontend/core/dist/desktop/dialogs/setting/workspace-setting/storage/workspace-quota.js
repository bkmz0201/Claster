import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ErrorMessage, Skeleton } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { WorkspaceQuotaService } from '@affine/core/modules/quota';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useEffect } from 'react';
import * as styles from './style.css';
export const WorkspaceQuotaPanel = () => {
    const t = useI18n();
    return (_jsx(SettingRow, { name: t['com.affine.workspace.storage'](), desc: "", spreadCol: false, children: _jsx(StorageProgress, {}) }));
};
export const StorageProgress = () => {
    const t = useI18n();
    const workspaceQuotaService = useService(WorkspaceQuotaService).quota;
    const isLoading = useLiveData(workspaceQuotaService.isRevalidating$);
    const usedFormatted = useLiveData(workspaceQuotaService.usedFormatted$);
    const maxFormatted = useLiveData(workspaceQuotaService.maxFormatted$);
    const percent = useLiveData(workspaceQuotaService.percent$);
    const color = useLiveData(workspaceQuotaService.color$);
    useEffect(() => {
        // revalidate quota to get the latest status
        workspaceQuotaService.revalidate();
    }, [workspaceQuotaService]);
    const loadError = useLiveData(workspaceQuotaService.error$);
    if (isLoading) {
        if (loadError) {
            return _jsx(ErrorMessage, { children: "Load error" });
        }
        return _jsx(Skeleton, { height: 26 });
    }
    return (_jsx("div", { className: styles.storageProgressContainer, children: _jsxs("div", { className: styles.storageProgressWrapper, children: [_jsxs("div", { className: "storage-progress-desc", children: [_jsx("span", { children: t['com.affine.storage.used.hint']() }), _jsxs("span", { children: [usedFormatted, "/", maxFormatted] })] }), _jsx("div", { className: "storage-progress-bar-wrapper", children: _jsx("div", { className: styles.storageProgressBar, style: {
                            width: `${percent}%`,
                            backgroundColor: color ?? cssVarV2('toast/iconState/regular'),
                        } }) })] }) }));
};
//# sourceMappingURL=workspace-quota.js.map