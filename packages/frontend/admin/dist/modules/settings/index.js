import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/admin/components/ui/button';
import { ScrollArea } from '@affine/admin/components/ui/scroll-area';
import { get } from 'lodash-es';
import { CheckIcon } from 'lucide-react';
import { useCallback } from 'react';
import { Header } from '../header';
import { useNav } from '../nav/context';
import { ALL_CONFIG_DESCRIPTORS, ALL_SETTING_GROUPS, } from './config';
import { ConfigRow } from './config-input-row';
import { useAppConfig } from './use-app-config';
export function SettingsPage() {
    const { appConfig, update, save, patchedAppConfig, updates } = useAppConfig();
    const disableSave = Object.keys(updates).length === 0;
    const saveChanges = useCallback(() => {
        if (disableSave) {
            return;
        }
        save();
    }, [save, disableSave]);
    return (_jsxs("div", { className: "h-screen flex-1 flex-col flex", children: [_jsx(Header, { title: "Settings", endFix: _jsx(Button, { type: "submit", size: "icon", className: "w-7 h-7", variant: "ghost", onClick: saveChanges, disabled: disableSave, children: _jsx(CheckIcon, { size: 20 }) }) }), _jsx(AdminPanel, { onUpdate: update, appConfig: appConfig, patchedAppConfig: patchedAppConfig })] }));
}
const AdminPanel = ({ appConfig, patchedAppConfig, onUpdate, }) => {
    const { currentModule } = useNav();
    const group = ALL_SETTING_GROUPS.find(group => group.module === currentModule);
    if (!group) {
        return null;
    }
    const { name, module, fields, operations } = group;
    return (_jsx(ScrollArea, { className: "h-full", children: _jsxs("div", { className: "flex flex-col h-full gap-5 py-5 px-6 w-full max-w-[800px] mx-auto", children: [_jsx("div", { className: "text-2xl font-semibold", children: name }), _jsxs("div", { className: "flex flex-col gap-10", id: `config-module-${module}`, children: [fields.map(field => {
                            let desc;
                            let props;
                            if (typeof field === 'string') {
                                const descriptor = ALL_CONFIG_DESCRIPTORS[module][field];
                                desc = descriptor.desc;
                                props = {
                                    field: `${module}/${field}`,
                                    desc,
                                    type: descriptor.type,
                                    options: [],
                                    defaultValue: get(appConfig[module], field),
                                    onChange: onUpdate,
                                };
                            }
                            else {
                                const descriptor = ALL_CONFIG_DESCRIPTORS[module][field.key];
                                props = {
                                    field: `${module}/${field.key}${field.sub ? `/${field.sub}` : ''}`,
                                    desc: field.desc ?? descriptor.desc,
                                    type: field.type ?? descriptor.type,
                                    // @ts-expect-error for enum type
                                    options: field.options,
                                    defaultValue: get(appConfig[module], field.key + (field.sub ? '.' + field.sub : '')),
                                    onChange: onUpdate,
                                };
                            }
                            return _jsx(ConfigRow, { ...props }, props.field);
                        }), operations?.map(Operation => (_jsx(Operation, { appConfig: patchedAppConfig }, Operation.name)))] })] }) }));
};
//# sourceMappingURL=index.js.map