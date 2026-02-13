import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Menu, MenuItem, Scrollable, } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { inferOpenMode } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { DualLinkIcon, InformationIcon, TemplateIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { DocsService } from '../../doc';
import { DocDisplayMetaService } from '../../doc-display-meta';
import { WorkbenchLink, WorkbenchService } from '../../workbench';
import { TemplateDocService } from '../services/template-doc';
import * as styles from './styles.css';
const DocItem = ({ doc, onSelect, asLink }) => {
    const docDisplayService = useService(DocDisplayMetaService);
    const Icon = useLiveData(docDisplayService.icon$(doc.id));
    const title = useLiveData(docDisplayService.title$(doc.id));
    const onClick = useAsyncCallback(async () => {
        onSelect?.(doc.id);
    }, [doc.id, onSelect]);
    const menuItem = (_jsx(MenuItem, { prefixIcon: _jsx(Icon, {}), onClick: onClick, "data-testid": `template-doc-item-${doc.id}`, children: title }));
    if (asLink) {
        return _jsx(WorkbenchLink, { to: `/${doc.id}`, children: menuItem });
    }
    return menuItem;
};
const Empty = () => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.empty, children: [_jsx(InformationIcon, { className: styles.emptyIcon }), _jsx("span", { className: styles.emptyText, children: t['com.affine.template-list.empty']() }), _jsx("div", { className: styles.space }), _jsx("a", { href: "https://affine.pro/blog/how-to-use-template", target: "_blank", rel: "noopener noreferrer", className: styles.link, children: _jsx(IconButton, { icon: _jsx(DualLinkIcon, {}) }) })] }));
};
export const TemplateListMenuContent = ({ prefixItems, suffixItems, ...props }) => {
    const templateDocService = useService(TemplateDocService);
    const [templateDocs] = useState(() => templateDocService.list.getTemplateDocs());
    return (_jsxs("ul", { className: styles.list, children: [prefixItems, templateDocs.length ? (templateDocs.map(doc => _jsx(DocItem, { doc: doc, ...props }, doc.id))) : (_jsx(Empty, {})), suffixItems] }));
};
export const TemplateListMenuContentScrollable = (props) => {
    return (_jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Scrollbar, {}), _jsx(Scrollable.Viewport, { className: styles.scrollableViewport, children: _jsx(TemplateListMenuContent, { ...props }) })] }));
};
export const TemplateListMenu = ({ children, onSelect, asLink, prefixItems, suffixItems, contentOptions, ...otherProps }) => {
    return (_jsx(Menu, { items: _jsx(TemplateListMenuContentScrollable, { onSelect: onSelect, asLink: asLink, prefixItems: prefixItems, suffixItems: suffixItems }), contentOptions: {
            ...contentOptions,
            className: styles.menuContent,
        }, ...otherProps, children: children }));
};
export const TemplateListMenuAdd = () => {
    const t = useI18n();
    const docsService = useService(DocsService);
    const workbench = useService(WorkbenchService).workbench;
    const createNewTemplate = useCallback((e) => {
        const record = docsService.createDoc({ isTemplate: true });
        workbench.openDoc(record.id, { at: inferOpenMode(e) });
    }, [docsService, workbench]);
    return (_jsx(MenuItem, { "data-testid": "template-doc-item-create", prefixIcon: _jsx(TemplateIcon, {}), onClick: createNewTemplate, onAuxClick: createNewTemplate, children: t['com.affine.template-list.create-new']() }));
};
//# sourceMappingURL=template-list-menu.js.map