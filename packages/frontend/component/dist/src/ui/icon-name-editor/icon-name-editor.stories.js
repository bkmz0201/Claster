import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { Button } from '../button';
import { IconType } from '../icon-picker';
import { ResizePanel } from '../resize-panel/resize-panel';
import { IconAndNameEditorMenu, IconEditor, } from './icon-name-editor';
export default {
    title: 'UI/IconAndNameEditorMenu',
    component: IconAndNameEditorMenu,
};
export const Basic = () => {
    const [icon, setIcon] = useState({
        type: IconType.Emoji,
        unicode: '👋',
    });
    const [name, setName] = useState('Hello');
    const handleIconChange = useCallback((icon) => {
        setIcon(icon);
    }, []);
    const handleNameChange = useCallback((name) => {
        setName(name);
    }, []);
    return (_jsxs("div", { children: [_jsxs("p", { children: ["Icon: ", JSON.stringify(icon)] }), _jsxs("p", { children: ["Name: ", name] }), _jsxs(ResizePanel, { maxWidth: 1200, maxHeight: 800, width: 220, height: 44, style: {
                    display: 'flex',
                    gap: 12,
                    justifyContent: 'end',
                    alignItems: 'end',
                }, children: [_jsx(IconAndNameEditorMenu, { icon: icon, name: name, onIconChange: handleIconChange, onNameChange: handleNameChange, closeAfterSelect: true, children: _jsx(Button, { children: "Edit Name and Icon" }) }), _jsx(IconEditor, { icon: icon, onIconChange: handleIconChange, closeAfterSelect: true })] })] }));
};
//# sourceMappingURL=icon-name-editor.stories.js.map