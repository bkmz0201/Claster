import type { Workspace } from '@blocksuite/affine/store';
import { Doc as YDoc } from 'yjs';
export declare class UserSetting {
    private readonly docCollection;
    private readonly userId;
    constructor(docCollection: Workspace, userId: string);
    get setting(): YDoc;
    get loaded(): Promise<void>;
}
export declare const getUserSetting: (docCollection: Workspace, userId: string) => UserSetting;
//# sourceMappingURL=user-setting.d.ts.map