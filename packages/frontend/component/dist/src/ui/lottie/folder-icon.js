import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';
import animationData from './folder-icon.json';
import * as styles from './styles.css';
// animated folder icon that has two states: closed and opened
export const AnimatedFolderIcon = ({ open, className, speed = 0.5, }) => {
    const lottieRef = useRef(null);
    useEffect(() => {
        if (lottieRef.current) {
            const lottie = lottieRef.current;
            lottie.setSpeed(speed);
            if (open) {
                lottie.setDirection(1);
            }
            else {
                lottie.setDirection(-1);
            }
            lottie.play();
        }
    }, [open, speed]);
    return (_jsx(Lottie, { className: clsx(styles.root, className), autoPlay: false, loop: false, lottieRef: lottieRef, animationData: animationData }));
};
//# sourceMappingURL=folder-icon.js.map