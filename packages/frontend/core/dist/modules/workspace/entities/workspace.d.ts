import type { FeatureFlagService } from '@affine/core/modules/feature-flag';
import type { Workspace as WorkspaceInterface } from '@blocksuite/affine/store';
import { Entity, LiveData } from '@toeverything/infra';
import { Doc as YDoc } from 'yjs';
import { DocsService } from '../../doc';
import type { WorkspaceScope } from '../scopes/workspace';
export declare class Workspace extends Entity {
    readonly scope: WorkspaceScope;
    readonly featureFlagService: FeatureFlagService;
    constructor(scope: WorkspaceScope, featureFlagService: FeatureFlagService);
    readonly id: string;
    readonly openOptions: import("..").WorkspaceOpenOptions;
    readonly meta: import("..").WorkspaceMetadata;
    readonly flavour: string;
    readonly rootYDoc: YDoc;
    _docCollection: WorkspaceInterface | null;
    get docCollection(): WorkspaceInterface;
    get docs(): DocsService;
    get canGracefulStop(): boolean;
    get engine(): import("./engine").WorkspaceEngine;
    name$: LiveData<string | undefined>;
    avatar$: LiveData<string | undefined>;
    setAvatar(avatar: string): void;
    setName(name: string): void;
    dispose(): void;
}
//# sourceMappingURL=workspace.d.ts.map