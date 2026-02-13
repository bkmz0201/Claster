import type { DisplayProperties, PageDisplayProperties, PageGroupByType } from './types';
export declare const displayPropertiesAtom: import("jotai").WritableAtom<{
    [workspaceId: string]: DisplayProperties;
}, [{
    [workspaceId: string]: DisplayProperties;
} | typeof import("jotai/utils").RESET | ((prev: {
    [workspaceId: string]: DisplayProperties;
}) => {
    [workspaceId: string]: DisplayProperties;
} | typeof import("jotai/utils").RESET)], void>;
export declare const useAllDocDisplayProperties: () => [DisplayProperties, (key: keyof DisplayProperties, value: PageGroupByType | PageDisplayProperties) => void];
//# sourceMappingURL=use-all-doc-display-properties.d.ts.map