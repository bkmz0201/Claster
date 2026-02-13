import { EditorHostKey, propertyType, t, } from '@blocksuite/affine/blocks/database';
import { UserListProvider, UserProvider, } from '@blocksuite/affine/shared/services';
import zod from 'zod';
export const memberColumnType = propertyType('member');
export const MemberItemSchema = zod.string();
const MemberCellRawValueTypeSchema = zod.array(MemberItemSchema);
export const MemberCellJsonValueTypeSchema = zod.array(zod.string());
export const memberPropertyModelConfig = memberColumnType.modelConfig({
    name: 'Member',
    propertyData: {
        schema: zod.object({}),
        default: () => ({}),
    },
    rawValue: {
        schema: MemberCellRawValueTypeSchema,
        default: () => [],
        fromString: () => ({
            value: [],
        }),
        toString: ({ value }) => value.join(',') ?? '',
        toJson: ({ value }) => value,
    },
    jsonValue: {
        schema: MemberCellJsonValueTypeSchema,
        type: ({ dataSource }) => {
            const host = dataSource.serviceGet(EditorHostKey);
            const userService = host?.std.getOptional(UserProvider);
            const userListService = host?.std.getOptional(UserListProvider);
            return t.array.instance(t.user.instance(userListService && userService
                ? {
                    userService: userService,
                    userListService: userListService,
                }
                : undefined));
        },
        isEmpty: ({ value }) => value.length === 0,
    },
});
//# sourceMappingURL=define.js.map