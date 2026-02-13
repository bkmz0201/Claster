import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './setup';
import { Telemetry } from '@affine/core/components/telemetry';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
function mountApp() {
    // oxlint-disable-next-line no-non-null-assertion
    const root = document.getElementById('app');
    createRoot(root).render(_jsxs(StrictMode, { children: [_jsx(Telemetry, {}), _jsx(App, {})] }));
}
try {
    mountApp();
}
catch (err) {
    console.error('Failed to bootstrap app', err);
}
//# sourceMappingURL=index.js.map