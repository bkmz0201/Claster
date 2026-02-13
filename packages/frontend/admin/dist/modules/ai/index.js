import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch } from '@affine/admin/components/ui/switch';
import { cn } from '@affine/admin/utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { useState } from 'react';
import { Header } from '../header';
function AiPage() {
    const [enableAi, setEnableAi] = useState(false);
    return (_jsxs("div", { className: "h-screen flex-1 flex-col flex", children: [_jsx(Header, { title: "AI" }), _jsxs(ScrollAreaPrimitive.Root, { className: cn('relative overflow-hidden w-full'), children: [_jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit] [&>div]:!block", children: _jsxs("div", { className: "p-6 max-w-3xl mx-auto", children: [_jsx("div", { className: "text-[20px]", children: "AI" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[15px] font-medium mt-6", children: "Enable AI" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "AI functionality is not currently supported. Self-hosted AI support is in progress." })] }), _jsx(Switch, { checked: enableAi, onCheckedChange: setEnableAi, disabled: true })] })] }) }), _jsx(ScrollAreaPrimitive.ScrollAreaScrollbar, { className: cn('flex touch-none select-none transition-colors', 'h-full w-2.5 border-l border-l-transparent p-[1px]'), children: _jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" }) }), _jsx(ScrollAreaPrimitive.Corner, {})] })] }));
}
export { AiPage as Component };
//# sourceMappingURL=index.js.map