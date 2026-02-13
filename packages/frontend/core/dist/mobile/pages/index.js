import { jsx as _jsx } from "react/jsx-runtime";
import { Component as IndexComponent } from '@affine/core/desktop/pages/index';
import { AppFallback } from '../components/app-fallback';
// Default route fallback for mobile
export const Component = () => {
    // TODO: replace with a mobile version
    return (_jsx(IndexComponent, { defaultIndexRoute: 'home', fallback: _jsx(AppFallback, {}) }));
};
//# sourceMappingURL=index.js.map