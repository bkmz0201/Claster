import { IconPicker, uniReactRoot } from '@affine/component';
// Import the identifier for internal use
import {} from '@blocksuite/affine-shared/services';
import { Service } from '@toeverything/infra';
export { IconPickerServiceIdentifier } from '@blocksuite/affine-shared/services';
export class IconPickerService extends Service {
    constructor() {
        super(...arguments);
        this.iconPickerComponent = uniReactRoot.createUniComponent(IconPicker);
    }
}
//# sourceMappingURL=icon-picker.js.map