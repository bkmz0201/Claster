import { createCustomToolbarExtension, createToolbarMoreMenuConfig, } from '@affine/core/blocksuite/view-extensions/editor-config/toolbar';
import { WorkspaceServerService } from '@affine/core/modules/cloud';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { ToolbarMoreMenuConfigExtension } from '@blocksuite/affine/components/toolbar';
import { EditorSettingExtension } from '@blocksuite/affine/shared/services';
export function getEditorConfigExtension(framework) {
    const editorSettingService = framework.get(EditorSettingService);
    const workspaceServerService = framework.get(WorkspaceServerService);
    const baseUrl = workspaceServerService.server?.baseUrl ?? location.origin;
    return [
        EditorSettingExtension({
            // eslint-disable-next-line rxjs/finnish
            setting$: editorSettingService.editorSetting.settingSignal,
            set: (k, v) => editorSettingService.editorSetting.set(k, v),
        }),
        ToolbarMoreMenuConfigExtension(createToolbarMoreMenuConfig(framework)),
        createCustomToolbarExtension(editorSettingService.editorSetting, baseUrl),
    ].flat();
}
//# sourceMappingURL=get-config.js.map