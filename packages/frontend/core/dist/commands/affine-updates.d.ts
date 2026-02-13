import type { useI18n } from '@affine/i18n';
import type { createStore } from 'jotai';
export declare function registerAffineUpdatesCommands({ t, store, quitAndInstall, }: {
    t: ReturnType<typeof useI18n>;
    store: ReturnType<typeof createStore>;
    quitAndInstall: () => Promise<void>;
}): () => void;
//# sourceMappingURL=affine-updates.d.ts.map