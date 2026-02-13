import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Segment } from './segment';
export function Segments({ level, direction, root, index, centerIndex, segments, content, }) {
    if (!level)
        return null;
    const inherits = { centerIndex, segments, content };
    if (root) {
        const up = centerIndex;
        const down = segments - up - 1;
        const vars = {
            '--segments': segments,
            '--segments-up': up,
            '--segments-down': down,
        };
        return (_jsxs(Segment, { "data-root": true, style: vars, index: up, content: content, isTop: up === 0, isBottom: down === 0, children: [_jsx(Segments, { index: up - 1, level: up, direction: "up", ...inherits }), _jsx(Segments, { index: up + 1, level: down, direction: "down", ...inherits })] }));
    }
    const children = level === 1 ? null : (_jsx(Segments, { direction: direction, index: direction === 'up' ? index - 1 : index + 1, level: level - 1, ...inherits }));
    return (_jsx(Segment, { direction: direction, index: index, content: content, level: level, children: children }));
}
//# sourceMappingURL=segments.js.map