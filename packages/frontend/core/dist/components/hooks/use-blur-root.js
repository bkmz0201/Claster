import { useEffect } from 'react';
export const useBlurRoot = (blur) => {
    // blur modal background, can't use css: `backdrop-filter: blur()`,
    // because it won't behave as expected on client side (texts over transparent window are not blurred)
    useEffect(() => {
        const appDom = document.querySelector('#app');
        if (!appDom)
            return;
        appDom.style.filter = blur ? 'blur(7px)' : 'none';
        return () => {
            appDom.style.filter = 'none';
        };
    }, [blur]);
};
//# sourceMappingURL=use-blur-root.js.map