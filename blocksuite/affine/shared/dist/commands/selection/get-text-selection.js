import { TextSelection } from '@blocksuite/std';
export const getTextSelectionCommand = (ctx, next) => {
    const currentTextSelection = ctx.std.selection.find(TextSelection);
    if (!currentTextSelection)
        return;
    next({ currentTextSelection });
};
//# sourceMappingURL=get-text-selection.js.map