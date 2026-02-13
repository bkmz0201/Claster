const BLOCK_MATCH_REGEXP = /^\s*<!--\s*block_id=(.*?)\s+flavour=(.*?)\s*-->/;
export function parseMarkdownToBlocks(markdown) {
    const lines = markdown.split(/\r?\n/);
    const blocks = [];
    let currentBlockId = null;
    let currentType = null;
    let currentContent = [];
    for (const line of lines) {
        const match = line.match(BLOCK_MATCH_REGEXP);
        if (match) {
            // If there is a block being collected, push it into blocks first
            if (currentBlockId && currentType) {
                blocks.push({
                    id: currentBlockId,
                    type: currentType,
                    content: currentContent.join('\n').trim(),
                });
            }
            // Start a new block
            currentBlockId = match[1];
            currentType = match[2];
            currentContent = [];
        }
        else {
            // Collect content
            if (currentBlockId && currentType) {
                currentContent.push(line);
            }
        }
    }
    // Collect the last block
    if (currentBlockId && currentType) {
        blocks.push({
            id: currentBlockId,
            type: currentType,
            content: currentContent.join('\n').trim(),
        });
    }
    return blocks;
}
function diffBlockLists(oldBlocks, newBlocks) {
    const patch = [];
    const oldMap = new Map();
    oldBlocks.forEach((b, i) => oldMap.set(b.id, { block: b, index: i }));
    const newMap = new Map();
    newBlocks.forEach((b, i) => newMap.set(b.id, { block: b, index: i }));
    // Mark old blocks that have been handled
    const handledOld = new Set();
    newBlocks.forEach((newBlock, newIdx) => {
        const old = oldMap.get(newBlock.id);
        if (old) {
            handledOld.add(newBlock.id);
            if (old.block.content !== newBlock.content) {
                patch.push({
                    op: 'replace',
                    id: newBlock.id,
                    content: newBlock.content,
                });
            }
        }
        else {
            const after = newIdx > 0 ? newBlocks[newIdx - 1].id : 'HEAD';
            patch.push({
                op: 'insert',
                index: newIdx,
                after,
                block: {
                    id: newBlock.id,
                    type: newBlock.type,
                    content: newBlock.content,
                },
            });
        }
    });
    // Then process deleted oldBlocks
    oldBlocks.forEach(oldBlock => {
        if (!newMap.has(oldBlock.id)) {
            patch.push({
                op: 'delete',
                id: oldBlock.id,
            });
        }
    });
    return patch;
}
export function diffMarkdown(oldMarkdown, newMarkdown) {
    const oldBlocks = parseMarkdownToBlocks(oldMarkdown);
    const newBlocks = parseMarkdownToBlocks(newMarkdown);
    const patches = diffBlockLists(oldBlocks, newBlocks);
    return { patches, newBlocks, oldBlocks };
}
//# sourceMappingURL=markdown-diff.js.map