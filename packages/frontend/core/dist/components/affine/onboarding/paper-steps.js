import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { AnimateIn } from './steps/animate-in';
import { EdgelessSwitch } from './steps/edgeless-switch';
import { Unfolding } from './steps/unfolding';
export const PaperSteps = ({ show, article, status, onFoldChange, onFoldChanged, onOpenApp, }) => {
    const [stage, setStage] = useState('enter');
    const [fold, setFold] = useState(true);
    const onEntered = useCallback(() => {
        setStage('unfold');
    }, []);
    const _onFoldChange = useCallback((v) => {
        setFold(v);
        onFoldChange?.(article.id, v);
    }, [onFoldChange, article.id]);
    const _onFoldChanged = useCallback((v) => {
        onFoldChanged?.(article.id, v);
        if (!v)
            setStage('edgeless-switch');
    }, [onFoldChanged, article.id]);
    const onEdgelessSwitchBack = useCallback(() => {
        setFold(false);
        setStage('unfold');
        // to apply fold animation
        setTimeout(() => _onFoldChange(true));
    }, [_onFoldChange]);
    useEffect(() => {
        if (stage === 'unfold' && status.unfoldingId === article.id) {
            setFold(false);
        }
    }, [article.id, stage, status.unfoldingId]);
    if (!show)
        return null;
    return stage === 'enter' ? (_jsx(AnimateIn, { article: article, onFinished: onEntered })) : stage === 'unfold' ? (_jsx(Unfolding, { fold: fold, article: article, onChange: _onFoldChange, onChanged: _onFoldChanged })) : (_jsx(EdgelessSwitch, { article: article, onBack: onEdgelessSwitchBack, onNext: onOpenApp }));
};
//# sourceMappingURL=paper-steps.js.map