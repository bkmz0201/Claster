import { jsx as _jsx } from "react/jsx-runtime";
import { WorkbenchLink, WorkbenchService, } from '@affine/core/modules/workbench';
import { useLiveData, useService } from '@toeverything/infra';
import * as styles from './style.css';
const tabs = [
    {
        to: '/all',
        label: 'Docs',
    },
    {
        to: '/collection',
        label: 'Collections',
    },
    {
        to: '/tag',
        label: 'Tags',
    },
];
export const AllDocsTabs = () => {
    const workbench = useService(WorkbenchService).workbench;
    const location = useLiveData(workbench.location$);
    return (_jsx("ul", { className: styles.tabs, children: tabs.map(tab => {
            return (_jsx(WorkbenchLink, { "data-active": location.pathname === tab.to, replaceHistory: true, className: styles.tab, to: tab.to, children: tab.label }, tab.to));
        }) }));
};
//# sourceMappingURL=tabs.js.map