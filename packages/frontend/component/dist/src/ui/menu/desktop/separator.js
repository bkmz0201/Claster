import { jsx as _jsx } from "react/jsx-runtime";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import * as styles from '../styles.css';
export const DesktopMenuSeparator = ({ className, ...otherProps }) => {
    return (_jsx(DropdownMenu.Separator, { className: clsx(styles.menuSeparator, className), ...otherProps }));
};
//# sourceMappingURL=separator.js.map