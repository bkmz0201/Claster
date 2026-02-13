import { IconPickerServiceIdentifier } from '@blocksuite/affine/shared/services';
import {} from '@blocksuite/affine/store';
import { IconPickerService } from '../../../modules/icon-picker/services/icon-picker';
/**
 * Patch the icon picker service to make it available in BlockSuite
 * @param framework
 * @returns
 */
export function patchIconPickerService(framework) {
    return {
        setup: (di) => {
            di.override(IconPickerServiceIdentifier, () => {
                return framework.get(IconPickerService);
            });
        },
    };
}
//# sourceMappingURL=icon-picker-service.js.map