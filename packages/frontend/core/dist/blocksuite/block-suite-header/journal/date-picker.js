import { jsx as _jsx } from "react/jsx-runtime";
import { WeekDatePicker } from '@affine/component';
import { JOURNAL_DATE_FORMAT, JournalService, } from '@affine/core/modules/journal';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { useLiveData, useService } from '@toeverything/infra';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
const weekStyle = { maxWidth: 800, width: '100%' };
export const JournalWeekDatePicker = ({ page }) => {
    const handleRef = useRef(null);
    const journalService = useService(JournalService);
    const journalDateStr = useLiveData(journalService.journalDate$(page.id));
    const journalDate = journalDateStr ? dayjs(journalDateStr) : null;
    const [date, setDate] = useState((journalDate ?? dayjs()).format(JOURNAL_DATE_FORMAT));
    const workbench = useService(WorkbenchService).workbench;
    useEffect(() => {
        if (!journalDate)
            return;
        setDate(journalDate.format(JOURNAL_DATE_FORMAT));
        handleRef.current?.setCursor?.(journalDate);
    }, [journalDate]);
    const openJournal = useCallback((date) => {
        const docs = journalService.journalsByDate$(date).value;
        if (docs.length > 0) {
            workbench.openDoc(docs[0].id, { at: 'active' });
        }
        else {
            workbench.open(`/journals?date=${date}`, { at: 'active' });
        }
    }, [journalService, workbench]);
    return (_jsx(WeekDatePicker, { "data-testid": "journal-week-picker", handleRef: handleRef, style: weekStyle, value: date, onChange: openJournal }));
};
//# sourceMappingURL=date-picker.js.map