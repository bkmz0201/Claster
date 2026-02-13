import { jsx as _jsx } from "react/jsx-runtime";
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { JournalService } from '@affine/core/modules/journal';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { TodayIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { TabItem } from './tab-item';
export const AppTabJournal = ({ tab }) => {
    const workbench = useService(WorkbenchService).workbench;
    const location = useLiveData(workbench.location$);
    const journalService = useService(JournalService);
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const maybeDocId = location.pathname.split('/')[1];
    const journalDate = useLiveData(journalService.journalDate$(maybeDocId));
    const JournalIcon = useLiveData(docDisplayMetaService.icon$(maybeDocId));
    const handleOpenToday = useCallback(() => {
        workbench.open('/journals', { at: 'active' });
    }, [workbench]);
    const Icon = journalDate ? JournalIcon : TodayIcon;
    return (_jsx(TabItem, { onClick: handleOpenToday, id: tab.key, label: "Journal", children: _jsx(Icon, {}) }));
};
//# sourceMappingURL=journal.js.map