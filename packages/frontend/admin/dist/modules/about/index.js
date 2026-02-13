import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ScrollArea } from '@affine/admin/components/ui/scroll-area';
import { Header } from '../header';
import { AboutAFFiNE } from './about';
export function ConfigPage() {
    return (_jsxs("div", { className: " h-screen flex-1 space-y-1 flex-col flex", children: [_jsx(Header, { title: "Server" }), _jsx(ScrollArea, { children: _jsx(AboutAFFiNE, {}) })] }));
}
export { ConfigPage as Component };
//# sourceMappingURL=index.js.map