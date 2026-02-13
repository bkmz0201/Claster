import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Scrollable } from '@affine/component';
import { ViewSidebarTab } from '@affine/core/modules/workbench';
import { TodayIcon } from '@blocksuite/icons/rc';
import { sidebarScrollArea } from '../detail-page/detail-page.css';
import { EditorJournalPanel } from '../detail-page/tabs/journal';
export const AllDocSidebarTabs = () => {
    return (_jsx(ViewSidebarTab, { tabId: "all-docs-journal", icon: _jsx(TodayIcon, {}), children: _jsxs(Scrollable.Root, { className: sidebarScrollArea, children: [_jsx(Scrollable.Viewport, { children: _jsx(EditorJournalPanel, {}) }), _jsx(Scrollable.Scrollbar, {})] }) }));
};
//# sourceMappingURL=all-doc-sidebar-tabs.js.map