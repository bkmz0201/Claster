import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemedImg, withUnit } from '@affine/component';
import clsx from 'clsx';
import * as styles from './style.css';
export const EmptyLayout = ({ className, illustrationLight, illustrationDark, illustrationWidth = 300, title, description, action, absoluteCenter, ...attrs }) => {
    return (_jsxs("div", { className: clsx(styles.root, absoluteCenter ? styles.absoluteCenter : null, className), ...attrs, children: [_jsx(ThemedImg, { style: { width: withUnit(illustrationWidth, 'px') }, draggable: false, className: styles.illustration, lightSrc: illustrationLight, darkSrc: illustrationDark }), title || description ? (_jsxs("div", { children: [_jsx("p", { className: styles.title, children: title }), _jsx("p", { className: styles.description, children: description })] })) : null, action] }));
};
//# sourceMappingURL=layout.js.map