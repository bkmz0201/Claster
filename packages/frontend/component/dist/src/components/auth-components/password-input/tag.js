import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { useMemo } from 'react';
import { tag } from './style.css';
export const Tag = ({ status, minimum, maximum }) => {
    const textMap = useMemo(() => {
        return {
            weak: 'Weak',
            medium: 'Medium',
            strong: 'Strong',
            minimum,
            maximum,
        };
    }, [minimum, maximum]);
    return (_jsx("div", { className: clsx(tag, {
            weak: status === 'weak',
            medium: status === 'medium',
            strong: status === 'strong',
            minimum: status === 'minimum',
            maximum: status === 'maximum',
        }), children: textMap[status] }));
};
//# sourceMappingURL=tag.js.map