import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { ViewLayersIcon } from '@blocksuite/icons/rc';
import { NavigationPanelEmptySection } from '../../layouts/empty-section';
export const RootEmpty = ({ onClickCreate, }) => {
    const t = useI18n();
    return (_jsx(NavigationPanelEmptySection, { icon: ViewLayersIcon, message: t['com.affine.collections.empty.message'](), messageTestId: "slider-bar-collection-empty-message", actionText: t['com.affine.collections.empty.new-collection-button'](), onActionClick: onClickCreate }));
};
//# sourceMappingURL=empty.js.map