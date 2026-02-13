import { Entity, LiveData, ObjectPool } from '@toeverything/infra';
import { catchError, from, map, of, startWith, switchMap } from 'rxjs';
import { PDFRenderer } from '../renderer';
import { PDFPage } from './pdf-page';
export var PDFStatus;
(function (PDFStatus) {
    PDFStatus[PDFStatus["IDLE"] = 0] = "IDLE";
    PDFStatus[PDFStatus["Opening"] = 1] = "Opening";
    PDFStatus[PDFStatus["Opened"] = 2] = "Opened";
    PDFStatus[PDFStatus["Error"] = 3] = "Error";
})(PDFStatus || (PDFStatus = {}));
export class PDF extends Entity {
    constructor(workspaceService) {
        super();
        this.workspaceService = workspaceService;
        this.id = this.props.blobId;
        this.renderer = new PDFRenderer();
        this.pages = new ObjectPool({
            onDelete: page => page.dispose(),
        });
        this.state$ = LiveData.from(
        // @ts-expect-error type alias
        from(this.workspaceService.workspace.engine.blob
            .get(this.id)
            .then(blobRecord => {
            if (blobRecord) {
                const { data, mime: type } = blobRecord;
                const blob = new Blob([data], { type });
                return blob.arrayBuffer();
            }
            return null;
        })).pipe(switchMap(data => {
            if (data) {
                return this.renderer.ob$('open', { data });
            }
            throw new Error('PDF not found');
        }), map(meta => ({ status: PDFStatus.Opened, meta })), 
        // @ts-expect-error type alias
        startWith({ status: PDFStatus.Opening }), catchError((error) => of({ status: PDFStatus.Error, error }))), { status: PDFStatus.IDLE });
        this.disposables.push(() => this.pages.clear());
    }
    page(pageNum, size) {
        const key = `${pageNum}:${size}`;
        let rc = this.pages.get(key);
        if (!rc) {
            rc = this.pages.put(key, this.framework.createEntity(PDFPage, { pdf: this, pageNum }));
        }
        return { page: rc.obj, release: rc.release };
    }
    dispose() {
        this.renderer.destroy();
        super.dispose();
    }
}
//# sourceMappingURL=pdf.js.map