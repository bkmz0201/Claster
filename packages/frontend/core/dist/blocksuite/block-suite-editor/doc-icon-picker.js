import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconEditor, IconRenderer } from '@affine/component';
import { ExplorerIconService } from '@affine/core/modules/explorer-icon/services/explorer-icon';
import { useI18n } from '@affine/i18n';
import { SmileSolidIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import * as styles from './doc-icon-picker.css';
const TitleContainer = ({ children, hasIcon, }) => {
    return (_jsx("div", { className: "doc-icon-container", "data-has-icon": hasIcon ? 'true' : 'false', style: {
            paddingBottom: 8,
        }, children: children }));
};
export const DocIconPicker = ({ docId, readonly, }) => {
    const t = useI18n();
    const explorerIconService = useService(ExplorerIconService);
    const icon = useLiveData(explorerIconService.icon$('doc', docId));
    const isPlaceholder = !icon?.icon;
    if (readonly) {
        return isPlaceholder ? null : (_jsx("div", { className: styles.docIconPickerTrigger, "data-icon-type": icon?.icon?.type, children: _jsx(IconRenderer, { data: icon.icon }) }));
    }
    return (_jsx(TitleContainer, { hasIcon: !isPlaceholder, children: _jsx(IconEditor, { icon: icon?.icon, onIconChange: data => {
                explorerIconService.setIcon({
                    where: 'doc',
                    id: docId,
                    icon: data,
                });
            }, closeAfterSelect: true, triggerVariant: "plain", triggerClassName: isPlaceholder ? styles.placeholder : styles.docIconPickerTrigger, iconPlaceholder: _jsxs("div", { className: styles.placeholderContent, children: [_jsx(SmileSolidIcon, { className: styles.placeholderContentIcon }), _jsx("span", { className: styles.placeholderContentText, children: t['com.affine.docIconPicker.placeholder']() })] }) }) }));
};
//# sourceMappingURL=doc-icon-picker.js.map