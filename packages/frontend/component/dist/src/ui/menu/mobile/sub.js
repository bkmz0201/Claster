import { jsx as _jsx } from "react/jsx-runtime";
import { ArrowRightSmallPlusIcon } from '@blocksuite/icons/rc';
import { Slot } from '@radix-ui/react-slot';
import { useCallback, useEffect, useId, useMemo } from 'react';
import { useMenuItem } from '../use-menu-item';
import { useMobileSubMenuHelper } from './context';
export const MobileMenuSub = ({ title, children: propsChildren, items, triggerOptions, subContentOptions: contentOptions = {}, }) => {
    const { className, children, otherProps: { onClick, ...otherTriggerOptions }, } = useMenuItem({
        children: propsChildren,
        suffixIcon: _jsx(ArrowRightSmallPlusIcon, {}),
        ...triggerOptions,
    });
    return (_jsx(MobileMenuSubRaw, { onClick: onClick, items: items, subContentOptions: contentOptions, title: title, children: _jsx("div", { role: "menuitem", className: className, ...otherTriggerOptions, children: children }) }));
};
export const MobileMenuSubRaw = ({ title, onClick, children, items, subOptions, subContentOptions: contentOptions = {}, }) => {
    const id = useId();
    const { addSubMenu } = useMobileSubMenuHelper();
    const subMenuContent = useMemo(() => ({ items, contentOptions, options: subOptions, title, id }), [items, contentOptions, subOptions, title, id]);
    const doAddSubMenu = useCallback(() => {
        addSubMenu(subMenuContent);
    }, [addSubMenu, subMenuContent]);
    const onItemClick = useCallback((e) => {
        onClick?.(e);
        doAddSubMenu();
    }, [doAddSubMenu, onClick]);
    useEffect(() => {
        if (subOptions?.open) {
            doAddSubMenu();
        }
    }, [doAddSubMenu, subOptions]);
    return _jsx(Slot, { onClick: onItemClick, children: children });
};
//# sourceMappingURL=sub.js.map