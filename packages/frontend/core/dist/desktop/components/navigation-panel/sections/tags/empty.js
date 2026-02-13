import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { TagIcon } from '@blocksuite/icons/rc';
import { NavigationPanelEmptySection } from '../../layouts/empty-section';
export const RootEmpty = () => {
    const t = useI18n();
    return (_jsx(NavigationPanelEmptySection, { icon: TagIcon, message: t['com.affine.rootAppSidebar.tags.empty'](), messageTestId: "slider-bar-tags-empty-message" }));
};
//# sourceMappingURL=empty.js.map