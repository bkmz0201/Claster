import { jsx as _jsx } from "react/jsx-runtime";
import { Empty } from './index';
export default {
    title: 'UI/Empty',
    component: Empty,
};
const Template = args => _jsx(Empty, { ...args });
export const Default = Template.bind(undefined);
Default.args = {
    title: 'No Data',
    description: 'No Data',
};
//# sourceMappingURL=empty.stories.js.map