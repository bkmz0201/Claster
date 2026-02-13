import type { DataStructROTransaction, DataStructRWTransaction } from './data-struct';
import { Match } from './match';
export interface InvertedIndex {
    fieldKey: string;
    match(trx: DataStructROTransaction, term: string): Promise<Match>;
    all(trx: DataStructROTransaction): Promise<Match>;
    insert(trx: DataStructRWTransaction, id: number, terms: string[]): Promise<void>;
}
export declare class StringInvertedIndex implements InvertedIndex {
    readonly table: string;
    readonly fieldKey: string;
    constructor(table: string, fieldKey: string);
    match(trx: DataStructROTransaction, term: string): Promise<Match>;
    all(trx: DataStructROTransaction): Promise<Match>;
    insert(trx: DataStructRWTransaction, id: number, terms: string[]): Promise<void>;
}
export declare class IntegerInvertedIndex implements InvertedIndex {
    readonly table: string;
    readonly fieldKey: string;
    constructor(table: string, fieldKey: string);
    match(trx: DataStructROTransaction, term: string): Promise<Match>;
    all(trx: DataStructROTransaction): Promise<Match>;
    insert(trx: DataStructRWTransaction, id: number, terms: string[]): Promise<void>;
}
export declare class BooleanInvertedIndex implements InvertedIndex {
    readonly table: string;
    readonly fieldKey: string;
    constructor(table: string, fieldKey: string);
    all(trx: DataStructROTransaction): Promise<Match>;
    match(trx: DataStructROTransaction, term: string): Promise<Match>;
    insert(trx: DataStructRWTransaction, id: number, terms: string[]): Promise<void>;
}
export declare class FullTextInvertedIndex implements InvertedIndex {
    readonly table: string;
    readonly fieldKey: string;
    constructor(table: string, fieldKey: string);
    match(trx: DataStructROTransaction, term: string): Promise<Match>;
    all(trx: DataStructROTransaction): Promise<Match>;
    insert(trx: DataStructRWTransaction, id: number, terms: string[]): Promise<void>;
}
export declare class InvertedIndexKey {
    readonly field: Uint8Array;
    readonly value: Uint8Array;
    readonly gap: Uint8Array;
    constructor(field: Uint8Array, value: Uint8Array, gap?: Uint8Array);
    asString(): string;
    asInt64(): bigint;
    add1(): InvertedIndexKey;
    static forPrefix(field: string): InvertedIndexKey;
    static forString(field: string, value: string): InvertedIndexKey;
    static forBoolean(field: string, value: boolean): InvertedIndexKey;
    static forInt64(field: string, value: bigint): InvertedIndexKey;
    buffer(): ArrayBuffer;
    static fromBuffer(buffer: ArrayBuffer): InvertedIndexKey;
}
//# sourceMappingURL=inverted-index.d.ts.map