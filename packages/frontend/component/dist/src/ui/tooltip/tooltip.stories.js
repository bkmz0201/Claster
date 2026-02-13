import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '../button';
import { RadioGroup } from '../radio';
import Tooltip from './index';
export default {
    title: 'UI/Tooltip',
    component: Tooltip,
};
const Template = args => (_jsx(Tooltip, { content: "This is a tooltip", ...args, children: _jsx(Button, { children: "Show tooltip" }) }));
export const Default = Template.bind(undefined);
Default.args = {};
export const WithShortCut = () => {
    const shortCuts = [
        ['Text', 'T'],
        ['Bold', ['⌘', 'B']],
        ['Quick Search', ['⌘', 'K']],
        ['Share', ['⌘', 'Shift', 'S']],
        ['Copy', ['$mod', '$shift', 'C']],
    ];
    return (_jsx("div", { style: { display: 'flex', gap: 4 }, children: shortCuts.map(([name, shortcut]) => (_jsx(Tooltip, { shortcut: shortcut, content: name, children: _jsx(Button, { children: name }) }, name))) }));
};
export const CustomAlign = () => {
    const [align, setAlign] = useState('center');
    const _ = undefined;
    const positions = [
        // [top, left, right, bottom, translateX, translateY]
        [0, 0, _, _, _, _],
        [0, '50%', _, _, '-50%', _],
        [0, _, 0, _, _, _],
        ['50%', 0, _, _, _, '-50%'],
        ['50%', _, 0, _, _, '-50%'],
        [_, 0, _, 0, _, _],
        [_, '50%', _, 0, '-50%', _],
        [_, _, 0, 0, _, _],
    ];
    return (_jsxs("div", { children: [_jsx(RadioGroup, { items: ['start', 'center', 'end'], value: align, onChange: setAlign }), _jsx("div", { style: {
                    width: '100%',
                    height: 200,
                    position: 'relative',
                    border: '1px solid rgba(100,100,100,0.2)',
                    marginTop: 40,
                }, children: positions.map(pos => {
                    const key = pos.join('-');
                    const style = {
                        position: 'absolute',
                        top: pos[0],
                        left: pos[1],
                        right: pos[2],
                        bottom: pos[3],
                        transform: `translate(${pos[4] ?? 0}, ${pos[5] ?? 0})`,
                    };
                    return (_jsx(Tooltip, { align: align, content: "This is a tooltip", children: _jsx(Button, { style: style, children: "Show tooltip" }) }, key));
                }) })] }));
};
const sides = ['top', 'right', 'bottom', 'left'];
export const CustomSide = () => {
    return (_jsx("div", { style: { display: 'flex', gap: 4 }, children: sides.map(side => (_jsx(Tooltip, { content: "This is a tooltip", side: side, children: _jsxs(Button, { children: ["Show tooltip at ", side] }) }, side))) }));
};
export const WithCustomContent = args => (_jsx(Tooltip, { content: _jsxs("ul", { children: [_jsx("li", { children: "This is a tooltip" }), _jsx("li", { style: { color: 'red' }, children: "With custom content" })] }), ...args, children: _jsx(Button, { children: "Show tooltip" }) }));
//# sourceMappingURL=tooltip.stories.js.map