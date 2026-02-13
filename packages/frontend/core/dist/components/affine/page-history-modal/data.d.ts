import type { ListHistoryQuery } from '@affine/graphql';
import type { Workspace } from '@blocksuite/affine/store';
import { Doc as YDoc } from 'yjs';
type DocHistory = ListHistoryQuery['workspace']['histories'][number];
export declare const useDocSnapshotList: (workspaceId: string, pageDocId: string) => readonly [{
    __typename?: "DocHistoryType";
    id: string;
    timestamp: string;
    editor: {
        __typename?: "EditorType";
        name: string;
        avatarUrl: string | null;
    } | null;
}[], false | (() => void), false];
export declare const usePageHistory: (workspaceId: string, pageDocId: string, ts?: string) => ArrayBuffer | undefined;
export declare const useSnapshotPage: (docCollection: Workspace, pageDocId: string, ts?: string) => import("@blocksuite/store").Store | undefined;
export declare const historyListGroupByDay: (histories: DocHistory[]) => [string, {
    __typename?: "DocHistoryType";
    id: string;
    timestamp: string;
    editor: {
        __typename?: "EditorType";
        name: string;
        avatarUrl: string | null;
    } | null;
}[]][];
export declare function revertUpdate(doc: YDoc, snapshotUpdate: Uint8Array, getMetadata: (key: string) => 'Text' | 'Map' | 'Array'): void;
export declare const useRestorePage: (docCollection: Workspace, pageId: string) => {
    onRestore: (version: string, update: Uint8Array) => Promise<void>;
    isMutating: boolean;
};
export {};
//# sourceMappingURL=data.d.ts.map