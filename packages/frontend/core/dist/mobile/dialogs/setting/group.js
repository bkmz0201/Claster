import { jsx as _jsx } from "react/jsx-runtime";
import { ConfigModal } from '@affine/core/components/mobile';
import clsx from 'clsx';
import { forwardRef, } from 'react';
import * as styles from './group.css';
export const SettingGroup = forwardRef(function SettingGroup({ children, title, className, contentClassName, contentStyle, ...attrs }, ref) {
    return (_jsx(ConfigModal.RowGroup, { ...attrs, ref: ref, title: title, className: clsx(styles.group, className), contentClassName: contentClassName, contentStyle: contentStyle, children: children }));
});
//# sourceMappingURL=group.js.map