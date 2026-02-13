import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { JournalService } from '@affine/core/modules/journal';
import { i18nTime, useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import dayjs from 'dayjs';
import * as styles from './styles.css';
export const BlocksuiteEditorJournalDocTitle = ({ page }) => {
    const journalService = useService(JournalService);
    const journalDateStr = useLiveData(journalService.journalDate$(page.id));
    return _jsx(BlocksuiteEditorJournalDocTitleUI, { date: journalDateStr });
};
export const BlocksuiteEditorJournalDocTitleUI = ({ date: dateStr, overrideClassName, }) => {
    const localizedJournalDate = i18nTime(dateStr, {
        absolute: { accuracy: 'day' },
    });
    const t = useI18n();
    // TODO(catsjuice): i18n
    const today = dayjs();
    const date = dayjs(dateStr);
    const day = dayjs(date).format('dddd') ?? null;
    const isToday = date.isSame(today, 'day');
    return (_jsxs("div", { className: overrideClassName ?? 'doc-title-container', "data-testid": "journal-title", children: [_jsx("span", { "data-testid": "date", children: localizedJournalDate }), isToday ? (_jsx("span", { className: styles.titleTodayTag, "data-testid": "date-today-label", children: t['com.affine.today']() })) : (_jsx("span", { className: styles.titleDayTag, children: day }))] }));
};
//# sourceMappingURL=journal-doc-title.js.map