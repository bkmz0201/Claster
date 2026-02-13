import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import * as styles from './styles.css';
/**
 * This component is used for debugging responsive layout in storybook
 * @internal
 */
export const ResizePanel = ({ width, height, children, minHeight, minWidth, maxHeight, maxWidth, className, horizontal = true, vertical = true, offsetModifier, ...attrs }) => {
    const containerRef = useRef(null);
    const cornerHandleRef = useRef(null);
    const displayRef = useRef(null);
    useEffect(() => {
        if (!containerRef.current || !cornerHandleRef.current)
            return;
        const containerEl = containerRef.current;
        const cornerHandleEl = cornerHandleRef.current;
        let startPos = [0, 0];
        let startSize = [0, 0];
        const onDragStart = (e) => {
            containerEl.dataset.resizing = 'true';
            startPos = [e.clientX, e.clientY];
            startSize = [containerEl.offsetWidth, containerEl.offsetHeight];
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', onDragEnd);
        };
        const onDrag = (e) => {
            const pos = [e.clientX, e.clientY];
            const delta = [pos[0] - startPos[0], pos[1] - startPos[1]];
            const offset = offsetModifier ? offsetModifier(delta) : delta;
            const newSize = [startSize[0] + offset[0], startSize[1] + offset[1]];
            updateSize(newSize);
        };
        const onDragEnd = () => {
            containerEl.dataset.resizing = 'false';
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', onDragEnd);
        };
        const updateSize = (size) => {
            if (!containerEl)
                return;
            if (horizontal) {
                const width = Math.max(Math.min(size[0], maxWidth ?? Infinity), minWidth ?? 0);
                containerEl.style.width = `${width}px`;
            }
            if (vertical) {
                const height = Math.max(Math.min(size[1], maxHeight ?? Infinity), minHeight ?? 0);
                containerEl.style.height = `${height}px`;
            }
            if (displayRef.current) {
                displayRef.current.textContent = `${containerEl.offsetWidth}px * ${containerEl.offsetHeight}px`;
            }
        };
        updateSize([width ?? 400, height ?? 200]);
        cornerHandleEl.addEventListener('mousedown', onDragStart);
        return () => {
            cornerHandleEl.removeEventListener('mousedown', onDragStart);
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', onDragEnd);
        };
    }, [
        height,
        horizontal,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        offsetModifier,
        vertical,
        width,
    ]);
    return (_jsxs("div", { ref: containerRef, className: clsx(styles.container, className), ...attrs, children: [children, _jsx("div", { ref: cornerHandleRef, className: styles.cornerHandle, children: _jsx("div", { ref: displayRef, className: styles.display }) })] }));
};
//# sourceMappingURL=resize-panel.js.map