import { ParagraphBlockSchema } from '@blocksuite/affine-model';
import { BlockMarkdownAdapterExtension, IN_PARAGRAPH_NODE_CONTEXT_KEY, isCalloutNode, } from '@blocksuite/affine-shared/adapters';
import { nanoid } from '@blocksuite/store';
const PARAGRAPH_MDAST_TYPE = new Set(['paragraph', 'heading', 'blockquote']);
const isParagraphMDASTType = (node) => PARAGRAPH_MDAST_TYPE.has(node.type);
export const paragraphBlockMarkdownAdapterMatcher = {
    flavour: ParagraphBlockSchema.model.flavour,
    toMatch: o => isParagraphMDASTType(o.node) && !isCalloutNode(o.node),
    fromMatch: o => o.node.flavour === ParagraphBlockSchema.model.flavour,
    toBlockSnapshot: {
        enter: (o, context) => {
            const { walkerContext, deltaConverter } = context;
            switch (o.node.type) {
                case 'paragraph': {
                    walkerContext.setGlobalContext(IN_PARAGRAPH_NODE_CONTEXT_KEY, true);
                    walkerContext
                        .openNode({
                        type: 'block',
                        id: nanoid(),
                        flavour: 'affine:paragraph',
                        props: {
                            type: 'text',
                            text: {
                                '$blocksuite:internal:text$': true,
                                delta: deltaConverter.astToDelta(o.node),
                            },
                        },
                        children: [],
                    }, 'children')
                        .closeNode();
                    break;
                }
                case 'heading': {
                    const isCollapsed = !!o.node.data?.collapsed;
                    walkerContext
                        .openNode({
                        type: 'block',
                        id: nanoid(),
                        flavour: 'affine:paragraph',
                        props: {
                            type: `h${o.node.depth}`,
                            collapsed: isCollapsed,
                            text: {
                                '$blocksuite:internal:text$': true,
                                delta: deltaConverter.astToDelta(o.node),
                            },
                        },
                        children: [],
                    }, 'children')
                        .closeNode();
                    break;
                }
                case 'blockquote': {
                    if (isCalloutNode(o.node)) {
                        return;
                    }
                    walkerContext
                        .openNode({
                        type: 'block',
                        id: nanoid(),
                        flavour: 'affine:paragraph',
                        props: {
                            type: 'quote',
                            text: {
                                '$blocksuite:internal:text$': true,
                                delta: deltaConverter.astToDelta(o.node),
                            },
                        },
                        children: [],
                    }, 'children')
                        .closeNode();
                    walkerContext.skipAllChildren();
                    break;
                }
            }
        },
        leave: (o, context) => {
            if (o.node.type === 'paragraph') {
                const { walkerContext } = context;
                walkerContext.setGlobalContext(IN_PARAGRAPH_NODE_CONTEXT_KEY, false);
            }
        },
    },
    fromBlockSnapshot: {
        enter: (o, context) => {
            const { walkerContext, deltaConverter } = context;
            const paragraphDepth = (walkerContext.getGlobalContext('affine:paragraph:depth') ?? 0);
            const text = (o.node.props.text ?? { delta: [] });
            switch (o.node.props.type) {
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6': {
                    walkerContext
                        .openNode({
                        type: 'heading',
                        depth: parseInt(o.node.props.type[1]),
                        children: deltaConverter.deltaToAST(text.delta, paragraphDepth),
                    }, 'children')
                        .closeNode();
                    break;
                }
                case 'text': {
                    walkerContext
                        .openNode({
                        type: 'paragraph',
                        children: deltaConverter.deltaToAST(text.delta, paragraphDepth),
                    }, 'children')
                        .closeNode();
                    break;
                }
                case 'quote': {
                    walkerContext
                        .openNode({
                        type: 'blockquote',
                        children: [],
                    }, 'children')
                        .openNode({
                        type: 'paragraph',
                        children: deltaConverter.deltaToAST(text.delta),
                    }, 'children')
                        .closeNode()
                        .closeNode();
                    break;
                }
            }
            walkerContext.setGlobalContext('affine:paragraph:depth', paragraphDepth + 1);
        },
        leave: (_, context) => {
            const { walkerContext } = context;
            walkerContext.setGlobalContext('affine:paragraph:depth', walkerContext.getGlobalContext('affine:paragraph:depth') -
                1);
        },
    },
};
export const ParagraphBlockMarkdownAdapterExtension = BlockMarkdownAdapterExtension(paragraphBlockMarkdownAdapterMatcher);
//# sourceMappingURL=markdown.js.map