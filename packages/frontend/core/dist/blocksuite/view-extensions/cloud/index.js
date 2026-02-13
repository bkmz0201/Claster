import { AuthService, PublicUserService } from '@affine/core/modules/cloud';
import { MemberSearchService } from '@affine/core/modules/permissions';
import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { FrameworkProvider } from '@toeverything/infra';
import { z } from 'zod';
import { patchUserExtensions } from './user';
import { patchUserListExtensions } from './user-list';
const optionsSchema = z.object({
    framework: z.instanceof(FrameworkProvider).optional(),
    enableCloud: z.boolean().optional(),
});
export class CloudViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-view-cloud';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        const enableCloud = options?.enableCloud;
        const framework = options?.framework;
        if (!enableCloud || !framework) {
            return;
        }
        const memberSearchService = framework.get(MemberSearchService);
        const publicUserService = framework.get(PublicUserService);
        const authService = framework.get(AuthService);
        context.register([
            patchUserListExtensions(memberSearchService),
            patchUserExtensions(publicUserService, authService),
        ]);
    }
}
//# sourceMappingURL=index.js.map