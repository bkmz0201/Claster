import type { useI18n } from '@affine/i18n';
import type { usePageHelper } from '../blocksuite/block-suite-page-list/utils';
import type { GlobalDialogService } from '../modules/dialogs';
export declare function registerAffineCreationCommands({ pageHelper, t, globalDialogService, }: {
    t: ReturnType<typeof useI18n>;
    pageHelper: ReturnType<typeof usePageHelper>;
    globalDialogService: GlobalDialogService;
}): () => void;
//# sourceMappingURL=affine-creation.d.ts.map