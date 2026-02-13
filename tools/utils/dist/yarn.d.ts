import type { YarnWorkspaceItem } from './types';
import type { PackageName } from './workspace.gen';
export declare const PackageList: {
    location: string;
    name: string;
    workspaceDependencies: string[];
}[];
export type { PackageName };
export declare const yarnList: () => YarnWorkspaceItem[];
//# sourceMappingURL=yarn.d.ts.map