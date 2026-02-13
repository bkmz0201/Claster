import type { BaseParsedBlock, ParsedBlock, ParsedDoc, ParserContext, YBlock, YBlocks } from './types';
export declare const parseBlockToMd: (block: BaseParsedBlock, padding?: string) => string;
export declare function parseBlock(context: ParserContext, yBlock: YBlock | undefined, yBlocks: YBlocks, // all blocks
aiEditable?: boolean, blockLevel?: number): ParsedBlock | null;
export declare const parsePageDoc: (ctx: ParserContext) => ParsedDoc;
//# sourceMappingURL=parser.d.ts.map