import { ObjectPool, Service } from '@toeverything/infra';
import { PDF } from '../entities/pdf';
export declare class PDFService extends Service {
    PDFs: ObjectPool<string, PDF>;
    constructor();
    get(blobId: string): {
        pdf: PDF;
        release: () => void;
    };
}
//# sourceMappingURL=pdf.d.ts.map