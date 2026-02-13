export async function setSelection(page, anchorBlockId, anchorOffset, focusBlockId, focusOffset) {
    await page.evaluate(({ anchorBlockId, anchorOffset, focusBlockId, focusOffset }) => {
        const editorHost = document.querySelector('editor-host');
        if (!editorHost) {
            throw new Error('Cannot find editor host');
        }
        const anchorRichText = editorHost.querySelector(`[data-block-id="${anchorBlockId}"] rich-text`);
        const anchorRichTextRange = anchorRichText.inlineEditor.toDomRange({
            index: anchorOffset,
            length: 0,
        });
        const focusRichText = editorHost.querySelector(`[data-block-id="${focusBlockId}"] rich-text`);
        const focusRichTextRange = focusRichText.inlineEditor.toDomRange({
            index: focusOffset,
            length: 0,
        });
        const sl = getSelection();
        if (!sl)
            throw new Error('Cannot get selection');
        const range = document.createRange();
        range.setStart(anchorRichTextRange.startContainer, anchorRichTextRange.startOffset);
        range.setEnd(focusRichTextRange.startContainer, focusRichTextRange.startOffset);
        sl.removeAllRanges();
        sl.addRange(range);
    }, {
        anchorBlockId,
        anchorOffset,
        focusBlockId,
        focusOffset,
    });
}
//# sourceMappingURL=selection.js.map