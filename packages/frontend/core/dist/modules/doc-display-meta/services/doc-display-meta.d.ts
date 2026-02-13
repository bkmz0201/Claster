import { TodayIcon as LitTodayIcon, YesterdayIcon as LitYesterdayIcon } from '@blocksuite/icons/lit';
import { TodayIcon } from '@blocksuite/icons/rc';
import { LiveData, Service } from '@toeverything/infra';
import type { Dayjs } from 'dayjs';
import type { DocRecord, DocsService } from '../../doc';
import type { ExplorerIconService } from '../../explorer-icon/services/explorer-icon';
import type { I18nService } from '../../i18n';
import type { JournalService } from '../../journal';
type IconType = 'rc' | 'lit';
interface DocDisplayIconOptions<T extends IconType> {
    type?: T;
    /**
     * Override the mode detected inside the hook:
     * by default, it will use the `primaryMode$` of the doc.
     */
    mode?: 'edgeless' | 'page';
    title?: string;
    reference?: boolean;
    referenceToNode?: boolean;
    /**
     * @default true
     */
    enableEmojiIcon?: boolean;
}
interface DocDisplayTitleOptions {
    title?: string;
    reference?: boolean;
    /**
     * @default true
     */
    enableEmojiIcon?: boolean;
}
export declare class DocDisplayMetaService extends Service {
    private readonly journalService;
    private readonly docsService;
    private readonly i18nService;
    private readonly explorerIconService;
    constructor(journalService: JournalService, docsService: DocsService, i18nService: I18nService, explorerIconService: ExplorerIconService);
    getJournalIcon(journalDate: string | Dayjs, options?: DocDisplayIconOptions<'rc'>): typeof TodayIcon;
    getJournalIcon(journalDate: string | Dayjs, options?: DocDisplayIconOptions<'lit'>): typeof LitYesterdayIcon;
    getJournalIcon<T extends IconType = 'rc'>(journalDate: string | Dayjs, options?: DocDisplayIconOptions<T>): T extends 'rc' ? typeof TodayIcon : typeof LitTodayIcon;
    icon$<T extends IconType = 'rc'>(docId: string, options?: DocDisplayIconOptions<T>): LiveData<any>;
    title$(docId: string, options?: DocDisplayTitleOptions): LiveData<string>;
    getDocDisplayMeta(docRecord: DocRecord): {
        title: string;
        icon: any;
        updatedDate: number | undefined;
    };
}
export {};
//# sourceMappingURL=doc-display-meta.d.ts.map