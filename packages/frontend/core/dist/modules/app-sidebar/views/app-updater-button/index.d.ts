export interface AddPageButtonProps {
    onQuitAndInstall: () => void;
    onDownloadUpdate: () => void;
    onDismissChangelog: () => void;
    onOpenChangelog: () => void;
    changelogUnread: boolean;
    updateReady: boolean;
    updateAvailable: {
        version: string;
        allowAutoUpdate: boolean;
    } | null;
    autoDownload: boolean;
    downloadProgress: number | null;
    appQuitting: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare function AppUpdaterButton({ updateReady, changelogUnread, onDismissChangelog, onDownloadUpdate, onQuitAndInstall, onOpenChangelog, updateAvailable, autoDownload, downloadProgress, appQuitting, className, style, }: AddPageButtonProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=index.d.ts.map