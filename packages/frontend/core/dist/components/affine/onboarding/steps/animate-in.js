import { jsx as _jsx } from "react/jsx-runtime";
import { createSpring, waapi } from 'animejs';
import { useEffect } from 'react';
import { Paper } from '../curve-paper/paper';
import * as paperStyles from '../curve-paper/paper.css';
import * as styles from './animate-in.css';
const ease = createSpring({
    mass: 3.2,
    stiffness: 100,
    damping: 10,
    velocity: 0,
});
const segments = 6;
export const AnimateIn = ({ article, paperProps, onFinished, }) => {
    const { id: _id, enterOptions, brief } = article;
    const id = `onboardingMoveIn${_id}`;
    const rotateX = (1.2 * enterOptions.curve) / segments;
    useEffect(() => {
        let aborted = false;
        waapi.animate(`[data-id="${id}"] .${paperStyles.segment}[data-direction="up"]`, {
            rotateX: { from: -rotateX, to: 0 },
            ease,
            delay: enterOptions.delay,
            onComplete: () => {
                if (!aborted)
                    onFinished?.();
            },
        });
        waapi.animate(`[data-id="${id}"] .${paperStyles.segment}[data-direction="down"]`, {
            rotateX: { from: rotateX, to: 0 },
            ease,
            delay: enterOptions.delay,
        });
        return () => {
            aborted = true;
        };
    }, [enterOptions.delay, id, rotateX, onFinished]);
    const props = {
        ...paperProps,
        segments,
        content: brief,
        centerIndex: Math.min(segments - 1, Math.max(0, enterOptions.curveCenter)),
    };
    return (_jsx("div", { "data-id": id, className: styles.moveIn, children: _jsx(Paper, { ...props }) }));
};
//# sourceMappingURL=animate-in.js.map