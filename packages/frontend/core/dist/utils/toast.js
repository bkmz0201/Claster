import { toast as basicToast } from '@affine/component';
export const toast = (message, options) => {
    const modal = document.querySelector('[role=presentation]');
    if (modal && !(modal instanceof HTMLDivElement)) {
        throw new Error('modal should be div');
    }
    return basicToast(message, {
        portal: modal || document.body,
        ...options,
    });
};
//# sourceMappingURL=toast.js.map