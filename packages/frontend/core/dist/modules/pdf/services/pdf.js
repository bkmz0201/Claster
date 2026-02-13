import { ObjectPool, Service } from '@toeverything/infra';
import { PDF } from '../entities/pdf';
// One PDF document one worker.
export class PDFService extends Service {
    constructor() {
        super();
        this.PDFs = new ObjectPool({
            onDelete: pdf => {
                pdf.dispose();
            },
        });
        this.disposables.push(() => {
            this.PDFs.clear();
        });
    }
    get(blobId) {
        let rc = this.PDFs.get(blobId);
        if (!rc) {
            rc = this.PDFs.put(blobId, this.framework.createEntity(PDF, { blobId }));
        }
        return { pdf: rc.obj, release: rc.release };
    }
}
//# sourceMappingURL=pdf.js.map