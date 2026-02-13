import { jsx as _jsx } from "react/jsx-runtime";
import * as TabsGroup from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { forwardRef } from 'react';
import * as styles from './tabs.css';
export const TabsRoot = forwardRef(({ children, className, ...props }, ref) => {
    return (_jsx(TabsGroup.Root, { ...props, ref: ref, className: clsx(className, styles.tabsRoot), children: children }));
});
TabsRoot.displayName = 'TabsRoot';
export const TabsList = forwardRef(({ children, className, ...props }, ref) => {
    return (_jsx(TabsGroup.List, { ...props, ref: ref, className: clsx(className, styles.tabsList), children: children }));
});
TabsList.displayName = 'TabsList';
export const TabsTrigger = forwardRef(({ children, className, ...props }, ref) => {
    return (_jsx(TabsGroup.Trigger, { ...props, ref: ref, className: clsx(className, styles.tabsTrigger), children: children }));
});
TabsTrigger.displayName = 'TabsTrigger';
export const TabsContent = forwardRef(({ children, className, ...props }, ref) => {
    return (_jsx(TabsGroup.Content, { ...props, ref: ref, className: clsx(className, styles.tabsContent), children: children }));
});
TabsContent.displayName = 'TabsContent';
export const Tabs = {
    Root: TabsRoot,
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
};
//# sourceMappingURL=tabs.js.map