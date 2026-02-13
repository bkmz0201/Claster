import type { IndexerSchema } from './schema';
export declare class IndexerDocument<S extends keyof IndexerSchema = keyof IndexerSchema> {
    readonly id: string;
    constructor(id: string);
    fields: Map<keyof {
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
    }[S], string[]>;
    insert<F extends keyof IndexerSchema[S]>(field: F, value: string | string[]): void;
    get<F extends keyof IndexerSchema[S]>(field: F): string[] | string | undefined;
    static from<S extends keyof IndexerSchema>(id: string, map: Partial<Record<keyof IndexerSchema[S], string | string[]>> | Map<keyof IndexerSchema[S], string | string[]>): IndexerDocument<S>;
}
//# sourceMappingURL=document.d.ts.map