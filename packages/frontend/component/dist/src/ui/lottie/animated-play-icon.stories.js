import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AnimatedPlayIcon } from './animated-play-icon';
export default {
    title: 'UI/Audio Player/Animated Play Icon',
    component: AnimatedPlayIcon,
    parameters: {
        docs: {
            description: {
                component: 'An animated icon that transitions between play, pause, and loading states.',
            },
        },
    },
};
const Template = args => (_jsx(AnimatedPlayIcon, { ...args }));
export const Play = Template.bind({});
Play.args = {
    state: 'play',
};
export const Pause = Template.bind({});
Pause.args = {
    state: 'pause',
};
export const WithStateToggle = () => {
    const [state, setState] = useState('play');
    const cycleState = () => {
        setState(current => {
            switch (current) {
                case 'play':
                    return 'pause';
                case 'pause':
                    return 'play';
                default:
                    return 'play';
            }
        });
    };
    return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(AnimatedPlayIcon, { state: state }), _jsxs("button", { onClick: cycleState, children: ["Toggle State (Current: ", state, ")"] })] }));
};
//# sourceMappingURL=animated-play-icon.stories.js.map