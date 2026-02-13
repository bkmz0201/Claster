import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { EditorService } from '@affine/core/modules/editor';
import { PresentationIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
export const DetailPageHeaderPresentButton = () => {
    const editorService = useService(EditorService);
    return (_jsx(IconButton, { style: { flexShrink: 0 }, size: "24", onClick: () => editorService.editor.togglePresentation(), children: _jsx(PresentationIcon, {}) }));
};
//# sourceMappingURL=detail-header-present-button.js.map