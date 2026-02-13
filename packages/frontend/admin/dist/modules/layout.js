import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResizablePanel, ResizablePanelGroup, } from '@affine/admin/components/ui/resizable';
import { Separator } from '@affine/admin/components/ui/separator';
import { TooltipProvider } from '@affine/admin/components/ui/tooltip';
import { cn } from '@affine/admin/utils';
import { cssVarV2 } from '@toeverything/theme/v2';
import { AlignJustifyIcon } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from '../components/ui/sheet';
import { Logo } from './accounts/components/logo';
import { useMediaQuery } from './common';
import { NavContext } from './nav/context';
import { Nav } from './nav/nav';
import { PanelContext, useRightPanel, } from './panel/context';
export function Layout({ children }) {
    const [rightPanelContent, setRightPanelContent] = useState(null);
    const [leftPanelContent, setLeftPanelContent] = useState(null);
    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);
    const rightPanelRef = useRef(null);
    const leftPanelRef = useRef(null);
    const [activeTab, setActiveTab] = useState('');
    const [activeSubTab, setActiveSubTab] = useState('server');
    const [currentModule, setCurrentModule] = useState('server');
    const handleLeftExpand = useCallback(() => {
        if (leftPanelRef.current?.getSize() === 0) {
            leftPanelRef.current?.resize(30);
        }
        setLeftOpen(true);
    }, [leftPanelRef]);
    const handleLeftCollapse = useCallback(() => {
        if (leftPanelRef.current?.getSize() !== 0) {
            leftPanelRef.current?.resize(0);
        }
        setLeftOpen(false);
    }, [leftPanelRef]);
    const openLeftPanel = useCallback(() => {
        handleLeftExpand();
        leftPanelRef.current?.expand();
        setLeftOpen(true);
    }, [handleLeftExpand]);
    const closeLeftPanel = useCallback(() => {
        handleLeftCollapse();
        leftPanelRef.current?.collapse();
        setLeftOpen(false);
    }, [handleLeftCollapse]);
    const toggleLeftPanel = useCallback(() => leftPanelRef.current?.isCollapsed() ? openLeftPanel() : closeLeftPanel(), [openLeftPanel, closeLeftPanel]);
    const handleRightExpand = useCallback(() => {
        if (rightPanelRef.current?.getSize() === 0) {
            rightPanelRef.current?.resize(30);
        }
        setRightOpen(true);
    }, [rightPanelRef]);
    const handleRightCollapse = useCallback(() => {
        if (rightPanelRef.current?.getSize() !== 0) {
            rightPanelRef.current?.resize(0);
        }
        setRightOpen(false);
    }, [rightPanelRef]);
    const openRightPanel = useCallback(() => {
        handleRightExpand();
        rightPanelRef.current?.expand();
        setRightOpen(true);
    }, [handleRightExpand]);
    const closeRightPanel = useCallback(() => {
        handleRightCollapse();
        rightPanelRef.current?.collapse();
        setRightOpen(false);
    }, [handleRightCollapse]);
    const toggleRightPanel = useCallback(() => rightPanelRef.current?.isCollapsed()
        ? openRightPanel()
        : closeRightPanel(), [closeRightPanel, openRightPanel]);
    return (_jsx(PanelContext.Provider, { value: {
            leftPanel: {
                isOpen: leftOpen,
                panelContent: leftPanelContent,
                setPanelContent: setLeftPanelContent,
                togglePanel: toggleLeftPanel,
                openPanel: openLeftPanel,
                closePanel: closeLeftPanel,
            },
            rightPanel: {
                isOpen: rightOpen,
                panelContent: rightPanelContent,
                setPanelContent: setRightPanelContent,
                togglePanel: toggleRightPanel,
                openPanel: openRightPanel,
                closePanel: closeRightPanel,
            },
        }, children: _jsx(NavContext.Provider, { value: {
                activeTab,
                activeSubTab,
                currentModule,
                setActiveTab,
                setActiveSubTab,
                setCurrentModule,
            }, children: _jsx(TooltipProvider, { delayDuration: 0, children: _jsx("div", { className: "flex", children: _jsxs(ResizablePanelGroup, { direction: "horizontal", children: [_jsx(LeftPanel, { panelRef: leftPanelRef, onExpand: handleLeftExpand, onCollapse: handleLeftCollapse }), _jsx(ResizablePanel, { id: "1", order: 1, minSize: 50, defaultSize: 50, children: children }), _jsx(RightPanel, { panelRef: rightPanelRef, onExpand: handleRightExpand, onCollapse: handleRightCollapse })] }) }) }) }) }));
}
export const LeftPanel = ({ panelRef, onExpand, onCollapse, }) => {
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    const isCollapsed = panelRef.current?.isCollapsed();
    if (isSmallScreen) {
        return (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "fixed  top-5 left-6 p-0 h-5 w-5", children: _jsx(AlignJustifyIcon, { size: 20 }) }) }), _jsxs(SheetHeader, { className: "hidden", children: [_jsx(SheetTitle, { children: "AFFiNE" }), _jsx(SheetDescription, { children: "Admin panel for managing accounts, AI, config, and settings" })] }), _jsx(SheetContent, { side: "left", className: "p-0", withoutCloseButton: true, children: _jsxs("div", { className: "flex flex-col w-full h-full", children: [_jsxs("div", { className: cn('flex h-[52px] items-center gap-2 px-4 text-base font-medium'), children: [_jsx(Logo, {}), "AFFiNE"] }), _jsx(Separator, {}), _jsx(Nav, {})] }) })] }));
    }
    return (_jsx(ResizablePanel, { id: "0", order: 0, ref: panelRef, defaultSize: 15, maxSize: 15, minSize: 15, collapsible: true, collapsedSize: 2, onExpand: onExpand, onCollapse: onCollapse, className: cn(isCollapsed ? 'min-w-[57px] max-w-[57px]' : 'min-w-56 max-w-56', 'border-r  h-dvh'), style: { overflow: 'visible' }, children: _jsxs("div", { className: "flex flex-col max-w-56 h-full ", style: {
                backgroundColor: cssVarV2('selfhost/layer/background/sidebarBg/sidebarBg'),
            }, children: [_jsxs("div", { className: cn('flex h-[56px] items-center px-4 text-base font-medium', isCollapsed && 'justify-center px-2'), children: [_jsx("span", { className: cn('flex items-center p-0.5 mr-2', isCollapsed && 'justify-center px-2 mr-0'), children: _jsx(Logo, {}) }), !isCollapsed && 'AFFiNE'] }), _jsx(Nav, { isCollapsed: isCollapsed })] }) }));
};
export const RightPanel = ({ panelRef, onExpand, onCollapse, }) => {
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    const { panelContent, isOpen } = useRightPanel();
    const onOpenChange = useCallback((open) => {
        if (open) {
            onExpand();
        }
        else {
            onCollapse();
        }
    }, [onExpand, onCollapse]);
    if (isSmallScreen) {
        return (_jsxs(Sheet, { open: isOpen, onOpenChange: onOpenChange, children: [_jsxs(SheetHeader, { className: "hidden", children: [_jsx(SheetTitle, { children: "Right Panel" }), _jsx(SheetDescription, { children: "For displaying additional information" })] }), _jsx(SheetContent, { side: "right", className: "p-0", withoutCloseButton: true, children: panelContent })] }));
    }
    return (_jsx(ResizablePanel, { id: "2", order: 2, ref: panelRef, defaultSize: 0, maxSize: 20, collapsible: true, collapsedSize: 0, onExpand: onExpand, onCollapse: onCollapse, className: "border-l max-w-96", children: panelContent }));
};
//# sourceMappingURL=layout.js.map