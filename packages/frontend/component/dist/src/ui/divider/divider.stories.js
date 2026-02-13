import { jsx as _jsx } from "react/jsx-runtime";
import { Divider } from './index';
export default {
    title: 'UI/Divider',
    component: Divider,
};
const Template = args => (_jsx("div", { style: {
        height: '100px',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }, children: _jsx(Divider, { ...args }) }));
export const Default = Template.bind(undefined);
Default.args = {};
//# sourceMappingURL=divider.stories.js.map