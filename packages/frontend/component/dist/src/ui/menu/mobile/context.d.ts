import { type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { MenuSubProps } from '../menu.types';
export type SubMenuContent = {
    /**
     * Customize submenu's title
     * @default "Back"
     */
    title?: string;
    items: ReactNode;
    options?: MenuSubProps['subOptions'];
    contentOptions?: MenuSubProps['subContentOptions'];
    id: string;
};
export type MobileMenuContextValue = {
    subMenus: Array<SubMenuContent>;
    setSubMenus: Dispatch<SetStateAction<Array<SubMenuContent>>>;
    setOpen?: (v: boolean) => void;
};
export declare const MobileMenuContext: import("react").Context<MobileMenuContextValue>;
export declare const useMobileSubMenuHelper: (contextValue?: MobileMenuContextValue) => {
    addSubMenu: (subMenu: SubMenuContent) => void;
    removeSubMenu: (id: string) => void;
    removeAllSubMenus: () => void;
};
//# sourceMappingURL=context.d.ts.map