import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, IconButton, Menu } from '@affine/component';
import { GlobalStateService } from '@affine/core/modules/storage';
import { TemplateDocService } from '@affine/core/modules/template-doc';
import { TemplateListMenuContentScrollable } from '@affine/core/modules/template-doc/view/template-list-menu';
import { useI18n } from '@affine/i18n';
import { CloseIcon, TemplateIcon } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { useTheme } from 'next-themes';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { journalPaperDark, journalPaperLight } from './assets';
import * as styles from './template-onboarding.css';
const dismissedKey = 'journal-template-onboarding-dismissed';
// to make sure the animation won't re-play until page is reloaded
let animationPlayed = false;
export const JournalTemplateOnboarding = () => {
    const containerRef = useRef(null);
    const globalState = useService(GlobalStateService).globalState;
    const templateDocService = useService(TemplateDocService);
    const t = useI18n();
    const dismissed = useLiveData(useMemo(() => LiveData.from(globalState.watch(dismissedKey), false), [globalState]));
    const onDismiss = useCallback(() => {
        const container = containerRef.current;
        if (!container) {
            globalState.set(dismissedKey, true);
            return;
        }
        const animation = container.animate([
            {},
            {
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginBottom: 0,
                opacity: 0,
            },
        ], { duration: 280, easing: 'cubic-bezier(.35,.58,.01,1)', fill: 'forwards' });
        animation.onfinish = () => {
            globalState.set(dismissedKey, true);
        };
    }, [globalState]);
    const updateJournalTemplate = useCallback((templateId) => {
        templateDocService.setting.updateJournalTemplateDocId(templateId);
    }, [templateDocService.setting]);
    if (dismissed)
        return null;
    return (_jsx("div", { className: styles.container, "data-animation-played": animationPlayed, ref: containerRef, children: _jsxs("div", { className: styles.card, "data-animation-played": animationPlayed, children: [_jsx("p", { className: styles.title, children: t['com.affine.template-journal-onboarding.title']() }), _jsx(Menu, { contentOptions: { className: styles.menu, align: 'end' }, items: _jsx(TemplateListMenuContentScrollable, { onSelect: updateJournalTemplate }), children: _jsx(Button, { variant: "primary", prefix: _jsx(TemplateIcon, {}), children: t['com.affine.template-journal-onboarding.select']() }) }), _jsx(JournalPaper, {}), _jsx(IconButton, { size: "16", className: styles.close, icon: _jsx(CloseIcon, {}), onClick: onDismiss })] }) }));
};
const JournalPaper = memo(function JournalPaper() {
    const ref = useRef(null);
    const { resolvedTheme } = useTheme();
    useEffect(() => {
        const paper = ref.current;
        if (!paper)
            return;
        const onAnimationEnd = () => (animationPlayed = true);
        paper.addEventListener('animationend', onAnimationEnd, { once: true });
        return () => {
            paper.removeEventListener('animationend', onAnimationEnd);
        };
    }, []);
    return (_jsx("div", { ref: ref, className: styles.paper, "data-animation-played": animationPlayed, dangerouslySetInnerHTML: {
            __html: resolvedTheme === 'dark' ? journalPaperDark : journalPaperLight,
        } }));
});
//# sourceMappingURL=template-onboarding.js.map