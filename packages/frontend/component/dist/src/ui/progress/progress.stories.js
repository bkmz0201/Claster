import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Progress } from './progress';
export default {
    title: 'UI/Progress',
    component: Progress,
};
const Template = () => {
    const [value, setValue] = useState(30);
    return (_jsx(Progress, { style: { width: '200px' }, value: value, onChange: setValue }));
};
export const Default = Template.bind(undefined);
//# sourceMappingURL=progress.stories.js.map