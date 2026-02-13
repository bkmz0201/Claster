import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, IconButton, Modal } from '@affine/component';
import { useBlurRoot } from '@affine/core/components/hooks/use-blur-root';
import { AuthService, SubscriptionService } from '@affine/core/modules/cloud';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { Trans, useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { ArrowLeftSmallIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toggleGeneralAIOnboarding } from './apis';
import * as baseStyles from './base-style.css';
import * as styles from './general.dialog.css';
import { Slider } from './slider';
import { showAIOnboardingGeneral$ } from './state';
const getPlayList = (t) => [
    {
        video: '/onboarding/ai-onboarding.general.1.mp4',
        title: t['com.affine.ai-onboarding.general.1.title'](),
        desc: t['com.affine.ai-onboarding.general.1.description'](),
    },
    {
        video: '/onboarding/ai-onboarding.general.2.mp4',
        title: t['com.affine.ai-onboarding.general.2.title'](),
        desc: t['com.affine.ai-onboarding.general.2.description'](),
    },
    {
        video: '/onboarding/ai-onboarding.general.3.mp4',
        title: t['com.affine.ai-onboarding.general.3.title'](),
        desc: t['com.affine.ai-onboarding.general.3.description'](),
    },
    {
        video: '/onboarding/ai-onboarding.general.4.mp4',
        title: t['com.affine.ai-onboarding.general.4.title'](),
        desc: t['com.affine.ai-onboarding.general.4.description'](),
    },
    {
        video: '/onboarding/ai-onboarding.general.5.mp4',
        title: t['com.affine.ai-onboarding.general.5.title'](),
        desc: (_jsx(Trans, { i18nKey: "com.affine.ai-onboarding.general.5.description", values: { link: 'ai.affine.pro' }, components: {
                a: (_jsx("a", { className: styles.link, href: "https://ai.affine.pro", target: "_blank", rel: "noreferrer" })),
            } })),
    },
];
let prefetched = false;
function prefetchVideos() {
    if (prefetched)
        return;
    const videos = [
        '/onboarding/ai-onboarding.general.1.mp4',
        '/onboarding/ai-onboarding.general.2.mp4',
        '/onboarding/ai-onboarding.general.3.mp4',
        '/onboarding/ai-onboarding.general.4.mp4',
        '/onboarding/ai-onboarding.general.5.mp4',
    ];
    videos.forEach(video => {
        const prefetchLink = document.createElement('link');
        prefetchLink.href = video;
        prefetchLink.rel = 'prefetch';
        document.head.append(prefetchLink);
    });
    prefetched = true;
}
export const AIOnboardingGeneral = () => {
    const { authService, subscriptionService } = useServices({
        AuthService,
        SubscriptionService,
    });
    const videoWrapperRef = useRef(null);
    const prevVideoRef = useRef(null);
    const loginStatus = useLiveData(authService.session.status$);
    const isLoggedIn = loginStatus === 'authenticated';
    const t = useI18n();
    const open = useLiveData(showAIOnboardingGeneral$);
    const aiSubscription = useLiveData(subscriptionService.subscription.ai$);
    const [index, setIndex] = useState(0);
    const list = useMemo(() => getPlayList(t), [t]);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const readyToOpen = isLoggedIn;
    useBlurRoot(open && readyToOpen);
    const isFirst = index === 0;
    const isLast = index === list.length - 1;
    const remindLater = useCallback(() => {
        showAIOnboardingGeneral$.next(false);
    }, []);
    const closeAndDismiss = useCallback(() => {
        showAIOnboardingGeneral$.next(false);
        toggleGeneralAIOnboarding(false);
    }, []);
    const goToPricingPlans = useCallback(() => {
        workspaceDialogService.open('setting', {
            activeTab: 'plans',
            scrollAnchor: 'aiPricingPlan',
        });
        track.$.aiOnboarding.dialog.viewPlans();
        closeAndDismiss();
    }, [closeAndDismiss, workspaceDialogService]);
    const onPrev = useCallback(() => {
        setIndex(i => Math.max(0, i - 1));
    }, []);
    const onNext = useCallback(() => {
        setIndex(i => Math.min(list.length - 1, i + 1));
    }, [list.length]);
    useEffect(() => {
        subscriptionService.subscription.revalidate();
    }, [subscriptionService]);
    useEffect(() => {
        prefetchVideos();
    }, []);
    const videoRenderer = useCallback(({ video }, index) => (_jsx("div", { className: styles.videoWrapper, children: _jsx("video", { autoPlay: index === 0, src: video, className: styles.video, muted: true, playsInline: true }) })), []);
    const titleRenderer = useCallback(({ title }) => _jsx("h1", { className: styles.title, children: title }), []);
    const descriptionRenderer = useCallback(({ desc }) => _jsx("p", { className: styles.description, children: desc }), []);
    // show dialog when it's mounted
    useEffect(() => {
        showAIOnboardingGeneral$.next(true);
    }, []);
    useEffect(() => {
        const videoWrapper = videoWrapperRef.current;
        if (!videoWrapper)
            return;
        const videos = videoWrapper.querySelectorAll('video');
        const video = videos[index];
        if (!video)
            return;
        if (prevVideoRef.current) {
            prevVideoRef.current.pause();
        }
        video.play().catch(console.error);
        prevVideoRef.current = video;
    }, [index]);
    return readyToOpen ? (_jsx(Modal, { persistent: true, open: open, onOpenChange: v => {
            showAIOnboardingGeneral$.next(v);
            if (!v)
                toggleGeneralAIOnboarding(false);
        }, contentOptions: { className: styles.dialog }, overlayOptions: { className: baseStyles.dialogOverlay }, children: _jsxs("div", { className: styles.dialogContent, children: [_jsx(Slider, { rootRef: videoWrapperRef, className: styles.videoHeader, items: list, activeIndex: index, preload: 5, itemRenderer: videoRenderer }), _jsxs("main", { className: styles.mainContent, children: [_jsx(Slider, { items: list, activeIndex: index, itemRenderer: titleRenderer, transitionDuration: 400 }), _jsx(Slider, { items: list, activeIndex: index, itemRenderer: descriptionRenderer, transitionDuration: 500, preload: 5 })] }), _jsx("section", { className: styles.privacy, "aria-hidden": !isLast || !!aiSubscription, children: _jsx(Trans, { i18nKey: "com.affine.ai-onboarding.general.privacy", components: {
                            a: (_jsx("a", { className: styles.privacyLink, href: "https://affine.pro/terms#ai" })),
                        } }) }), _jsx("footer", { className: styles.footer, "data-is-last": isLast, "data-is-first": isFirst, children: isLast ? (_jsxs(_Fragment, { children: [_jsx(IconButton, { size: "20", onClick: onPrev, children: _jsx(ArrowLeftSmallIcon, {}) }), aiSubscription ? (_jsx(Button, { size: "large", onClick: closeAndDismiss, variant: "primary", children: t['com.affine.ai-onboarding.general.get-started']() })) : (_jsxs("div", { className: styles.subscribeActions, children: [_jsx(Button, { size: "large", onClick: goToPricingPlans, children: t['com.affine.ai-onboarding.general.purchase']() }), _jsx(Button, { size: "large", onClick: closeAndDismiss, variant: "primary", children: t['com.affine.ai-onboarding.general.try-for-free']() })] }))] })) : (_jsxs(_Fragment, { children: [isFirst ? (_jsx(Button, { onClick: remindLater, size: "large", children: t['com.affine.ai-onboarding.general.skip']() })) : (_jsx(Button, { prefix: _jsx(ArrowLeftSmallIcon, {}), onClick: onPrev, size: "large", variant: "plain", children: t['com.affine.ai-onboarding.general.prev']() })), _jsxs("div", { className: styles.actionAndIndicator, children: [_jsxs("div", { children: [index + 1, " / ", list.length] }), _jsx(Button, { size: "large", variant: "primary", onClick: onNext, children: t['com.affine.ai-onboarding.general.next']() })] })] })) })] }) })) : null;
};
//# sourceMappingURL=general.dialog.js.map