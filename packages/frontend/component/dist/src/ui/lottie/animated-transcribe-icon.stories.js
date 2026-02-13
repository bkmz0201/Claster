import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AnimatedTranscribeIcon } from './animated-transcribe-icon';
export default {
    title: 'UI/Audio Player/Animated Transcribe Icon',
    component: AnimatedTranscribeIcon,
    parameters: {
        docs: {
            description: {
                component: 'An animated icon that shows transcription state with smooth transitions.',
            },
        },
    },
};
const Template = args => (_jsx(AnimatedTranscribeIcon, { ...args }));
export const Idle = Template.bind({});
Idle.args = {
    state: 'idle',
};
export const Transcribing = Template.bind({});
Transcribing.args = {
    state: 'transcribing',
};
export const WithStateToggle = () => {
    const [state, setState] = useState('idle');
    const toggleState = () => {
        setState(current => (current === 'idle' ? 'transcribing' : 'idle'));
    };
    return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(AnimatedTranscribeIcon, { state: state }), _jsxs("button", { onClick: toggleState, children: ["Toggle State (Current: ", state, ")"] })] }));
};
//# sourceMappingURL=animated-transcribe-icon.stories.js.map