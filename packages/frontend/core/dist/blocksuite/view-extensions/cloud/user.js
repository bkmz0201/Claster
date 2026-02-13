import { UserFriendlyError } from '@affine/error';
import { UserServiceExtension, } from '@blocksuite/affine/shared/services';
export function patchUserExtensions(publicUserService, authService) {
    return UserServiceExtension({
        // eslint-disable-next-line rxjs/finnish
        currentUserInfo$: authService.session.account$.map(account => {
            if (!account) {
                return null;
            }
            return {
                id: account.id,
                name: account.label,
                avatar: account.avatar,
                removed: false,
            };
        }).signal,
        // eslint-disable-next-line rxjs/finnish
        userInfo$(id) {
            return publicUserService.publicUser$(id).signal;
        },
        // eslint-disable-next-line rxjs/finnish
        isLoading$(id) {
            return publicUserService.isLoading$(id).signal;
        },
        // eslint-disable-next-line rxjs/finnish
        error$(id) {
            return publicUserService.error$(id).selector(error => {
                if (error) {
                    return UserFriendlyError.fromAny(error).name;
                }
                else {
                    return null;
                }
            }).signal;
        },
        revalidateUserInfo(id) {
            publicUserService.revalidate(id);
        },
    });
}
//# sourceMappingURL=user.js.map