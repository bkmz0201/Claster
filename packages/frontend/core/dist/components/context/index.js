import { jsx as _jsx } from "react/jsx-runtime";
import { ConfirmModalProvider, PromptModalProvider } from '@affine/component';
import { ProviderComposer } from '@affine/component/provider-composer';
import { ThemeProvider } from '@affine/core/components/theme-provider';
import { Provider } from 'jotai';
import { useMemo } from 'react';
export function AffineContext(props) {
    return (_jsx(ProviderComposer, { contexts: useMemo(() => [
            _jsx(Provider, { store: props.store }, "JotaiProvider"),
            _jsx(ThemeProvider, {}, "ThemeProvider"),
            _jsx(ConfirmModalProvider, {}, "ConfirmModalProvider"),
            _jsx(PromptModalProvider, {}, "PromptModalProvider"),
        ].filter(Boolean), [props.store]), children: props.children }));
}
//# sourceMappingURL=index.js.map