import { Node } from './utils/node';
export interface InlineReference {
    type: 'LinkedPage';
    pageId: string;
    title?: string;
    params?: {
        mode: 'doc' | 'edgeless';
    };
}
export interface ConverterOptions {
    convertInlineReferenceLink?: (reference: InlineReference) => {
        title: string;
        link: string;
    };
}
export declare function getConverters(opts?: ConverterOptions): {
    embed: {
        image: (src: any) => void;
        thematic_break: () => void;
    };
    inline: {
        italic: () => string[];
        bold: () => string[];
        link: (url: any) => string[];
        reference: (reference: InlineReference) => string[];
        strike: () => string[];
        code: () => string[];
    };
    block: {
        header: ({ header }: {
            header: any;
        }) => void;
        blockquote: () => void;
        list: {
            group: () => Node;
            line: (attrs: any, group: any) => void;
        };
    };
};
//# sourceMappingURL=delta-converters.d.ts.map