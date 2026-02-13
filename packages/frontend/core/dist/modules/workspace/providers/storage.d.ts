import { type Memento } from '@toeverything/infra';
export interface WorkspaceLocalState extends Memento {
}
export interface WorkspaceLocalCache extends Memento {
}
export declare const WorkspaceLocalState: import("@toeverything/infra").Identifier<WorkspaceLocalState> & ((variant: string) => import("@toeverything/infra").Identifier<WorkspaceLocalState>);
export declare const WorkspaceLocalCache: import("@toeverything/infra").Identifier<WorkspaceLocalCache> & ((variant: string) => import("@toeverything/infra").Identifier<WorkspaceLocalCache>);
//# sourceMappingURL=storage.d.ts.map