import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { useI18n } from '@affine/i18n';
import * as styles from './collection-list-header.css';
export const CollectionListHeader = ({ onCreate, }) => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.collectionListHeader, children: [_jsx("div", { className: styles.collectionListHeaderTitle, children: t['com.affine.collections.header']() }), _jsx(Button, { className: styles.newCollectionButton, onClick: onCreate, "data-testid": "all-collection-new-button", children: t['com.affine.collections.empty.new-collection-button']() })] }));
};
//# sourceMappingURL=collection-list-header.js.map