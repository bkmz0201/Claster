import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment, useMemo } from 'react';
import * as styles from './highlight-text.css';
export const HighlightText = ({ text = '', end, start }) => {
    const parts = useMemo(() => text.split(start).flatMap(part => {
        if (part.includes(end)) {
            const [highlighted, ...ending] = part.split(end);
            return [
                {
                    h: highlighted,
                },
                ending.join(),
            ];
        }
        else {
            return part;
        }
    }), [end, start, text]);
    return (_jsx("span", { className: styles.highlightText, children: parts.map((part, index) => typeof part === 'string' ? (_jsx(Fragment, { children: part }, part)) : (_jsx("span", { className: styles.highlightKeyword, children: part.h }, part.h + '.' + index))) }));
};
//# sourceMappingURL=highlight-text.js.map