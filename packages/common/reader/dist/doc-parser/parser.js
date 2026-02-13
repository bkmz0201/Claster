import { Array as YArray } from 'yjs';
import { deltaToMd, getConverters } from './delta-to-md';
export const parseBlockToMd = (block, padding = '') => {
    if (block.content) {
        return (block.content
            .split('\n')
            .map(line => padding + line)
            .slice(0, -1)
            .join('\n') +
            '\n' +
            block.children.map(b => parseBlockToMd(b, padding + '    ')).join(''));
    }
    else {
        return block.children.map(b => parseBlockToMd(b, padding)).join('');
    }
};
export function parseBlock(context, yBlock, yBlocks, // all blocks
aiEditable = false, blockLevel = 0) {
    if (!yBlock) {
        return null;
    }
    const deltaConverters = getConverters({
        convertInlineReferenceLink: ref => {
            return {
                title: ref.title || context.renderDocTitle?.(ref.pageId) || '',
                link: context.buildDocUrl(ref.pageId),
            };
        },
    });
    const id = yBlock.get('sys:id');
    const flavour = yBlock.get('sys:flavour');
    const type = yBlock.get('prop:type');
    const toMd = () => deltaToMd(yBlock.get('prop:text').toDelta(), deltaConverters);
    const hidden = yBlock.get('prop:hidden');
    const displayMode = yBlock.get('prop:displayMode');
    const childrenIds = yBlock.get('sys:children') instanceof YArray
        ? yBlock.get('sys:children').toJSON()
        : [];
    let result = {
        id,
        flavour,
        content: '',
        children: [],
        type,
    };
    if (hidden || displayMode === 'edgeless') {
        return result;
    }
    let placeholder = false;
    try {
        switch (flavour) {
            case 'affine:paragraph': {
                let initial = '';
                if (type === 'h1') {
                    initial = '# ';
                }
                else if (type === 'h2') {
                    initial = '## ';
                }
                else if (type === 'h3') {
                    initial = '### ';
                }
                else if (type === 'h4') {
                    initial = '#### ';
                }
                else if (type === 'h5') {
                    initial = '##### ';
                }
                else if (type === 'h6') {
                    initial = '###### ';
                }
                else if (type === 'quote') {
                    initial = '> ';
                }
                result.content = initial + toMd() + '\n';
                break;
            }
            case 'affine:divider': {
                result.content = '\n---\n\n';
                break;
            }
            case 'affine:list': {
                let prefix = type === 'bulleted' ? '* ' : '1. ';
                if (type === 'todo') {
                    const checked = yBlock.get('prop:checked');
                    prefix = checked ? '- [x] ' : '- [ ] ';
                }
                result.content = prefix + toMd();
                break;
            }
            case 'affine:code': {
                const lang = yBlock.get('prop:language')?.toLowerCase() || 'txt';
                // do not transform to delta for code block
                const caption = yBlock.get('prop:caption');
                result.content =
                    '```' +
                        lang +
                        (caption ? ` ${caption}` : '') +
                        '\n' +
                        yBlock.get('prop:text').toJSON() +
                        '\n```\n\n';
                break;
            }
            case 'affine:image': {
                const sourceId = yBlock.get('prop:sourceId');
                const width = yBlock.get('prop:width');
                const height = yBlock.get('prop:height');
                // fixme: this may not work if workspace is not public
                const blobUrl = context.buildBlobUrl(sourceId);
                const caption = yBlock.get('prop:caption');
                if (width || height || caption) {
                    result.content =
                        `<img
                src="${blobUrl}"
                alt="${caption}"
                width="${width || 'auto'}"
                height="${height || 'auto'}"
              />
            ` + '\n\n';
                }
                else {
                    result.content = `\n![${caption || sourceId}](${blobUrl})\n\n`;
                }
                Object.assign(result, {
                    sourceId,
                    width,
                    height,
                    caption,
                    blobUrl,
                });
                break;
            }
            case 'affine:attachment': {
                const sourceId = yBlock.get('prop:sourceId');
                const blobUrl = context.buildBlobUrl(sourceId);
                const caption = yBlock.get('prop:caption');
                if (type.startsWith('video')) {
                    result.content =
                        `<video muted autoplay loop preload="auto" playsinline>
               <source src="${blobUrl}" type="${type}" />
             </video>
            ` + '\n\n';
                }
                else {
                    // assume it is an image
                    result.content = `\n![${caption || sourceId}](${blobUrl})\n\n`;
                }
                Object.assign(result, {
                    sourceId,
                    blobUrl,
                    caption,
                });
                break;
            }
            case 'affine:embed-youtube': {
                const videoId = yBlock.get('prop:videoId');
                // prettier-ignore
                result.content = `
        <iframe
          type="text/html"
          width="100%"
          height="410px"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          credentialless>
        </iframe>` + '\n\n';
                break;
            }
            case 'affine:bookmark': {
                const url = yBlock.get('prop:url');
                const caption = yBlock.get('prop:caption');
                result.content = `\n[](Bookmark,${url})\n\n`;
                Object.assign(result, {
                    url,
                    caption,
                });
                break;
            }
            case 'affine:embed-linked-doc':
            case 'affine:embed-synced-doc': {
                const pageId = yBlock.get('prop:pageId');
                const caption = yBlock.get('prop:caption');
                result.content = `\n[${caption}](${context.buildDocUrl(pageId)})\n\n`;
                Object.assign(result, {
                    pageId,
                    caption,
                });
                break;
            }
            case 'affine:surface':
            case 'affine:page':
            case 'affine:note':
            case 'affine:frame': {
                result.content = '';
                break;
            }
            case 'affine:database': {
                const title = yBlock.get('prop:title').toJSON();
                const childrenTitleById = Object.fromEntries(childrenIds.map(cid => {
                    const child = parseBlock(context, yBlocks.get(cid), yBlocks, aiEditable, blockLevel + 1);
                    if (!child) {
                        return [cid, ''];
                    }
                    return [cid, parseBlockToMd(child)];
                }));
                const cols = yBlock.get('prop:columns').toJSON();
                const cells = yBlock.get('prop:cells').toJSON();
                const optionToTagHtml = (option) => {
                    return `<span data-affine-option data-value="${option.id}" data-option-color="${option.color}">${option.value}</span>`;
                };
                const dbRows = childrenIds
                    .map(cid => {
                    const row = cells[cid];
                    return cols.map(col => {
                        const value = row?.[col.id]?.value;
                        if (col.type !== 'title' && !value) {
                            return '';
                        }
                        switch (col.type) {
                            case 'title':
                                return childrenTitleById[cid];
                            case 'select':
                                return optionToTagHtml(col.data['options'].find((opt) => opt.id === value));
                            case 'multi-select':
                                return col.data['options']
                                    .filter((opt) => value.includes(opt.id))
                                    .map(optionToTagHtml)
                                    .join('');
                            default:
                                return value ?? '';
                        }
                    });
                })
                    .filter(row => !row.every(v => !v));
                const header = cols.map(col => {
                    return col.name;
                });
                const divider = cols.map(() => {
                    return '---';
                });
                // convert to markdown table
                result.content =
                    [header, divider, ...dbRows]
                        .map(row => {
                        return ('|' +
                            row
                                .map(cell => String(cell || '')?.trim())
                                .join('|')
                                .replace(/\n+/g, '<br />') +
                            '|');
                    })
                        .join('\n') + '\n\n';
                Object.assign(result, {
                    title,
                    rows: dbRows.map(row => {
                        return Object.fromEntries(row.map((v, i) => [cols[i].name, v]));
                    }),
                });
                break;
            }
            case 'affine:table': {
                // Extract row IDs and their order
                const rowEntries = Object.entries(yBlock.toJSON())
                    .filter(([key]) => key.startsWith('prop:rows.') && key.endsWith('.rowId'))
                    .map(([key, value]) => {
                    const rowId = value;
                    const orderKey = key.replace('.rowId', '.order');
                    const order = yBlock.get(orderKey);
                    const backgroundColor = yBlock.get(key.replace('.rowId', '.backgroundColor'));
                    return { rowId, order, backgroundColor };
                })
                    .sort((a, b) => a.order.localeCompare(b.order));
                // Extract column IDs and their order
                const columnEntries = Object.entries(yBlock.toJSON())
                    .filter(([key]) => key.startsWith('prop:columns.') && key.endsWith('.columnId'))
                    .map(([key, value]) => {
                    const columnId = value;
                    const orderKey = key.replace('.columnId', '.order');
                    const order = yBlock.get(orderKey);
                    return { columnId, order };
                })
                    .sort((a, b) => a.order.localeCompare(b.order));
                // Build the table rows with cell data
                const tableRows = rowEntries.map(({ rowId }) => {
                    return columnEntries.map(({ columnId }) => {
                        const cellKey = `prop:cells.${rowId}:${columnId}.text`;
                        const cellText = yBlock.get(cellKey);
                        return cellText || '';
                    });
                });
                // Store column IDs for reference
                const columnIds = columnEntries.map(({ columnId }) => columnId);
                // Use the first row as header and the rest as data rows
                if (tableRows.length > 0) {
                    const headerRow = tableRows[0];
                    const dataRows = tableRows.slice(1);
                    const separators = headerRow.map(() => '---');
                    // Convert to markdown table with first row as header
                    result.content =
                        [headerRow, separators, ...dataRows]
                            .map(row => {
                            return ('|' +
                                row
                                    .map(cell => String(cell || '')?.trim())
                                    .join('|')
                                    .replace(/\n+/g, '<br />') +
                                '|');
                        })
                            .join('\n') + '\n\n';
                }
                else {
                    // Handle empty table case
                    result.content = '';
                }
                Object.assign(result, {
                    columns: columnIds,
                    rows: tableRows,
                });
                break;
            }
            default: {
                // console.warn("Unknown or unsupported flavour", flavour);
                placeholder = true;
            }
        }
        result.children =
            flavour !== 'affine:database'
                ? childrenIds
                    .map(cid => parseBlock(context, yBlocks.get(cid), yBlocks, aiEditable, blockLevel + 1))
                    .filter((block) => !!block &&
                    !(block.content === '' && block.children.length === 0))
                : [];
    }
    catch (e) {
        console.warn('Error converting block to md', e);
    }
    if (result.content && aiEditable && blockLevel === 2) {
        // add a placeholder comment for the block level 2
        if (flavour === 'affine:database' || placeholder) {
            result.content = `<!-- block_id=${id} flavour=${flavour} placeholder -->\n`;
            result.children = [];
        }
        else {
            result.content = `<!-- block_id=${id} flavour=${flavour} -->\n${result.content}`;
        }
    }
    return result;
}
export const parsePageDoc = (ctx) => {
    // we assume that the first block is the page block
    const yBlocks = ctx.doc.getMap('blocks');
    const maybePageBlock = Object.entries(yBlocks.toJSON()).findLast(([_, b]) => b['sys:flavour'] === 'affine:page');
    // there are cases that the page is empty due to some weird issues
    if (!maybePageBlock) {
        return {
            title: '',
            md: '',
        };
    }
    else {
        const yPage = yBlocks.get(maybePageBlock[0]);
        const title = yPage.get('prop:title');
        const rootBlock = parseBlock(ctx, yPage, yBlocks, ctx.aiEditable);
        if (!rootBlock) {
            return {
                title: '',
                md: '',
            };
        }
        rootBlock.children = rootBlock.children.filter((block) => block.flavour === 'affine:note');
        const md = parseBlockToMd(rootBlock);
        return {
            title: title.toJSON(),
            parsedBlock: rootBlock,
            md,
        };
    }
};
//# sourceMappingURL=parser.js.map