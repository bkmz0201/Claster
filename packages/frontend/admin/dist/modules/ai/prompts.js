import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { Separator } from '@affine/admin/components/ui/separator';
import { useCallback, useState } from 'react';
import { useRightPanel } from '../panel/context';
import { DiscardChanges } from './discard-changes';
import { EditPrompt } from './edit-prompt';
import { usePrompt } from './use-prompt';
export function Prompts() {
    const { prompts: list } = usePrompt();
    return (_jsxs("div", { className: "flex flex-col h-full gap-3 py-5 px-6 w-full", children: [_jsx("div", { className: "flex items-center", children: _jsx("span", { className: "text-xl font-semibold", children: "Prompts" }) }), _jsx("div", { className: "flex-grow overflow-y-auto space-y-[10px]", children: _jsx("div", { className: "flex flex-col rounded-md border w-full", children: list.map((item, index) => (_jsx(PromptRow, { item: item, index: index }, `${item.name}-${index}`))) }) })] }));
}
export const PromptRow = ({ item, index }) => {
    const { setPanelContent, openPanel, isOpen } = useRightPanel();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const handleDiscardChangesCancel = useCallback(() => {
        setDialogOpen(false);
        setCanSave(false);
    }, []);
    const handleConfirm = useCallback((item) => {
        setPanelContent(_jsx(EditPrompt, { item: item, setCanSave: setCanSave }));
        if (dialogOpen) {
            handleDiscardChangesCancel();
        }
        if (!isOpen) {
            openPanel();
        }
    }, [dialogOpen, handleDiscardChangesCancel, isOpen, openPanel, setPanelContent]);
    const handleEdit = useCallback((item) => {
        if (isOpen && canSave) {
            setDialogOpen(true);
        }
        else {
            handleConfirm(item);
        }
    }, [canSave, handleConfirm, isOpen]);
    return (_jsxs("div", { children: [index !== 0 && _jsx(Separator, {}), _jsxs(Button, { variant: "ghost", className: "flex flex-col gap-1 w-full items-start px-6 py-[14px] h-full ", onClick: () => handleEdit(item), children: [_jsx("div", { children: item.name }), _jsx("div", { className: "text-left w-full opacity-50 overflow-hidden text-ellipsis whitespace-nowrap break-words text-nowrap", children: item.messages.flatMap(message => message.content).join(' ') })] }), _jsx(DiscardChanges, { open: dialogOpen, onOpenChange: setDialogOpen, onClose: handleDiscardChangesCancel, onConfirm: () => handleConfirm(item) })] }));
};
//# sourceMappingURL=prompts.js.map