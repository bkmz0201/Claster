export async function pasteContent(page, clipData) {
    await page.evaluate(({ clipData }) => {
        const e = new ClipboardEvent('paste', {
            clipboardData: new DataTransfer(),
        });
        Object.defineProperty(e, 'target', {
            writable: false,
            value: document,
        });
        Object.keys(clipData).forEach(key => {
            e.clipboardData?.setData(key, clipData[key]);
        });
        document.dispatchEvent(e);
    }, { clipData });
    await page.waitForTimeout(100);
}
//# sourceMappingURL=clipboard.js.map