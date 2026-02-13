import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { track } from '@affine/track';
import { CloseIcon, DownloadIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import * as styles from './index.css';
export function AppDownloadButton({ className, style, }) {
    const [show, setShow] = useState(true);
    const handleClose = useCatchEventCallback(() => {
        setShow(false);
    }, []);
    // TODO(@JimmFly): unify this type of literal value.
    const handleClick = useCallback(() => {
        track.$.navigationPanel.bottomButtons.downloadApp();
        const url = `https://affine.pro/download?channel=stable`;
        open(url, '_blank');
    }, []);
    if (!show) {
        return null;
    }
    return (_jsxs("button", { style: style, className: clsx([styles.root, styles.rootPadding, className]), onClick: handleClick, children: [_jsxs("div", { className: clsx([styles.label]), children: [_jsx(DownloadIcon, { className: styles.icon }), _jsx("span", { className: styles.ellipsisTextOverflow, children: "Download App" })] }), _jsx("div", { className: styles.closeIcon, onClick: handleClose, children: _jsx(CloseIcon, {}) }), _jsx("div", { className: styles.particles, "aria-hidden": "true" }), _jsx("span", { className: styles.halo, "aria-hidden": "true" })] }));
}
//# sourceMappingURL=index.js.map