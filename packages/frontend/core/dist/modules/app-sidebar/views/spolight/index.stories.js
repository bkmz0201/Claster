import { jsx as _jsx } from "react/jsx-runtime";
import { Spotlight } from './index';
export default {
    title: 'Components/AppSidebar/Spotlight',
    component: Spotlight,
};
const Container = ({ children }) => (_jsx("main", { style: {
        position: 'relative',
        width: '320px',
        height: '320px',
        border: '1px solid #ccc',
    }, children: children }));
export const Default = () => {
    return (_jsx(Container, { children: _jsx(Spotlight, {}) }));
};
//# sourceMappingURL=index.stories.js.map