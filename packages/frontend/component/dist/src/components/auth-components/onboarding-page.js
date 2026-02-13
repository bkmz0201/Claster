import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Divider } from '../../ui/divider';
import Input from '../../ui/input';
import { ScrollableContainer } from '../../ui/scrollbar';
import * as styles from './onboarding-page.css';
function getCallbackUrl(location) {
    try {
        const url = location.state?.callbackURL ||
            new URLSearchParams(location.search).get('redirect_uri');
        if (typeof url === 'string' && url) {
            if (!url.startsWith('http:') && !url.startsWith('https:')) {
                return url;
            }
            // we will ignore host to avoid redirect hack
            const parsedUrl = new URL(url);
            return parsedUrl.pathname + parsedUrl.search;
        }
    }
    catch { }
    return null;
}
export const ScrollableLayout = ({ headerItems, children, isMacosDesktop, isWindowsDesktop, }) => {
    return (_jsxs("div", { className: styles.layout, "data-is-macos-electron": isMacosDesktop, children: [_jsx("header", { className: styles.header, "data-is-windows-electron": isWindowsDesktop, children: headerItems }), _jsx(ScrollableContainer, { className: styles.scrollableContainer, children: _jsx("div", { className: styles.onboardingContainer, children: children }) }), _jsx("footer", { className: styles.footer, children: _jsxs("div", { className: styles.linkGroup, children: [_jsx("a", { className: styles.link, href: "https://affine.pro/terms", target: "_blank", rel: "noreferrer", children: "Terms of Conditions" }), _jsx(Divider, { orientation: "vertical" }), _jsx("a", { className: styles.link, href: "https://affine.pro/privacy", target: "_blank", rel: "noreferrer", children: "Privacy Policy" })] }) })] }));
};
export const OnboardingPage = ({ user, onOpenAffine, }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [questionIdx, setQuestionIdx] = useState(0);
    const { data: questions } = useSWR('/api/worker/questionnaire', url => fetch(url).then(r => r.json()), { suspense: true, revalidateOnFocus: false });
    const [options, setOptions] = useState(new Set());
    const [inputs, setInputs] = useState({});
    const callbackUrl = useMemo(() => getCallbackUrl(location), [location]);
    const question = useMemo(() => questions?.[questionIdx], [questionIdx, questions]);
    const isMacosDesktop = BUILD_CONFIG.isElectron && environment.isMacOs;
    const isWindowsDesktop = BUILD_CONFIG.isElectron && environment.isWindows;
    if (!questions) {
        return null;
    }
    // deprecated
    // TODO(@forehalo): remove
    if (callbackUrl?.startsWith('/open-app/signin-redirect')) {
        const url = new URL(callbackUrl, window.location.origin);
        url.searchParams.set('next', 'onboarding');
        console.log('redirect to', url.toString());
        window.location.assign(url.toString());
        return null;
    }
    if (question) {
        return (_jsx(ScrollableLayout, { headerItems: _jsx(Button, { className: clsx(styles.button, {
                    [styles.disableButton]: questionIdx === 0,
                    [styles.windowsAppButton]: isWindowsDesktop,
                }), size: "extraLarge", onClick: () => setQuestionIdx(questions.length), children: "Skip" }), isMacosDesktop: isMacosDesktop, isWindowsDesktop: isWindowsDesktop, children: _jsxs("div", { className: styles.content, children: [_jsx("h1", { className: styles.question, children: question.question }), _jsx("div", { className: styles.optionsWrapper, children: question.options &&
                            question.options.length > 0 &&
                            question.options.map(option => {
                                if (option.type === 'checkbox') {
                                    return (_jsx(Checkbox, { name: option.value, className: styles.checkBox, labelClassName: styles.label, checked: options.has(option.value), onChange: e => {
                                            setOptions(set => {
                                                if (e.target.checked) {
                                                    set.add(option.value);
                                                }
                                                else {
                                                    set.delete(option.value);
                                                }
                                                return new Set(set);
                                            });
                                        }, label: option.label }, option.label));
                                }
                                else if (option.type === 'input') {
                                    return (_jsx(Input, { className: styles.input, type: "text", size: "large", placeholder: option.label, value: inputs[option.value] || '', onChange: value => setInputs(prev => ({ ...prev, [option.value]: value })) }, option.label));
                                }
                                return null;
                            }) }), _jsxs("div", { className: styles.buttonWrapper, children: [_jsx(Button, { className: clsx(styles.button, {
                                    [styles.disableButton]: questionIdx !== 0,
                                }), size: "extraLarge", onClick: () => setQuestionIdx(questions.length), children: "Skip" }), _jsx(Button, { className: styles.button, variant: "primary", size: "extraLarge", itemType: "submit", onClick: () => {
                                    if (question.id && user?.id) {
                                        const answer = {
                                            form: user.id,
                                            ask: question.id,
                                            answer: [
                                                ...Array.from(options),
                                                ...Object.entries(inputs).map(([key, value]) => `${key}:${value}`),
                                            ],
                                        };
                                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                        fetch('/api/worker/questionnaire', {
                                            method: 'POST',
                                            body: JSON.stringify(answer),
                                        }).finally(() => {
                                            setOptions(new Set());
                                            setInputs({});
                                            setQuestionIdx(questionIdx + 1);
                                        });
                                    }
                                    else {
                                        setQuestionIdx(questionIdx + 1);
                                    }
                                }, suffix: _jsx(ArrowRightSmallIcon, {}), children: questionIdx === 0 ? 'start' : 'Next' })] })] }) }));
    }
    return (_jsx(ScrollableLayout, { isMacosDesktop: isMacosDesktop, isWindowsDesktop: isWindowsDesktop, children: _jsxs("div", { className: styles.thankContainer, children: [_jsx("h1", { className: styles.thankTitle, children: "Thank you!" }), _jsx("p", { className: styles.thankText, children: "We will continue to enhance our products based on your feedback. Thank you once again for your supports." }), _jsx(Button, { className: clsx(styles.button, styles.openAFFiNEButton), variant: "primary", size: "extraLarge", onClick: () => {
                        if (callbackUrl) {
                            navigate(callbackUrl);
                        }
                        else {
                            onOpenAffine();
                        }
                    }, suffix: _jsx(ArrowRightSmallIcon, {}), children: "Get Started" })] }) }));
};
//# sourceMappingURL=onboarding-page.js.map