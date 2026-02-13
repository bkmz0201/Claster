import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { useI18n } from '@affine/i18n';
import * as styles from './tag-list-header.css';
export const TagListHeader = ({ onOpen }) => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.tagListHeader, children: [_jsx("div", { className: styles.tagListHeaderTitle, children: t['Tags']() }), _jsx(Button, { className: styles.newTagButton, onClick: onOpen, "data-testid": "all-tags-new-button", children: t['com.affine.tags.empty.new-tag-button']() })] }));
};
//# sourceMappingURL=tag-list-header.js.map