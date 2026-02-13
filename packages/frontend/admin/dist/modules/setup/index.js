import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useServerConfig } from '../common';
import { Form } from './form';
import logo from './logo.svg';
export function Setup() {
    const config = useServerConfig();
    if (config.initialized) {
        return _jsx(Navigate, { to: "/admin" });
    }
    return (_jsxs("div", { className: "w-full lg:grid lg:grid-cols-2 h-screen", children: [_jsx("div", { className: "flex items-center justify-center py-12 h-full", children: _jsx(Form, {}) }), _jsx("div", { className: "hidden lg:block relative overflow-hidden ", children: _jsx("img", { src: logo, alt: "Image", className: "absolute object-right-bottom bottom-0 right-0 h-3/4" }) })] }));
}
export { Setup as Component };
//# sourceMappingURL=index.js.map