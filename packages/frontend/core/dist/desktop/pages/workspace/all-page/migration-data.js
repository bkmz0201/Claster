import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { DocCreatedByUpdatedBySyncService } from '@affine/core/modules/cloud';
import { UserFriendlyError } from '@affine/error';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useTheme } from 'next-themes';
import { useCallback, useMemo } from 'react';
import darkMigration from './dark-migration.png';
import lightMigration from './light-migration.png';
import * as styles from './migration-data.css';
const MigrationBackgroundCover = () => {
    const { theme } = useTheme();
    return (_jsx("img", { src: theme === 'light' ? lightMigration : darkMigration, className: styles.migrationBackgroundCover }));
};
export const MigrationAllDocsDataNotification = () => {
    const t = useI18n();
    const docCreatedByUpdatedBySyncService = useService(DocCreatedByUpdatedBySyncService);
    const needSync = useLiveData(docCreatedByUpdatedBySyncService.needSync$);
    const syncing = useLiveData(docCreatedByUpdatedBySyncService.syncing$);
    const error = useLiveData(docCreatedByUpdatedBySyncService.error$);
    const errorMessage = useMemo(() => {
        if (error) {
            const userFriendlyError = UserFriendlyError.fromAny(error);
            return t[`error.${userFriendlyError.name}`](userFriendlyError.data);
        }
        return null;
    }, [error, t]);
    const progress = useLiveData(docCreatedByUpdatedBySyncService.progress$);
    const handleSync = useCallback(() => {
        docCreatedByUpdatedBySyncService.sync();
    }, [docCreatedByUpdatedBySyncService]);
    if (!needSync) {
        return null;
    }
    return (_jsxs("div", { className: styles.migrationDataNotificationContainer, children: [_jsx("div", { className: styles.migrationDataNotificationTitle, children: t['com.affine.migration-all-docs-notification.header']() }), _jsxs("div", { className: styles.migrationDataNotificationContent, children: [_jsx(MigrationBackgroundCover, {}), t['com.affine.migration-all-docs-notification.desc']()] }), error && (_jsx("div", { className: styles.migrationDataNotificationError, children: t['com.affine.migration-all-docs-notification.error']({
                    errorMessage: errorMessage ?? '',
                }) })), _jsxs(Button, { loading: syncing, onClick: handleSync, children: [t['com.affine.migration-all-docs-notification.button'](), syncing ? ` (${Math.floor(progress * 100)}%)...` : ''] })] }));
};
//# sourceMappingURL=migration-data.js.map