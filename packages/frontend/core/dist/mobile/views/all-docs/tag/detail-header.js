import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageHeader } from '@affine/core/mobile/components';
import { useLiveData } from '@toeverything/infra';
import * as styles from './detail.css';
export const TagDetailHeader = ({ tag }) => {
    const name = useLiveData(tag.value$);
    const color = useLiveData(tag.color$);
    return (_jsx(PageHeader, { className: styles.header, back: true, children: _jsxs("div", { className: styles.headerContent, children: [_jsx("div", { className: styles.headerIcon, style: { color } }), name] }) }));
};
//# sourceMappingURL=detail-header.js.map