import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @vitest-environment happy-dom
 */
import { render } from '@testing-library/react';
import { createContext, useContext } from 'react';
import { expect, test } from 'vitest';
import { ProviderComposer } from '..';
test('ProviderComposer', async () => {
    const Context = createContext('null');
    const Provider = ({ children }) => {
        return _jsx(Context.Provider, { value: "test1", children: children });
    };
    const ConsumerComponent = () => {
        const value = useContext(Context);
        return value;
    };
    const Component = () => {
        return (_jsx(ProviderComposer, { contexts: [_jsx(Provider, {}, 1)], children: _jsx(ConsumerComponent, {}) }));
    };
    const result = render(_jsx(Component, {}));
    await result.findByText('test1');
    expect(result.asFragment()).toMatchSnapshot();
});
//# sourceMappingURL=provider-composer.spec.js.map