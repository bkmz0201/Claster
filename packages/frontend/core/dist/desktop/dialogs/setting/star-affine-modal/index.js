import { jsx as _jsx } from "react/jsx-runtime";
import { OverlayModal } from '@affine/component';
import { useI18n } from '@affine/i18n';
export const StarAFFiNEModal = ({ open, setOpen, }) => {
    const t = useI18n();
    return (_jsx(OverlayModal, { open: open, topImage: _jsx("video", { width: 400, height: 300, style: { objectFit: 'cover' }, src: '/static/githubStar.mp4', autoPlay: true, loop: true }), title: t['com.affine.star-affine.title'](), onOpenChange: setOpen, description: t['com.affine.star-affine.description'](), cancelText: t['com.affine.star-affine.cancel'](), to: BUILD_CONFIG.githubUrl, confirmButtonOptions: {
            variant: 'primary',
        }, confirmText: t['com.affine.star-affine.confirm'](), external: true }));
};
//# sourceMappingURL=index.js.map