import { type MenuOptions } from '@blocksuite/affine/components/context-menu';
import type { DatabaseBlockModel } from '@blocksuite/affine/model';
import type { FrameworkProvider } from '@toeverything/infra';
export declare function createDatabaseOptionsConfig(framework: FrameworkProvider): {
    configure: (model: DatabaseBlockModel, options: MenuOptions) => MenuOptions;
};
//# sourceMappingURL=database.d.ts.map