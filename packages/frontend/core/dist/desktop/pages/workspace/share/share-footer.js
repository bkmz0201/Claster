import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { ArrowRightBigIcon } from '@blocksuite/icons/rc';
import * as styles from './share-footer.css';
export const ShareFooter = () => {
    const t = useI18n();
    return (_jsx("div", { className: styles.footerContainer, children: _jsxs("div", { className: styles.footer, children: [_jsx("div", { className: styles.description, children: t['com.affine.share-page.footer.description']() }), _jsxs("a", { className: styles.getStartLink, href: "https://affine.pro/", target: "_blank", rel: "noreferrer", children: [t['com.affine.share-page.footer.get-started'](), _jsx(ArrowRightBigIcon, { fontSize: 16 })] })] }) }));
};
//# sourceMappingURL=share-footer.js.map