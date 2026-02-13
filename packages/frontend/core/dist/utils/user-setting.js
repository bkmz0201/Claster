import { nanoid } from 'nanoid';
import { Doc as YDoc } from 'yjs';
export class UserSetting {
    constructor(docCollection, userId) {
        this.docCollection = docCollection;
        this.userId = userId;
    }
    get setting() {
        const rootDoc = this.docCollection.doc;
        const settingMap = rootDoc.getMap('settings');
        if (!settingMap.has(this.userId)) {
            settingMap.set(this.userId, new YDoc({
                guid: nanoid(),
            }));
        }
        return settingMap.get(this.userId);
    }
    get loaded() {
        if (!this.setting.isLoaded) {
            this.setting.load();
        }
        return this.setting.whenLoaded;
    }
}
export const getUserSetting = (docCollection, userId) => {
    return new UserSetting(docCollection, userId);
};
//# sourceMappingURL=user-setting.js.map