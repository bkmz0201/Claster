import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Progress, PropertyValue } from '@affine/component';
import { ConfigModal } from '@affine/core/components/mobile';
import { ProgressIcon } from '@blocksuite/icons/rc';
import { useLiveData } from '@toeverything/infra';
import { useEffect, useState } from 'react';
import * as styles from './progress.css';
const DesktopProgressCell = ({ cell, dataSource, rowId, onChange, }) => {
    const value = useLiveData(cell.value$);
    const [localValue, setLocalValue] = useState(value || 0);
    useEffect(() => {
        setLocalValue(value || 0);
    }, [value]);
    return (_jsx(PropertyValue, { hoverable: false, children: _jsx(Progress, { value: localValue, onChange: v => {
                setLocalValue(v);
            }, onBlur: () => {
                dataSource.cellValueChange(rowId, cell.id, localValue);
                onChange?.(localValue);
            } }) }));
};
const MobileProgressCell = ({ cell, dataSource, rowId, onChange, }) => {
    const value = useLiveData(cell.value$);
    const [localValue, setLocalValue] = useState(value || 0);
    useEffect(() => {
        setLocalValue(value || 0);
    }, [value]);
    const [open, setOpen] = useState(false);
    const name = useLiveData(cell.property.name$);
    const commitChange = () => {
        dataSource.cellValueChange(rowId, cell.id, localValue);
        onChange?.(localValue);
        setOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(PropertyValue, { hoverable: false, onClick: () => setOpen(true), children: _jsx(Progress, { value: value || 0 }) }), _jsx(ConfigModal, { variant: "popup", open: open, onOpenChange: setOpen, onDone: commitChange, title: _jsxs(_Fragment, { children: [_jsx(ProgressIcon, { className: styles.progressIcon }), name] }), children: _jsx(Progress, { value: localValue, onChange: v => {
                        setLocalValue(v);
                    } }) })] }));
};
export const ProgressCell = BUILD_CONFIG.isMobileEdition
    ? MobileProgressCell
    : DesktopProgressCell;
//# sourceMappingURL=progress.js.map