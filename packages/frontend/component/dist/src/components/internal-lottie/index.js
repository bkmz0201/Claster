import { jsx as _jsx } from "react/jsx-runtime";
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
export const InternalLottie = ({ options, isStopped, speed, width, height, }) => {
    const element = useRef(null);
    const lottieInstance = useRef(null);
    const directionRef = useRef(1);
    useEffect(() => {
        const callback = () => {
            if (!lottieInstance.current) {
                return;
            }
            const frame = lottieInstance.current.currentFrame.toFixed(0);
            if (frame === '1' || frame === '0') {
                directionRef.current = 1;
                lottieInstance.current.setDirection(directionRef.current);
                lottieInstance.current.goToAndStop(0, true);
                lottieInstance.current.play();
            }
            else {
                directionRef.current = -1;
                lottieInstance.current.setDirection(directionRef.current);
                lottieInstance.current.goToAndStop(lottieInstance.current.totalFrames - 1, true);
                lottieInstance.current.play();
            }
        };
        if (element.current) {
            if (options.autoReverse && options.autoplay) {
                lottieInstance.current = lottie.loadAnimation({
                    ...options,
                    autoplay: false,
                    loop: false,
                    container: element.current,
                });
            }
            else {
                lottieInstance.current = lottie.loadAnimation({
                    ...options,
                    container: element.current,
                });
            }
            if (options.autoReverse) {
                lottieInstance.current.addEventListener('complete', callback);
            }
        }
        return () => {
            if (options.autoReverse) {
                lottieInstance.current?.removeEventListener('complete', callback);
            }
            lottieInstance.current?.destroy();
        };
    }, [options]);
    useEffect(() => {
        if (speed) {
            lottieInstance.current?.setSpeed(speed);
        }
        if (isStopped) {
            lottieInstance.current?.stop();
        }
        else {
            lottieInstance.current?.play();
        }
    }, [isStopped, speed]);
    return _jsx("div", { ref: element, style: { width, height, lineHeight: 1 } });
};
//# sourceMappingURL=index.js.map