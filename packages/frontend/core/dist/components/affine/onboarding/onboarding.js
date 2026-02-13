import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { AnimateInTooltip } from './animate-in-tooltip';
import { articles } from './articles';
import { PaperSteps } from './paper-steps';
import * as styles from './style.css';
export const Onboarding = ({ onOpenApp }) => {
    const [status, setStatus] = useState({
        activeId: null,
        unfoldingId: null,
    });
    const onFoldChange = useCallback((id, v) => {
        setStatus(s => {
            return {
                activeId: v ? null : s.activeId,
                unfoldingId: v ? s.unfoldingId : id,
            };
        });
    }, []);
    const onFoldChanged = useCallback((id, v) => {
        setStatus(s => {
            return {
                activeId: v ? null : id,
                unfoldingId: v ? null : s.unfoldingId,
            };
        });
    }, []);
    const onTooltipNext = useCallback(() => {
        if (status.activeId)
            return;
        setStatus({ activeId: null, unfoldingId: '4' });
    }, [status.activeId]);
    return (_jsx("div", { className: styles.onboarding, "data-is-desktop": BUILD_CONFIG.isElectron, "data-is-window": !!status.activeId || !!status.unfoldingId, children: _jsxs("div", { className: styles.offsetOrigin, children: [Object.entries(articles).map(([id, article]) => {
                    const { enterOptions, location } = article;
                    const style = {
                        zIndex: status.unfoldingId === id ? 1 : 0,
                        '--fromX': `${enterOptions.fromX}vw`,
                        '--fromY': `${enterOptions.fromY}vh`,
                        '--fromZ': `${enterOptions.fromZ}px`,
                        '--toZ': `${enterOptions.toZ}px`,
                        '--fromRotateX': `${enterOptions.fromRotateX}deg`,
                        '--fromRotateY': `${enterOptions.fromRotateY}deg`,
                        '--fromRotateZ': `${enterOptions.fromRotateZ}deg`,
                        '--toRotateZ': `${enterOptions.toRotateZ}deg`,
                        '--delay': `${enterOptions.delay}ms`,
                        '--duration': enterOptions.duration,
                        '--easing': enterOptions.easing,
                        '--offset-x': `${location.x || 0}px`,
                        '--offset-y': `${location.y || 0}px`,
                    };
                    return (_jsx("div", { style: style, children: _jsx(PaperSteps, { status: status, article: article, show: status.activeId === null || status.activeId === id, onFoldChange: onFoldChange, onFoldChanged: onFoldChanged, onOpenApp: onOpenApp }) }, id));
                }), _jsx("div", { className: styles.tipsWrapper, "data-visible": !status.activeId, children: _jsx(AnimateInTooltip, { onNext: onTooltipNext, visible: !status.activeId }) })] }) }));
};
//# sourceMappingURL=onboarding.js.map