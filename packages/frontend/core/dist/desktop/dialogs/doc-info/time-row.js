import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PropertyName, PropertyRoot, PropertyValue } from '@affine/component';
import { DocsService } from '@affine/core/modules/doc';
import { i18nTime, useI18n } from '@affine/i18n';
import { DateTimeIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useDebouncedValue } from 'foxact/use-debounced-value';
import { useMemo } from 'react';
import * as styles from './time-row.css';
export const TimeRow = ({ docId, className, }) => {
    const t = useI18n();
    const docsService = useService(DocsService);
    const docRecord = useLiveData(docsService.list.doc$(docId));
    const docMeta = useLiveData(docRecord?.meta$);
    const timestampElement = useMemo(() => {
        const formatI18nTime = (time) => i18nTime(time, {
            relative: {
                max: [1, 'day'],
                accuracy: 'minute',
            },
            absolute: {
                accuracy: 'day',
            },
        });
        const localizedCreateTime = docMeta
            ? formatI18nTime(docMeta.createDate)
            : null;
        return (_jsxs(PropertyRoot, { children: [_jsx(PropertyName, { name: t['Created'](), icon: _jsx(DateTimeIcon, {}) }), _jsx(PropertyValue, { children: docMeta ? formatI18nTime(docMeta.createDate) : localizedCreateTime })] }));
    }, [docMeta, t]);
    const dTimestampElement = useDebouncedValue(timestampElement, 500);
    return (_jsx("div", { className: clsx(styles.container, className), children: dTimestampElement }));
};
//# sourceMappingURL=time-row.js.map