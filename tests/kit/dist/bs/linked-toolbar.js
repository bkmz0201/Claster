export function toolbarButtons(page) {
    const toolbar = page.locator('affine-toolbar-widget editor-toolbar');
    const switchViewBtn = toolbar.getByLabel('Switch view');
    const inlineViewBtn = toolbar.getByLabel('Inline view');
    const cardViewBtn = toolbar.getByLabel('Card view');
    const embedViewBtn = toolbar.getByLabel('Embed view');
    return {
        toolbar,
        switchViewBtn,
        inlineViewBtn,
        cardViewBtn,
        embedViewBtn,
    };
}
//# sourceMappingURL=linked-toolbar.js.map