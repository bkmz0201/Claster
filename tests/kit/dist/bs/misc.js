export async function waitNextFrame(page) {
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
}
//# sourceMappingURL=misc.js.map