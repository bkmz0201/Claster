import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PropertyValue } from '@affine/component';
import { DualLinkIcon } from '@blocksuite/icons/rc';
import { IntegrationTypeIcon } from '../icon';
import * as styles from './styles.css';
export const SourceValue = ({ value, integration }) => {
    return (_jsx("a", { href: value, target: "_blank", rel: "noreferrer", className: styles.linkWrapper, children: _jsxs(PropertyValue, { className: styles.sourceValue, children: [_jsx("div", { className: styles.sourceValueIcon, children: _jsx(IntegrationTypeIcon, { type: integration }) }), value, _jsx(DualLinkIcon, { className: styles.sourceValueLinkIcon })] }) }));
};
//# sourceMappingURL=source-value.js.map