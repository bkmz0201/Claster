import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { PropertyValue } from '@affine/component';
import { AffinePageReference } from '@affine/core/components/affine/reference-link';
import { ConfigModal } from '@affine/core/components/mobile';
import { resolveLinkToDoc } from '@affine/core/modules/navigation';
import { useI18n } from '@affine/i18n';
import { LinkIcon } from '@blocksuite/icons/rc';
import { useLiveData } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import * as styles from './link.css';
export const LinkCell = ({ cell, dataSource, rowId, onChange, }) => {
    const isEmpty = useLiveData(cell.value$.map(value => typeof value !== 'string' || !value));
    const link = useLiveData(cell.value$) || '';
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(link);
    const ref = useRef(null);
    const commitChange = useCallback(() => {
        dataSource.cellValueChange(rowId, cell.id, tempValue.trim());
        setEditing(false);
        setTempValue(tempValue.trim());
        onChange?.(tempValue.trim());
    }, [dataSource, rowId, cell.id, onChange, tempValue]);
    const handleOnChange = useCallback(e => {
        setTempValue(e.target.value);
    }, []);
    const resolvedDocLink = useMemo(() => {
        const docInfo = resolveLinkToDoc(link);
        if (docInfo) {
            const params = new URLSearchParams();
            if (docInfo.mode) {
                params.set('mode', docInfo.mode);
            }
            if (docInfo.blockIds) {
                params.set('blockIds', docInfo.blockIds.join(','));
            }
            if (docInfo.elementIds) {
                params.set('elementIds', docInfo.elementIds.join(','));
            }
            return {
                docId: docInfo.docId,
                params,
            };
        }
        return null;
    }, [link]);
    const onKeydown = useCallback((e) => {
        if (e.key === 'Enter') {
            commitChange();
        }
        else if (e.key === 'Escape') {
            setEditing(false);
            setTempValue(link);
        }
    }, [commitChange, link]);
    useEffect(() => {
        setTempValue(link);
    }, [link]);
    const onClick = useCallback(() => {
        setEditing(true);
        setTimeout(() => {
            ref.current?.focus();
        });
    }, []);
    const onLinkClick = useCallback((e) => {
        // prevent click event from propagating to parent (editing)
        e.stopPropagation();
        setEditing(false);
    }, []);
    const t = useI18n();
    const editingElement = (_jsxs(_Fragment, { children: [_jsx("textarea", { ref: ref, onKeyDown: onKeydown, className: !BUILD_CONFIG.isMobileEdition
                    ? styles.textarea
                    : styles.mobileTextarea, onBlur: commitChange, value: tempValue || '', onChange: handleOnChange, "data-empty": !tempValue, placeholder: t['com.affine.page-properties.property-value-placeholder']() }), _jsxs("div", { className: !BUILD_CONFIG.isMobileEdition
                    ? styles.textInvisible
                    : styles.mobileTextInvisible, children: [tempValue, tempValue?.endsWith('\n') || !tempValue ? _jsx("br", {}) : null] })] }));
    const name = useLiveData(cell.property.name$);
    return (_jsxs(_Fragment, { children: [_jsx(PropertyValue, { className: styles.container, isEmpty: isEmpty, onClick: onClick, children: !editing ? (resolvedDocLink ? (_jsx(AffinePageReference, { pageId: resolvedDocLink.docId, params: resolvedDocLink.params })) : (_jsx("a", { href: link, target: "_blank", rel: "noopener noreferrer", onClick: onLinkClick, className: styles.link, children: link?.replace(/^https?:\/\//, '').trim() }))) : !BUILD_CONFIG.isMobileEdition ? (editingElement) : null }), BUILD_CONFIG.isMobileEdition ? (_jsx(ConfigModal, { open: editing, onOpenChange: setEditing, onBack: () => {
                    setEditing(false);
                }, title: _jsxs(_Fragment, { children: [_jsx(LinkIcon, {}), name] }), children: _jsx("div", { className: styles.mobileTextareaWrapper, children: editingElement }) })) : null] }));
};
//# sourceMappingURL=link.js.map