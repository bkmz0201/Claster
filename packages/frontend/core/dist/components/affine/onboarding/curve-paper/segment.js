import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as styles from './paper.css';
export function Segment({ children, index, direction, content, level, isTop, isBottom, ...attrs }) {
    const style = { '--index': index };
    return (_jsxs("div", { className: styles.segment, "data-direction": direction, "data-level": level, "data-bottom": (direction === 'down' && level === 1) || isBottom, "data-top": (direction === 'up' && level === 1) || isTop, ...attrs, children: [_jsx("div", { className: styles.contentWrapper, style: style, children: _jsx("div", { className: styles.content, children: content }) }), children] }));
}
//# sourceMappingURL=segment.js.map