import type { useI18n } from '@affine/i18n';
import type { createStore } from 'jotai';
import type { useTheme } from 'next-themes';
import type { EditorSettingService } from '../modules/editor-setting';
export declare function registerAffineSettingsCommands({ t, store, theme, editorSettingService, }: {
    t: ReturnType<typeof useI18n>;
    store: ReturnType<typeof createStore>;
    theme: ReturnType<typeof useTheme>;
    editorSettingService: EditorSettingService;
}): () => void;
//# sourceMappingURL=affine-settings.d.ts.map