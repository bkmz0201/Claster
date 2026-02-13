import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton } from './index';
export default {
    title: 'UI/Skeleton',
    component: Skeleton,
};
const Template = args => (_jsx(_Fragment, { children: Array.from({ length: 4 }).map(i => (_jsx("div", { style: { width: '100%', maxWidth: '300px', marginBottom: '4px' }, children: _jsx(Skeleton, { ...args }) }, `${i}`))) }));
export const Default = Template.bind(undefined);
Default.args = {};
export const Circle = Template.bind(undefined);
Circle.args = {
    variant: 'circular',
};
export const Rectangle = Template.bind(undefined);
Rectangle.args = {
    variant: 'rectangular',
};
export const Text = Template.bind(undefined);
Text.args = {
    variant: 'text',
};
//# sourceMappingURL=skeleton.stories.js.map