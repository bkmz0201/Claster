export const cleanSelection = () => {
    const selection = window.getSelection();
    if (selection) {
        selection.removeAllRanges();
    }
};
//# sourceMappingURL=utils.js.map