export declare class Node {
    id: number;
    children: Node[];
    open: string;
    close: string;
    text: string;
    _format: string;
    _parent: Node;
    constructor(data?: string[] | string);
    append(e: Node): void;
    render(): any;
    parent(): Node;
}
//# sourceMappingURL=node.d.ts.map