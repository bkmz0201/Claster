import { jsx as _jsx } from "react/jsx-runtime";
import { cssVar } from '@toeverything/theme';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import {} from 'react';
import * as styles from './drop-indicator.css';
function getTreeElement({ instruction, isBlocked, noTerminal, }) {
    const style = {
        [styles.horizontalIndent]: `${instruction.currentLevel * instruction.indentPerLevel}px`,
        [styles.indicatorColor]: !isBlocked
            ? cssVar('--affine-primary-color')
            : cssVar('--affine-warning-color'),
    };
    if (instruction.type === 'reorder-above') {
        return (_jsx("div", { className: clsx(styles.treeLine, styles.lineAboveStyles), style: assignInlineVars(style), "data-no-terminal": noTerminal }));
    }
    if (instruction.type === 'reorder-below') {
        return (_jsx("div", { className: clsx(styles.treeLine, styles.lineBelowStyles), style: assignInlineVars(style), "data-no-terminal": noTerminal }));
    }
    if (instruction.type === 'make-child') {
        return (_jsx("div", { className: clsx(styles.outlineStyles), style: assignInlineVars(style), "data-no-terminal": noTerminal }));
    }
    if (instruction.type === 'reparent') {
        style[styles.horizontalIndent] = `${instruction.desiredLevel * instruction.indentPerLevel}px`;
        return (_jsx("div", { className: clsx(styles.treeLine, styles.lineBelowStyles), style: assignInlineVars(style), "data-no-terminal": noTerminal }));
    }
    return null;
}
const edgeToOrientationMap = {
    top: 'horizontal',
    bottom: 'horizontal',
    left: 'vertical',
    right: 'vertical',
};
const orientationStyles = {
    horizontal: styles.horizontal,
    vertical: styles.vertical,
};
const edgeStyles = {
    top: styles.top,
    bottom: styles.bottom,
    left: styles.left,
    right: styles.right,
};
function getEdgeElement(edge, gap = 0, noTerminal) {
    const lineOffset = `calc(-0.5 * (${gap}px + 2px))`;
    const orientation = edgeToOrientationMap[edge];
    return (_jsx("div", { "data-no-terminal": noTerminal, className: clsx([
            styles.edgeLine,
            orientationStyles[orientation],
            edgeStyles[edge],
        ]), style: assignInlineVars({ [styles.localLineOffset]: lineOffset }) }));
}
export function DropIndicator({ instruction, edge, noTerminal, }) {
    if (edge) {
        return getEdgeElement(edge, 0, noTerminal);
    }
    if (instruction) {
        if (instruction.type === 'instruction-blocked') {
            return getTreeElement({
                instruction: instruction.desired,
                isBlocked: true,
            });
        }
        return getTreeElement({ instruction, isBlocked: false });
    }
    return;
}
//# sourceMappingURL=drop-indicator.js.map