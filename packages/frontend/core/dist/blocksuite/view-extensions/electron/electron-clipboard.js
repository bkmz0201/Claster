import { DesktopApiService } from '@affine/core/modules/desktop-api';
import { NativeClipboardExtension } from '@blocksuite/affine/shared/services';
export function patchForClipboardInElectron(framework) {
    const desktopApi = framework.get(DesktopApiService);
    return NativeClipboardExtension({
        copyAsPNG: desktopApi.handler.clipboard.copyAsPNG,
    });
}
//# sourceMappingURL=electron-clipboard.js.map