import { BinarySearchTree } from './binary-search-tree';
export declare class PriorityQueue {
    tree: BinarySearchTree<{
        id: string;
        priority: number;
    }>;
    priorityMap: Map<string, number>;
    push(id: string, priority?: number): void;
    pop(minimumPriority?: number): string | null;
    remove(id: string): boolean;
    has(id: string): boolean;
    clear(): void;
    setPriority(id: string, priority: number): void;
    get length(): () => number;
}
//# sourceMappingURL=priority-queue.d.ts.map