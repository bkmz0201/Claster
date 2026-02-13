export type Variable = {
    id: string;
    name: string;
    variableName: string;
    light: string;
    dark: string;
    ancestors: string[];
};
export interface TreeNode {
    id: string;
    label: string;
    parentId?: string;
    children?: TreeNode[];
    variables?: Variable[];
}
export interface ThemeInfo {
    tree: TreeNode[];
    nodeMap: Map<string, TreeNode>;
    variableMap: Map<string, Variable>;
}
export declare const affineThemes: {
    v1: ThemeInfo;
    v2: ThemeInfo;
};
//# sourceMappingURL=resource.d.ts.map