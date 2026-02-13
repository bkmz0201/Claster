import { jsx as _jsx } from "react/jsx-runtime";
import { CaptchaService } from '@affine/core/modules/cloud';
import { Turnstile } from '@marsidev/react-turnstile';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';
import * as style from './style.css';
export const Captcha = () => {
    const captchaService = useService(CaptchaService);
    const hasCaptchaFeature = useLiveData(captchaService.needCaptcha$);
    const isLoading = useLiveData(captchaService.isLoading$);
    const verifyToken = useLiveData(captchaService.verifyToken$);
    useEffect(() => {
        captchaService.revalidate();
    }, [captchaService]);
    const handleTurnstileSuccess = useCallback((token) => {
        captchaService.verifyToken$.next(token);
    }, [captchaService]);
    if (!hasCaptchaFeature) {
        return null;
    }
    if (isLoading) {
        return _jsx("div", { className: style.captchaWrapper, children: "Loading..." });
    }
    if (verifyToken) {
        return _jsx("div", { className: style.captchaWrapper, children: "Verified Client" });
    }
    return (_jsx(Turnstile, { className: style.captchaWrapper, siteKey: BUILD_CONFIG.CAPTCHA_SITE_KEY || '1x00000000000000000000AA', onSuccess: handleTurnstileSuccess }));
};
//# sourceMappingURL=captcha.js.map