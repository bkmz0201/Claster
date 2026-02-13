import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, MobileMenu, SafeArea } from '@affine/component';
import { MoreHorizontalIcon } from '@blocksuite/icons/rc';
import { header, headerContent, headerSpace } from './style.css';
import { AllDocsTabs } from './tabs';
export const AllDocsHeader = ({ operations }) => {
    return (_jsxs(_Fragment, { children: [_jsx(SafeArea, { top: true, className: header, children: _jsxs("header", { className: headerContent, children: [_jsx(AllDocsTabs, {}), _jsx("div", { children: operations ? (_jsx(MobileMenu, { items: operations, children: _jsx(IconButton, { icon: _jsx(MoreHorizontalIcon, {}) }) })) : null })] }) }), _jsx(SafeArea, { top: true, children: _jsx("div", { className: headerSpace }) })] }));
};
//# sourceMappingURL=header.js.map