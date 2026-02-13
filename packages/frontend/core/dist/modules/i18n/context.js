import { jsx as _jsx } from "react/jsx-runtime";
import { I18nextProvider } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { useEffect } from 'react';
import { I18nService } from './services/i18n';
export function I18nProvider({ children }) {
    const i18n = useService(I18nService).i18n;
    useEffect(() => {
        i18n.init();
    }, [i18n]);
    return _jsx(I18nextProvider, { i18n: i18n.i18next, children: children });
}
//# sourceMappingURL=context.js.map