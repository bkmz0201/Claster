import { Entity, LiveData, ObjectPool } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { PDFMeta } from '../renderer';
import { PDFRenderer } from '../renderer';
import { PDFPage } from './pdf-page';
export declare enum PDFStatus {
    IDLE = 0,
    Opening = 1,
    Opened = 2,
    Error = 3
}
export type PDFRendererState = {
    status: PDFStatus.IDLE | PDFStatus.Opening;
} | {
    status: PDFStatus.Opened;
    meta: PDFMeta;
} | {
    status: PDFStatus.Error;
    error: Error;
};
export declare class PDF extends Entity<{
    blobId: string;
}> {
    private readonly workspaceService;
    readonly id: string;
    readonly renderer: PDFRenderer;
    readonly pages: ObjectPool<string, PDFPage>;
    readonly state$: LiveData<PDFRendererState>;
    constructor(workspaceService: WorkspaceService);
    page(pageNum: number, size: string): {
        page: PDFPage;
        release: () => void;
    };
    dispose(): void;
}
//# sourceMappingURL=pdf.d.ts.map