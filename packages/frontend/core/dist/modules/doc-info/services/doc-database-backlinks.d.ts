import { Service } from '@toeverything/infra';
import { Observable } from 'rxjs';
import type { DocsService } from '../../doc';
import type { DocsSearchService } from '../../docs-search';
import type { DatabaseRow } from '../types';
export declare class DocDatabaseBacklinksService extends Service {
    private readonly docsService;
    private readonly docsSearchService;
    constructor(docsService: DocsService, docsSearchService: DocsSearchService);
    private ensureDocLoaded;
    private adaptRowCells;
    private watchDatabaseRow$;
    watchDbBacklinkRows$(docId: string, defaultItems?: {
        docId: string;
        databaseBlockId: string;
        rowId: string;
    }[]): Observable<{
        row$: Observable<DatabaseRow | undefined>;
        docId: string;
        databaseBlockId: string;
        rowId: string;
    }[]>;
}
//# sourceMappingURL=doc-database-backlinks.d.ts.map