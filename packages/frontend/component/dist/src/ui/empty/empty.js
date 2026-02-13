import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { EmptySvg } from './empty-svg';
import * as styles from './index.css';
/**
 * @deprecated use different empty components for different use cases, like `EmptyDocs` for documentation empty state
 */
export const Empty = ({ containerStyle, title, description, descriptionStyle, }) => {
    const cssVar = assignInlineVars({
        [styles.svgWidth]: containerStyle?.width,
        [styles.svgHeight]: containerStyle?.height,
        [styles.svgFontSize]: containerStyle?.fontSize,
    });
    return (_jsxs("div", { className: styles.emptyContainer, children: [_jsx("div", { style: { color: 'var(--affine-black)' }, children: _jsx(EmptySvg, { className: styles.emptySvg, style: cssVar }) }), title && (_jsx("p", { style: {
                    marginTop: '30px',
                    color: 'var(--affine-text-primary-color)',
                    fontWeight: 700,
                }, children: title })), description && (_jsx("p", { style: { marginTop: title ? '8px' : '30px', ...descriptionStyle }, children: description }))] }));
};
export default Empty;
//# sourceMappingURL=empty.js.map