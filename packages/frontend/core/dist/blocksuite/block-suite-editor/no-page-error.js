/**
 * TODO(@eyhn): Define error to unexpected state together in the future.
 */
export class NoPageRootError extends Error {
    constructor(page) {
        super('Page root not found when render editor!');
        this.page = page;
        // Log info to let sentry collect more message
        const hasExpectSpace = Array.from(page.rootDoc.getMap('spaces').values()).some(doc => page.spaceDoc.guid === doc.guid);
        const blocks = page.spaceDoc.getMap('blocks');
        const havePageBlock = Array.from(blocks.values()).some(block => block.get('sys:flavour') === 'affine:page');
        console.info('NoPageRootError current data: %s', JSON.stringify({
            expectPageId: page.id,
            expectGuid: page.spaceDoc.guid,
            hasExpectSpace,
            blockSize: blocks.size,
            havePageBlock,
        }));
    }
}
//# sourceMappingURL=no-page-error.js.map