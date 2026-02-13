import { jsx as _jsx } from "react/jsx-runtime";
import { useAppUpdater } from '@affine/core/components/hooks/use-app-updater';
import { AppUpdaterButton } from '@affine/core/modules/app-sidebar/views';
import { Suspense } from 'react';
const UpdaterButtonInner = () => {
    const appUpdater = useAppUpdater();
    return (_jsx(AppUpdaterButton, { onQuitAndInstall: appUpdater.quitAndInstall, onDownloadUpdate: appUpdater.downloadUpdate, onDismissChangelog: appUpdater.dismissChangelog, onOpenChangelog: appUpdater.openChangelog, changelogUnread: appUpdater.changelogUnread, updateReady: !!appUpdater.updateReady, updateAvailable: appUpdater.updateAvailable, autoDownload: appUpdater.autoDownload, downloadProgress: appUpdater.downloadProgress, appQuitting: appUpdater.appQuitting }));
};
export const UpdaterButton = () => {
    return (_jsx(Suspense, { children: _jsx(UpdaterButtonInner, {}) }));
};
//# sourceMappingURL=updater-button.js.map