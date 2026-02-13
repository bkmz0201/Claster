import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';
import animationData from './collections-icon.json';
import * as styles from './styles.css';
// animated collections icon that has two states: closed and opened
export const AnimatedCollectionsIcon = ({ closed, className, }) => {
    const lottieRef = useRef(null);
    useEffect(() => {
        if (lottieRef.current) {
            const lottie = lottieRef.current;
            if (closed) {
                lottie.setDirection(1);
            }
            else {
                lottie.setDirection(-1);
            }
            lottie.play();
        }
    }, [closed]);
    return (_jsx(Lottie, { className: clsx(styles.root, className), autoPlay: false, loop: false, lottieRef: lottieRef, animationData: animationData }));
};
//# sourceMappingURL=collections-icon.js.map