import { jsx as _jsx } from "react/jsx-runtime";
import { OverlayModal } from '@affine/component';
import { useI18n } from '@affine/i18n';
export const IssueFeedbackModal = ({ open, setOpen, }) => {
    const t = useI18n();
    return (_jsx(OverlayModal, { open: open, topImage: _jsx("video", { width: 400, height: 300, style: { objectFit: 'cover' }, src: '/static/newIssue.mp4', autoPlay: true, loop: true }), title: t['com.affine.issue-feedback.title'](), onOpenChange: setOpen, description: t['com.affine.issue-feedback.description'](), cancelText: t['com.affine.issue-feedback.cancel'](), to: `${BUILD_CONFIG.githubUrl}/issues/new/choose`, confirmText: t['com.affine.issue-feedback.confirm'](), confirmButtonOptions: {
            variant: 'primary',
        }, external: true }));
};
//# sourceMappingURL=index.js.map