import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SidebarIcon } from '@blocksuite/icons/rc';
import { CheckIcon, XIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { useMediaQuery } from './common';
import { useLeftPanel } from './panel/context';
export const Header = ({ title, endFix, }) => {
    const { togglePanel } = useLeftPanel();
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center px-6 gap-4 h-[56px]", children: [isSmallScreen ? (_jsx("div", { className: "h-7 w-7 p-1" })) : (_jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7 p-1 hover:bg-gray-200 cursor-pointer", onClick: togglePanel, children: _jsx(SidebarIcon, { width: 20, height: 20 }) })), _jsx(Separator, { orientation: "vertical", className: "h-5" }), _jsx("div", { className: "text-[15px] font-semibold", children: title }), endFix && _jsx("div", { className: "ml-auto", children: endFix })] }), _jsx(Separator, {})] }));
};
export const RightPanelHeader = ({ title, handleClose, handleConfirm, canSave, }) => {
    return (_jsxs("div", { children: [_jsxs("div", { className: " flex justify-between items-center h-[56px] px-6", children: [_jsx(Button, { type: "button", size: "icon", className: "w-7 h-7", variant: "ghost", onClick: handleClose, children: _jsx(XIcon, { size: 20 }) }), _jsx("span", { className: "text-base font-medium", children: title }), _jsx(Button, { type: "submit", size: "icon", className: "w-7 h-7", variant: "ghost", onClick: handleConfirm, disabled: !canSave, children: _jsx(CheckIcon, { size: 20 }) })] }), _jsx(Separator, {})] }));
};
//# sourceMappingURL=header.js.map