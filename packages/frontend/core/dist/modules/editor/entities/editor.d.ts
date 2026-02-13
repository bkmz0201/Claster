import type { AffineEditorContainer } from '@affine/core/blocksuite/block-suite-editor';
import type { DefaultOpenProperty } from '@affine/core/components/properties';
import type { DocTitle } from '@blocksuite/affine/fragments/doc-title';
import type { DocMode } from '@blocksuite/affine/model';
import { Entity, LiveData } from '@toeverything/infra';
import type { DocService } from '../../doc';
import type { WorkbenchView } from '../../workbench';
import type { WorkspaceService } from '../../workspace';
import { EditorScope } from '../scopes/editor';
import type { EditorSelector } from '../types';
export declare class Editor extends Entity {
    private readonly docService;
    private readonly workspaceService;
    readonly scope: EditorScope;
    readonly mode$: LiveData<DocMode>;
    readonly selector$: LiveData<EditorSelector | undefined>;
    readonly doc: import("../../doc").Doc;
    readonly isSharedMode: boolean | undefined;
    readonly editorContainer$: LiveData<AffineEditorContainer | null>;
    readonly defaultOpenProperty$: LiveData<DefaultOpenProperty | undefined>;
    workbenchView: WorkbenchView | null;
    scrollPosition: {
        page: number | null;
        edgeless: {
            centerX: number;
            centerY: number;
            zoom: number;
        } | null;
    };
    private readonly focusAt$;
    isPresenting$: LiveData<boolean>;
    togglePresentation(): void;
    setSelector(selector: EditorSelector | undefined): void;
    toggleMode(): void;
    setMode(mode: DocMode): void;
    setDefaultOpenProperty(defaultOpenProperty: DefaultOpenProperty | undefined): void;
    /**
     * sync editor params with view query string
     *
     * this function will be called when editor is initialized with in a workbench view
     *
     * this won't be called in shared page.
     */
    bindWorkbenchView(view: WorkbenchView): () => void;
    handleFocusAt(focusAt: {
        key: 'blockIds' | 'elementIds';
        mode: DocMode;
        id?: string;
        commentId?: string;
    }): void;
    bindEditorContainer(editorContainer: AffineEditorContainer, docTitle?: DocTitle | null, scrollViewport?: HTMLElement | null): () => void;
    constructor(docService: DocService, workspaceService: WorkspaceService);
}
//# sourceMappingURL=editor.d.ts.map