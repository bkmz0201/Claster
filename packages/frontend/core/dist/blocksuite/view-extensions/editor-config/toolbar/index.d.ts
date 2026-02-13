import type { EditorSettingExt } from '@affine/core/modules/editor-setting/entities/editor-setting';
import { type MenuContext, type MenuItemGroup } from '@blocksuite/affine/components/toolbar';
import type { ExtensionType } from '@blocksuite/affine/store';
import type { FrameworkProvider } from '@toeverything/infra';
export declare function createToolbarMoreMenuConfig(framework: FrameworkProvider): {
    configure: <T extends MenuContext>(groups: MenuItemGroup<T>[]) => MenuItemGroup<T>[];
};
export declare const createCustomToolbarExtension: (settings: EditorSettingExt, baseUrl: string) => ExtensionType[];
//# sourceMappingURL=index.d.ts.map