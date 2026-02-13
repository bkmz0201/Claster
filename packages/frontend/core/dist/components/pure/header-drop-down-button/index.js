import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from '@affine/component/ui/button';
import { MoreHorizontalIcon } from '@blocksuite/icons/rc';
import { forwardRef } from 'react';
import { headerMenuTrigger } from './styles.css';
export const HeaderDropDownButton = forwardRef((props, ref) => {
    return (_jsx(IconButton, { ref: ref, ...props, "data-testid": "header-dropDownButton", className: headerMenuTrigger, children: _jsx(MoreHorizontalIcon, {}) }));
});
HeaderDropDownButton.displayName = 'HeaderDropDownButton';
//# sourceMappingURL=index.js.map