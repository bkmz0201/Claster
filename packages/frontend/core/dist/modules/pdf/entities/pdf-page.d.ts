import { Entity, LiveData } from '@toeverything/infra';
import type { RenderPageOpts } from '../renderer';
import type { PDF } from './pdf';
export declare class PDFPage extends Entity<{
    pdf: PDF;
    pageNum: number;
}> {
    readonly pageNum: number;
    bitmap$: LiveData<ImageBitmap | null>;
    error$: LiveData<any>;
    render: import("@toeverything/infra").Effect<Omit<RenderPageOpts, "pageNum">>;
    constructor();
}
//# sourceMappingURL=pdf-page.d.ts.map