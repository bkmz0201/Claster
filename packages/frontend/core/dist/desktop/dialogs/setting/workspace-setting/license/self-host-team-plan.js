import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { useI18n } from '@affine/i18n';
import { DoneIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import * as styles from './self-host-team-plan.css';
const initialQuota = '100 GB';
const quotaPerSeat = '20 GB';
const maxFileSize = '500 MB';
export const SelfHostTeamPlan = () => {
    const t = useI18n();
    const permission = useService(WorkspacePermissionService).permission;
    const isTeam = useLiveData(permission.isTeam$);
    const handleClick = useCallback(() => {
        window.open(BUILD_CONFIG.pricingUrl, '_blank');
    }, []);
    if (isTeam) {
        return null;
    }
    return (_jsxs("div", { className: styles.pricingPlan, children: [_jsxs("div", { className: styles.planCardHeader, children: [_jsx("div", { className: styles.planCardTitle, children: t['com.affine.settings.workspace.license.benefit.team.title']() }), _jsx("div", { className: styles.planCardSubtitle, children: t['com.affine.settings.workspace.license.benefit.team.subtitle']() })] }), _jsxs("div", { className: styles.benefitItems, children: [_jsxs("div", { className: styles.benefitItem, children: [_jsx(DoneIcon, { className: styles.doneIconStyle }), t['com.affine.settings.workspace.license.benefit.team.g1']()] }), _jsxs("div", { className: styles.benefitItem, children: [_jsx(DoneIcon, { className: styles.doneIconStyle }), t['com.affine.settings.workspace.license.benefit.team.g2']({
                                initialQuota,
                                quotaPerSeat,
                            })] }), _jsxs("div", { className: styles.benefitItem, children: [_jsx(DoneIcon, { className: styles.doneIconStyle }), t['com.affine.settings.workspace.license.benefit.team.g3']({
                                quota: maxFileSize,
                            })] }), _jsxs("div", { className: styles.benefitItem, children: [_jsx(DoneIcon, { className: styles.doneIconStyle }), t['com.affine.settings.workspace.license.benefit.team.g4']()] }), _jsxs("div", { className: styles.benefitItem, children: [_jsx(DoneIcon, { className: styles.doneIconStyle }), t['com.affine.settings.workspace.license.benefit.team.g5']()] }), _jsxs("div", { className: styles.benefitItem, children: [_jsx(DoneIcon, { className: styles.doneIconStyle }), t['com.affine.settings.workspace.license.benefit.team.g6']()] })] }), _jsx("div", { className: styles.leanMoreButtonContainer, children: _jsx(Button, { onClick: handleClick, children: t['com.affine.settings.workspace.license.lean-more']() }) })] }));
};
//# sourceMappingURL=self-host-team-plan.js.map