import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DropdownButton, Menu } from '@affine/component';
import { BlockCard } from '@affine/component/card/block-card';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { EdgelessIcon, ImportIcon, PageIcon } from '@blocksuite/icons/rc';
import { useCallback, useState } from 'react';
import * as styles from './new-page-button.css';
export const CreateNewPagePopup = ({ createNewPage, createNewEdgeless, importFile, }) => {
    const t = useI18n();
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '8px',
        }, children: [_jsx(BlockCard, { title: t['com.affine.new.page-mode'](), desc: t['com.affine.write_with_a_blank_page'](), right: _jsx(PageIcon, { width: 20, height: 20 }), onClick: createNewPage, onAuxClick: createNewPage, "data-testid": "new-page-button-in-all-page" }), _jsx(BlockCard, { title: t['com.affine.new_edgeless'](), desc: t['com.affine.draw_with_a_blank_whiteboard'](), right: _jsx(EdgelessIcon, { width: 20, height: 20 }), onClick: createNewEdgeless, onAuxClick: createNewEdgeless, "data-testid": "new-edgeless-button-in-all-page" }), importFile ? (_jsx(BlockCard, { title: t['com.affine.new_import'](), desc: t['com.affine.import_file'](), right: _jsx(ImportIcon, { width: 20, height: 20 }), onClick: importFile, "data-testid": "import-button-in-all-page" })) : null] }));
};
export const NewPageButton = ({ createNewDoc, createNewPage, createNewEdgeless, importFile, size, children, }) => {
    const [open, setOpen] = useState(false);
    const handleCreateNewDoc = useCallback(e => {
        createNewDoc(e);
        setOpen(false);
        track.allDocs.header.actions.createDoc();
    }, [createNewDoc]);
    const handleCreateNewPage = useCallback(e => {
        createNewPage(e);
        setOpen(false);
        track.allDocs.header.actions.createDoc({ mode: 'page' });
    }, [createNewPage]);
    const handleCreateNewEdgeless = useCallback(e => {
        createNewEdgeless(e);
        setOpen(false);
        track.allDocs.header.actions.createDoc({
            mode: 'edgeless',
        });
    }, [createNewEdgeless]);
    const handleImportFile = useCallback(() => {
        importFile?.();
        setOpen(false);
    }, [importFile]);
    return (_jsx(Menu, { items: _jsx(CreateNewPagePopup, { createNewDoc: handleCreateNewDoc, createNewPage: handleCreateNewPage, createNewEdgeless: handleCreateNewEdgeless, importFile: importFile ? handleImportFile : undefined }), rootOptions: {
            open,
        }, contentOptions: {
            className: styles.menuContent,
            align: 'end',
            hideWhenDetached: true,
            onInteractOutside: useCallback(() => {
                setOpen(false);
            }, []),
        }, children: _jsx(DropdownButton, { size: size, onClick: handleCreateNewDoc, onAuxClick: handleCreateNewPage, onClickDropDown: useCallback(() => setOpen(open => !open), []), className: styles.button, children: children }) }));
};
//# sourceMappingURL=new-page-button.js.map