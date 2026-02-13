import { createIdentifier } from '@blocksuite/global/di';
export const VirtualKeyboardProvider = createIdentifier('VirtualKeyboardProvider');
export function isVirtualKeyboardProviderWithAction(provider) {
    return 'show' in provider && 'hide' in provider;
}
//# sourceMappingURL=virtual-keyboard-service.js.map