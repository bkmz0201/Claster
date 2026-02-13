import { waitNextFrame } from './misc.js';
export async function updateBlockType(page, flavour, type) {
    await page.evaluate(([flavour, type]) => {
        window.host.std.command.exec(window.$blocksuite.blocks.note.updateBlockType, {
            flavour,
            props: {
                type,
            },
        });
    }, [flavour, type]);
    await waitNextFrame(page, 400);
}
export async function getBlockIds(page) {
    return page.evaluate(() => {
        return window.host.std.store.getAllModels().map(m => m.id);
    });
}
//# sourceMappingURL=block.js.map