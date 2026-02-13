import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ScrollArea } from '@affine/admin/components/ui/scroll-area';
import { Separator } from '@affine/admin/components/ui/separator';
import { Textarea } from '@affine/admin/components/ui/textarea';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RightPanelHeader } from '../header';
import { useRightPanel } from '../panel/context';
import { usePrompt } from './use-prompt';
export function EditPrompt({ item, setCanSave, }) {
    const { closePanel } = useRightPanel();
    const [messages, setMessages] = useState(item.messages);
    const { updatePrompt } = usePrompt();
    const disableSave = useMemo(() => JSON.stringify(messages) === JSON.stringify(item.messages), [item.messages, messages]);
    const handleChange = useCallback((e, index) => {
        const newMessages = [...messages];
        newMessages[index] = {
            ...newMessages[index],
            content: e.target.value,
        };
        setMessages(newMessages);
        setCanSave(!disableSave);
    }, [disableSave, messages, setCanSave]);
    const handleClose = useCallback(() => {
        setMessages(item.messages);
        closePanel();
    }, [closePanel, item.messages]);
    const onConfirm = useCallback(() => {
        if (!disableSave) {
            updatePrompt({ name: item.name, messages });
        }
        handleClose();
    }, [disableSave, handleClose, item.name, messages, updatePrompt]);
    useEffect(() => {
        setMessages(item.messages);
    }, [item.messages]);
    return (_jsxs("div", { className: "flex flex-col h-full gap-1", children: [_jsx(RightPanelHeader, { title: "Edit Prompt", handleClose: handleClose, handleConfirm: onConfirm, canSave: !disableSave }), _jsx(ScrollArea, { children: _jsxs("div", { className: "grid", children: [_jsxs("div", { className: "px-5 py-4 overflow-y-auto space-y-[10px] flex flex-col gap-5", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "text-sm font-medium", children: "Name" }), _jsx("div", { className: "text-sm font-normal text-zinc-500", children: item.name })] }), item.action ? (_jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "text-sm font-medium", children: "Action" }), _jsx("div", { className: "text-sm font-normal text-zinc-500", children: item.action })] })) : null, _jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "text-sm font-medium", children: "Model" }), _jsx("div", { className: "text-sm font-normal text-zinc-500", children: item.model })] }), item.config ? (_jsxs("div", { className: "flex flex-col border rounded p-3", children: [_jsx("div", { className: "text-sm font-medium", children: "Config" }), Object.entries(item.config).map(([key, value], index) => (_jsxs("div", { className: "flex flex-col", children: [index !== 0 && _jsx(Separator, {}), _jsx("span", { className: "text-sm font-normal", children: key }), _jsx("span", { className: "text-sm font-normal text-zinc-500", children: value?.toString() })] }, key)))] })) : null] }), _jsxs("div", { className: "px-5 py-4 overflow-y-auto space-y-[10px] flex flex-col", children: [_jsx("div", { className: "text-sm font-medium", children: "Messages" }), messages.map((message, index) => (_jsxs("div", { className: "flex flex-col gap-3", children: [index !== 0 && _jsx(Separator, {}), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-normal", children: "Role" }), _jsx("div", { className: "text-sm font-normal text-zinc-500", children: message.role })] }), message.params ? (_jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: "Params" }), Object.entries(message.params).map(([key, value], index) => (_jsxs("div", { className: "flex flex-col", children: [index !== 0 && _jsx(Separator, {}), _jsx("span", { className: "text-sm font-normal", children: key }), _jsx("span", { className: "text-sm font-normal text-zinc-500", style: { overflowWrap: 'break-word' }, children: value.toString() })] }, key)))] })) : null, _jsx("div", { className: "text-sm font-normal", children: "Content" }), _jsx(Textarea, { className: " min-h-48", value: message.content, onChange: e => handleChange(e, index) })] }, message.content)))] })] }) })] }));
}
//# sourceMappingURL=edit-prompt.js.map