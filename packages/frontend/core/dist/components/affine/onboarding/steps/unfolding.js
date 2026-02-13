import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './unfolding.css';
export const Unfolding = ({ fold, article, onChange, onChanged, }) => {
    const [folding, setFolding] = useState(fold);
    const ref = useRef(null);
    const toggleFold = useCallback(() => {
        onChange?.(!fold);
    }, [fold, onChange]);
    useEffect(() => {
        setFolding(fold);
        const paper = ref.current;
        if (paper) {
            const handler = () => {
                onChanged?.(fold);
            };
            paper.addEventListener('transitionend', handler, { once: true });
            return () => paper.removeEventListener('transitionend', handler);
        }
        return () => null;
    }, [fold, onChanged]);
    return (_jsx("div", { ref: ref, "data-fold": folding, className: styles.unfoldingWrapper, onClick: toggleFold, children: _jsx("div", { className: clsx(styles.unfoldingContent, !folding && 'leave'), children: article.brief }) }));
};
//# sourceMappingURL=unfolding.js.map