import { atom, useAtom } from 'jotai';
const activeEditorContainerAtom = atom(null);
export function useActiveBlocksuiteEditor() {
    const [editorContainer, setEditorContainer] = useAtom(activeEditorContainerAtom);
    return [editorContainer, setEditorContainer];
}
//# sourceMappingURL=use-block-suite-editor.js.map