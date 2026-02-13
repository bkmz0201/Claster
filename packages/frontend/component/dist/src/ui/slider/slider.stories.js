import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Slider } from './index';
export default {
    title: 'UI/Slider',
    component: Slider,
};
const Template = args => {
    const [value, setValue] = useState([0]);
    return _jsx(Slider, { value: value, onValueChange: setValue, ...args });
};
export const Default = Template.bind(undefined);
Default.args = {
    min: 0,
    max: 10,
    width: 500,
    step: 1,
    nodes: [0, 5, 10],
};
//# sourceMappingURL=slider.stories.js.map