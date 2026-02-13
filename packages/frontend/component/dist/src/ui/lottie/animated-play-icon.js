import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { useDebouncedValue } from 'foxact/use-debounced-value';
import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';
import playandpause from './playandpause.json';
import * as styles from './styles.css';
const PlayAndPauseIcon = ({ onClick, className, state, }) => {
    const lottieRef = useRef(null);
    const prevStateRef = useRef(state);
    useEffect(() => {
        if (!lottieRef.current)
            return;
        const lottie = lottieRef.current;
        if (prevStateRef.current === 'pause') {
            lottie.goToAndStop(100, true);
        }
    }, []);
    useEffect(() => {
        if (!lottieRef.current)
            return;
        const lottie = lottieRef.current;
        lottie.setSpeed(2);
        // Only animate if state actually changed
        if (prevStateRef.current !== state) {
            if (state === 'play') {
                // Animate from pause to play
                lottie.playSegments([120, 160], true);
            }
            else {
                // Animate from play to pause
                lottie.playSegments([60, 100], true);
            }
            prevStateRef.current = state;
        }
    }, [state]);
    return (_jsx(Lottie, { onClick: onClick, lottieRef: lottieRef, className: clsx(styles.root, className), animationData: playandpause, loop: false, autoplay: false }));
};
export const AnimatedPlayIcon = ({ state: _state, className, onClick, }) => {
    const state = useDebouncedValue(_state, 25);
    return (_jsx(PlayAndPauseIcon, { state: state, onClick: onClick, className: className }));
};
//# sourceMappingURL=animated-play-icon.js.map