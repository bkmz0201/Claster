import { type MaybeDate } from '@affine/core/modules/journal';
import type { WorkbenchOpenOptions } from '@affine/core/modules/workbench/entities/workbench';
import dayjs from 'dayjs';
/**
 * @deprecated use `JournalService` directly
 */
export declare const useJournalHelper: () => {
    getJournalByDate: (maybeDate: MaybeDate) => import("@affine/core/modules/doc").DocRecord;
};
export declare const useJournalRouteHelper: () => {
    openJournal: (maybeDate: MaybeDate, options?: WorkbenchOpenOptions) => string;
    openToday: (options: WorkbenchOpenOptions) => string;
};
/**
 * @deprecated use `JournalService` directly
 */
export declare const useJournalInfoHelper: (pageId?: string | null) => {
    isJournal: boolean;
    journalDate: dayjs.Dayjs | null;
    localizedJournalDate: string | null;
    isTodayJournal: boolean;
    isPageJournal: (pageId: string) => boolean;
    isPageTodayJournal: (pageId: string) => boolean;
    getJournalDateString: (pageId: string) => string | undefined;
    getLocalizedJournalDateString: (pageId: string) => string | null;
};
//# sourceMappingURL=use-journal.d.ts.map