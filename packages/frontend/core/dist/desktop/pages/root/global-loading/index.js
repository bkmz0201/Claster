import { jsx as _jsx } from "react/jsx-runtime";
import { Loading } from '@affine/component';
import { globalLoadingEventsAtom } from '@affine/component/global-loading';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import * as styles from './index.css';
export function GlobalLoading() {
    const globalLoadingEvents = useAtomValue(globalLoadingEventsAtom);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (globalLoadingEvents.length) {
            setLoading(true);
        }
        else {
            setLoading(false);
        }
    }, [globalLoadingEvents]);
    if (!globalLoadingEvents.length) {
        return null;
    }
    return (_jsx("div", { className: styles.globalLoadingWrapperStyle, "data-loading": loading, children: _jsx(Loading, { size: 20 }) }));
}
//# sourceMappingURL=index.js.map