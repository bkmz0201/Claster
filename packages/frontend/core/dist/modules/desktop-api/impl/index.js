/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { apis, appInfo, events, sharedStorage } from '@affine/electron-api';
import { Service } from '@toeverything/infra';
export class ElectronApiImpl extends Service {
    constructor() {
        super();
        this.handler = apis;
        this.events = events;
        this.sharedStorage = sharedStorage;
        this.appInfo = appInfo;
        if (!apis || !events || !sharedStorage || !appInfo) {
            throw new Error('Failed to initialize DesktopApiImpl');
        }
    }
}
//# sourceMappingURL=index.js.map