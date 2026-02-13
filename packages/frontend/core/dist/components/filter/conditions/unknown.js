import { jsx as _jsx } from "react/jsx-runtime";
import { WarningIcon } from '@blocksuite/icons/rc';
import { useEffect } from 'react';
import { Condition } from './condition';
import * as styles from './styles.css';
export const UnknownFilterCondition = ({ filter, isDraft, onDraftCompleted, }) => {
    useEffect(() => {
        if (isDraft) {
            // should not reach here
            onDraftCompleted?.();
        }
    }, [isDraft, onDraftCompleted]);
    return (_jsx(Condition, { filter: filter, icon: _jsx(WarningIcon, { className: styles.filterTypeIconUnknownStyle }), name: _jsx("span", { className: styles.filterTypeUnknownNameStyle, children: "Unknown" }) }));
};
//# sourceMappingURL=unknown.js.map