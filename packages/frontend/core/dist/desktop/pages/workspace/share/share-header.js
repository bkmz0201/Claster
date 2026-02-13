import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BlocksuiteHeaderTitle } from '@affine/core/blocksuite/block-suite-header/title';
import { EditorModeSwitch } from '@affine/core/blocksuite/block-suite-mode-switch';
import ShareHeaderRightItem from '@affine/core/components/cloud/share-header-right-item';
import * as styles from './share-header.css';
export function ShareHeader({ publishMode, isTemplate, templateName, snapshotUrl, }) {
    return (_jsxs("div", { className: styles.header, children: [_jsx(EditorModeSwitch, {}), _jsx(BlocksuiteHeaderTitle, {}), _jsx("div", { className: styles.spacer }), _jsx(ShareHeaderRightItem, { publishMode: publishMode, isTemplate: isTemplate, snapshotUrl: snapshotUrl, templateName: templateName })] }));
}
//# sourceMappingURL=share-header.js.map