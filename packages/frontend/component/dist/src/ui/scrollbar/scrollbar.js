import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import * as styles from './index.css';
import { useHasScrollTop } from './use-has-scroll-top';
export const ScrollableContainer = ({ children, showScrollTopBorder = false, inTableView = false, className, styles: _styles, viewPortClassName, scrollBarClassName, scrollThumbClassName, }) => {
    const [setContainer, hasScrollTop] = useHasScrollTop();
    return (_jsxs(ScrollArea.Root, { style: _styles, className: clsx(styles.scrollableContainerRoot, className), children: [_jsx("div", { "data-has-scroll-top": hasScrollTop, className: clsx({ [styles.scrollTopBorder]: showScrollTopBorder }) }), _jsx(ScrollArea.Viewport, { className: clsx([styles.scrollableViewport, viewPortClassName]), ref: setContainer, children: _jsx("div", { className: styles.scrollableContainer, children: children }) }), _jsx(ScrollArea.Scrollbar, { orientation: "vertical", className: clsx(styles.scrollbar, scrollBarClassName, {
                    [styles.TableScrollbar]: inTableView,
                }), children: _jsx(ScrollArea.Thumb, { className: clsx(styles.scrollbarThumb, scrollThumbClassName) }) })] }));
};
//# sourceMappingURL=scrollbar.js.map