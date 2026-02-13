import { useEffect } from 'react';
import { useSignalValue } from '../../../modules/doc-info/utils';
export const useMemberInfo = (id, userService) => {
    useEffect(() => {
        userService?.revalidateUserInfo(id);
    }, [id, userService]);
    return useSignalValue(userService?.userInfo$(id));
};
//# sourceMappingURL=use-member-info.js.map