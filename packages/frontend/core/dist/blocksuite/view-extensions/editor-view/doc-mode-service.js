import { DocModeExtension, } from '@blocksuite/affine/shared/services';
export function patchDocModeService(docService, docsService, editorService) {
    const DEFAULT_MODE = 'page';
    class AffineDocModeService {
        constructor() {
            this.setEditorMode = (mode) => {
                editorService.editor.setMode(mode);
            };
            this.getEditorMode = () => {
                return editorService.editor.mode$.value;
            };
            this.setPrimaryMode = (mode, id) => {
                if (id) {
                    docsService.list.setPrimaryMode(id, mode);
                }
                else {
                    docService.doc.setPrimaryMode(mode);
                }
            };
            this.getPrimaryMode = (id) => {
                const mode = id
                    ? docsService.list.getPrimaryMode(id)
                    : docService.doc.getPrimaryMode();
                return (mode || DEFAULT_MODE);
            };
            this.togglePrimaryMode = (id) => {
                const mode = id
                    ? docsService.list.togglePrimaryMode(id)
                    : docService.doc.togglePrimaryMode();
                return (mode || DEFAULT_MODE);
            };
            this.onPrimaryModeChange = (handler, id) => {
                const mode$ = id
                    ? docsService.list.primaryMode$(id)
                    : docService.doc.primaryMode$;
                const sub = mode$.subscribe(m => handler((m || DEFAULT_MODE)));
                return sub;
            };
        }
    }
    const docModeExtension = DocModeExtension(new AffineDocModeService());
    return docModeExtension;
}
//# sourceMappingURL=doc-mode-service.js.map