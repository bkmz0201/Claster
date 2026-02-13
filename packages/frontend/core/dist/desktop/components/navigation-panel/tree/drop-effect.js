import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { CopyIcon, LinkIcon, MoveToIcon } from '@blocksuite/icons/rc';
import { createPortal } from 'react-dom';
import * as styles from './drop-effect.css';
export const DropEffect = ({ dropEffect, position, }) => {
    const t = useI18n();
    if (dropEffect === undefined)
        return null;
    return createPortal(_jsxs("div", { className: styles.dropEffect, style: {
            transform: `translate(${position.clientX}px, ${position.clientY}px)`,
        }, children: [dropEffect === 'copy' ? (_jsx(CopyIcon, { className: styles.icon })) : dropEffect === 'move' ? (_jsx(MoveToIcon, { className: styles.icon })) : (_jsx(LinkIcon, { className: styles.icon })), dropEffect === 'copy'
                ? t['com.affine.rootAppSidebar.explorer.drop-effect.copy']()
                : dropEffect === 'move'
                    ? t['com.affine.rootAppSidebar.explorer.drop-effect.move']()
                    : t['com.affine.rootAppSidebar.explorer.drop-effect.link']()] }), document.body);
};
//# sourceMappingURL=drop-effect.js.map