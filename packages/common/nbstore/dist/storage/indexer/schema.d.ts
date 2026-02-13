import type { IndexFieldType } from './field-type';
export declare const IndexerSchema: {
    doc: {
        docId: "String";
        title: "FullText";
        summary: {
            type: "String";
            index: false;
        };
    };
    block: {
        docId: "String";
        blockId: "String";
        content: "FullText";
        flavour: "String";
        blob: "String";
        refDocId: "String";
        ref: {
            type: "String";
            index: false;
        };
        parentFlavour: "String";
        parentBlockId: "String";
        additional: {
            type: "String";
            index: false;
        };
        markdownPreview: {
            type: "String";
            index: false;
        };
    };
};
export type IndexerFieldSchema = IndexFieldType | {
    type: IndexFieldType;
    /**
     * If false, the field will not be indexed, and thus not searchable.
     *
     * default: true
     */
    index?: boolean;
    /**
     * If false, the field will not be stored, and not included in the search result.
     *
     * default: true
     */
    store?: boolean;
};
export type IndexerSchema = typeof IndexerSchema;
//# sourceMappingURL=schema.d.ts.map