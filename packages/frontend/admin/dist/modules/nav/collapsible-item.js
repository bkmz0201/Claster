import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { buttonVariants } from '../../components/ui/button';
import { cn } from '../../utils';
export const NormalSubItem = ({ module, title, changeModule, }) => {
    const handleClick = useCallback(() => {
        changeModule?.(module);
    }, [changeModule, module]);
    return (_jsx("div", { className: "w-full flex", children: _jsx(NavLink, { to: `/admin/settings/${module}`, onClick: handleClick, className: ({ isActive }) => {
                return cn(buttonVariants({
                    variant: 'ghost',
                    className: `ml-8 px-2 w-full justify-start ${isActive ? 'bg-zinc-100' : ''}`,
                }));
            }, children: title }) }));
};
//# sourceMappingURL=collapsible-item.js.map