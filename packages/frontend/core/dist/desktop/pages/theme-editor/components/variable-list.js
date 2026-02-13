import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scrollable } from '@affine/component';
import { ThemeEditorService } from '@affine/core/modules/theme-editor';
import { useLiveData, useService } from '@toeverything/infra';
import * as styles from '../theme-editor.css';
import { isColor } from '../utils';
import { ColorCell } from './color-cell';
import { StringCell } from './string-cell';
export const VariableList = ({ node }) => {
    const themeEditor = useService(ThemeEditorService);
    const customTheme = useLiveData(themeEditor.customTheme$);
    const variables = node.variables ?? [];
    return (_jsxs("main", { className: styles.content, children: [_jsx("header", { children: _jsxs("ul", { className: styles.row, children: [_jsx("li", { children: "Name" }), _jsx("li", { children: "Light" }), _jsx("li", { children: "Dark" })] }) }), _jsxs(Scrollable.Root, { className: styles.mainScrollable, children: [_jsx(Scrollable.Viewport, { className: styles.mainViewport, children: variables.map(variable => (_jsxs("ul", { className: styles.row, children: [_jsx("li", { style: {
                                        textDecoration: customTheme?.light?.[variable.variableName] ||
                                            customTheme?.dark?.[variable.variableName]
                                            ? 'underline'
                                            : 'none',
                                    }, children: variable.name }), ['light', 'dark'].map(mode => {
                                    const Renderer = isColor(variable[mode])
                                        ? ColorCell
                                        : StringCell;
                                    return (_jsx("li", { children: _jsx(Renderer, { value: variable[mode], custom: customTheme?.[mode]?.[variable.variableName], onValueChange: color => themeEditor.updateCustomTheme(mode, variable.variableName, color) }) }, mode));
                                })] }, variable.variableName))) }), _jsx(Scrollable.Scrollbar, {})] })] }));
};
//# sourceMappingURL=variable-list.js.map