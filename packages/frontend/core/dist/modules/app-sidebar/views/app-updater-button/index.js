import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tooltip } from '@affine/component';
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { UrlService } from '@affine/core/modules/url';
import { Unreachable } from '@affine/env/constant';
import { useI18n } from '@affine/i18n';
import { CloseIcon, DownloadIcon, NewIcon, ResetIcon, } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import * as styles from './index.css';
function DownloadUpdate({ updateAvailable }) {
    const t = useI18n();
    return (_jsxs("div", { className: styles.updateAvailableWrapper, children: [_jsxs("div", { className: styles.installLabelNormal, children: [_jsx(DownloadIcon, { className: styles.icon }), _jsx("span", { className: styles.ellipsisTextOverflow, children: t['com.affine.appUpdater.downloadUpdate']() }), _jsx("span", { className: styles.versionLabel, children: updateAvailable?.version })] }), _jsxs("div", { className: styles.installLabelHover, children: [_jsx(DownloadIcon, { className: styles.icon }), _jsx("span", { className: styles.ellipsisTextOverflow, children: t['com.affine.appUpdater.downloadUpdate']() })] })] }));
}
function UpdateReady({ updateAvailable, appQuitting }) {
    const t = useI18n();
    return (_jsxs("div", { className: styles.updateAvailableWrapper, children: [_jsxs("div", { className: styles.installLabelNormal, children: [_jsx(ResetIcon, { className: styles.icon }), _jsx("span", { className: styles.ellipsisTextOverflow, children: t['com.affine.appUpdater.updateAvailable']() }), _jsx("span", { className: styles.versionLabel, children: updateAvailable?.version })] }), _jsxs("div", { className: styles.installLabelHover, children: [_jsx(ResetIcon, { className: styles.icon }), _jsx("span", { className: styles.ellipsisTextOverflow, children: t[appQuitting ? 'Loading' : 'com.affine.appUpdater.installUpdate']() })] })] }));
}
function DownloadingUpdate({ updateAvailable, downloadProgress, }) {
    const t = useI18n();
    return (_jsxs("div", { className: clsx([styles.updateAvailableWrapper]), children: [_jsxs("div", { className: clsx([styles.installLabelNormal]), children: [_jsx("span", { className: styles.ellipsisTextOverflow, children: t['com.affine.appUpdater.downloading']() }), _jsx("span", { className: styles.versionLabel, children: updateAvailable?.version })] }), _jsx("div", { className: styles.progress, children: _jsx("div", { className: styles.progressInner, style: { width: `${downloadProgress}%` } }) })] }));
}
function OpenDownloadPage({ updateAvailable }) {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.installLabelNormal, children: [_jsx(DownloadIcon, { className: styles.icon }), _jsx("span", { className: styles.ellipsisTextOverflow, children: t['com.affine.appUpdater.updateAvailable']() }), _jsx("span", { className: styles.versionLabel, children: updateAvailable?.version })] }), _jsxs("div", { className: styles.installLabelHover, children: [_jsx(DownloadIcon, { className: styles.icon }), _jsx("span", { className: styles.ellipsisTextOverflow, children: t['com.affine.appUpdater.openDownloadPage']() })] })] }));
}
function WhatsNew({ onDismissChangelog }) {
    const t = useI18n();
    const onClickClose = useCatchEventCallback(() => {
        onDismissChangelog();
    }, [onDismissChangelog]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: clsx([styles.whatsNewLabel]), children: [_jsx(NewIcon, { className: styles.icon }), _jsx("span", { className: styles.ellipsisTextOverflow, children: t['com.affine.appUpdater.whatsNew']() })] }), _jsx("div", { className: styles.closeIcon, onClick: onClickClose, children: _jsx(CloseIcon, {}) })] }));
}
const getButtonContentRenderer = (props) => {
    if (props.updateReady) {
        return UpdateReady;
    }
    else if (props.updateAvailable?.allowAutoUpdate) {
        if (props.autoDownload && props.updateAvailable.allowAutoUpdate) {
            return DownloadingUpdate;
        }
        else {
            return DownloadUpdate;
        }
    }
    else if (props.updateAvailable && !props.updateAvailable?.allowAutoUpdate) {
        return OpenDownloadPage;
    }
    else if (props.changelogUnread) {
        return WhatsNew;
    }
    return null;
};
export function AppUpdaterButton({ updateReady, changelogUnread, onDismissChangelog, onDownloadUpdate, onQuitAndInstall, onOpenChangelog, updateAvailable, autoDownload, downloadProgress, appQuitting, className, style, }) {
    const urlService = useService(UrlService);
    const handleClick = useCallback(() => {
        if (updateReady) {
            onQuitAndInstall();
        }
        else if (updateAvailable) {
            if (updateAvailable.allowAutoUpdate) {
                if (autoDownload) {
                    // wait for download to finish
                }
                else {
                    onDownloadUpdate();
                }
            }
            else {
                urlService.openPopupWindow(`https://github.com/toeverything/AFFiNE/releases/tag/v${updateAvailable.version}`);
            }
        }
        else if (changelogUnread) {
            onOpenChangelog();
        }
        else {
            throw new Unreachable();
        }
    }, [
        updateReady,
        updateAvailable,
        changelogUnread,
        onQuitAndInstall,
        autoDownload,
        onDownloadUpdate,
        urlService,
        onOpenChangelog,
    ]);
    const contentProps = useMemo(() => ({
        updateReady,
        updateAvailable,
        changelogUnread,
        autoDownload,
        downloadProgress,
        appQuitting,
        onDismissChangelog,
    }), [
        updateReady,
        updateAvailable,
        changelogUnread,
        autoDownload,
        downloadProgress,
        appQuitting,
        onDismissChangelog,
    ]);
    const ContentComponent = getButtonContentRenderer(contentProps);
    const wrapWithTooltip = (node, tooltip) => {
        if (!tooltip) {
            return node;
        }
        return (_jsx(Tooltip, { content: tooltip, side: "top", children: node }));
    };
    const disabled = useMemo(() => {
        if (appQuitting) {
            return true;
        }
        if (updateAvailable?.allowAutoUpdate) {
            return !updateReady && autoDownload;
        }
        return false;
    }, [
        appQuitting,
        autoDownload,
        updateAvailable?.allowAutoUpdate,
        updateReady,
    ]);
    if (!updateAvailable && !changelogUnread) {
        return null;
    }
    return wrapWithTooltip(_jsxs("button", { style: style, className: clsx([styles.root, className]), "data-has-update": !!updateAvailable, "data-updating": appQuitting, "data-disabled": disabled, onClick: handleClick, children: [ContentComponent ? _jsx(ContentComponent, { ...contentProps }) : null, _jsx("div", { className: styles.particles, "aria-hidden": "true" }), _jsx("span", { className: styles.halo, "aria-hidden": "true" })] }), updateAvailable?.version);
}
//# sourceMappingURL=index.js.map