import { type IconPickerService as IIconPickerService } from '@blocksuite/affine-shared/services';
import { Service } from '@toeverything/infra';
export type { IconData, IconPickerService as IIconPickerService, } from '@blocksuite/affine-shared/services';
export { IconPickerServiceIdentifier } from '@blocksuite/affine-shared/services';
export declare class IconPickerService extends Service implements IIconPickerService {
    readonly iconPickerComponent: import("@blocksuite/affine-shared/types").UniComponent<Omit<import("react").HTMLAttributes<HTMLDivElement>, "onSelect"> & {
        onSelect?: (data?: import("@affine/component").IconData) => void;
    }, {}>;
}
//# sourceMappingURL=icon-picker.d.ts.map