import { WorkspaceScope, WorkspaceService } from '../workspace';
import { PDF } from './entities/pdf';
import { PDFPage } from './entities/pdf-page';
import { PDFService } from './services/pdf';
export function configurePDFModule(framework) {
    framework
        .scope(WorkspaceScope)
        .service(PDFService)
        .entity(PDF, [WorkspaceService])
        .entity(PDFPage);
}
export { PDF, PDFStatus } from './entities/pdf';
export { PDFPage } from './entities/pdf-page';
export { PDFRenderer } from './renderer';
export { PDFService } from './services/pdf';
//# sourceMappingURL=index.js.map