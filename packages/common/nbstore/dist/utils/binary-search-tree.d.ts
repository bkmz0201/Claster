/**
 * Represents a node in the binary search tree.
 */
export declare class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    parent: TreeNode<T> | null;
    constructor(value: T);
    /**
     * Gets the value stored in this node.
     */
    getValue(): T;
}
/**
 * Binary Search Tree implementation using iterative (non-recursive) algorithms.
 */
export declare class BinarySearchTree<T> {
    root: TreeNode<T> | null;
    private size;
    private readonly compareFunction;
    /**
     * Creates a new binary search tree with a custom comparison function.
     *
     * @param compareFunction - Function that compares two elements.
     *   Should return negative if a < b, zero if a = b, positive if a > b.
     */
    constructor(compareFunction: (a: T, b: T) => number);
    /**
     * Inserts a value into the tree.
     *
     * @param value - The value to insert
     * @returns The newly created node
     */
    insert(value: T): TreeNode<T>;
    /**
     * Finds a node with the given value.
     *
     * @param value - The value to find
     * @returns The node containing the value, or null if not found
     */
    find(value: T): TreeNode<T> | null;
    /**
     * Removes a value from the tree.
     *
     * @param value - The value to remove
     * @returns True if the value was removed, false if it wasn't found
     */
    remove(value: T): boolean;
    /**
     * Removes a specific node from the tree.
     *
     * @param node - The node to remove
     */
    removeNode(node: TreeNode<T>): void;
    /**
     * Finds the node with the minimum value in the subtree rooted at the given node.
     *
     * @param subtreeRoot - The root of the subtree to search
     * @returns The node with the minimum value
     */
    private findMin;
    /**
     * Finds the node with the maximum value in the subtree rooted at the given node.
     *
     * @param subtreeRoot - The root of the subtree to search
     * @returns The node with the maximum value
     */
    private findMax;
    /**
     * Returns the node with the maximum value in the tree.
     *
     * @returns The node with the maximum value, or null if the tree is empty
     */
    max(): TreeNode<T> | null;
    /**
     * Returns the node with the minimum value in the tree.
     *
     * @returns The node with the minimum value, or null if the tree is empty
     */
    min(): TreeNode<T> | null;
    /**
     * Clears all nodes from the tree.
     */
    clear(): void;
    /**
     * Returns the number of nodes in the tree.
     *
     * @returns The number of nodes
     */
    count(): number;
}
//# sourceMappingURL=binary-search-tree.d.ts.map