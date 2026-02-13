import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ScrollableContainer } from './index';
export default {
    title: 'UI/Scrollbar',
    component: ScrollableContainer,
};
const Template = args => (_jsx("div", { style: { height: '100px', width: '100%' }, children: _jsx(ScrollableContainer, { ...args, children: _jsx("ul", { children: Array.from({ length: 100 }).map((_, index) => (_jsxs("li", { children: ["item ", index] }, index))) }) }) }));
export const Default = Template.bind(undefined);
Default.args = {};
//# sourceMappingURL=scrollbar.stories.js.map