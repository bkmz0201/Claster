import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseIcon, ExportToHtmlIcon, ExportToMarkdownIcon, HelpIcon, NewIcon, NotionIcon, } from '@blocksuite/icons/rc';
import { IconButton } from '../../ui/button';
import { Tooltip } from '../../ui/tooltip';
import { BlockCard } from '../card/block-card';
import { importPageBodyStyle, importPageButtonContainerStyle, importPageContainerStyle, } from './index.css';
/**
 * @deprecated Not used
 */
export const ImportPage = ({ importMarkdown, importHtml, importNotion, onClose, }) => (_jsxs("div", { className: importPageContainerStyle, children: [_jsx(IconButton, { style: {
                position: 'absolute',
                right: 6,
                top: 6,
            }, onClick: () => {
                onClose();
            }, children: _jsx(CloseIcon, {}) }), _jsxs("div", { className: importPageBodyStyle, children: [_jsx("div", { className: "title", children: "Import" }), _jsxs("span", { children: ["AFFiNE will gradually support more and more file types for import.\u00A0", _jsx("a", { href: "https://community.affine.pro/c/feature-requests/import-export", target: "_blank", rel: "noreferrer", children: "Provide feedback." })] })] }), _jsxs("div", { className: importPageButtonContainerStyle, children: [_jsx(BlockCard, { left: _jsx(ExportToMarkdownIcon, { width: 20, height: 20 }), title: "Markdown", onClick: importMarkdown }), _jsx(BlockCard, { left: _jsx(ExportToHtmlIcon, { width: 20, height: 20 }), title: "HTML", onClick: importHtml }), _jsx(BlockCard, { left: _jsx(NotionIcon, { width: 20, height: 20 }), title: "Notion", right: _jsx(Tooltip, { content: 'Learn how to Import your Notion pages into AFFiNE.', children: _jsx(HelpIcon, { width: 20, height: 20 }) }), onClick: importNotion }), _jsx(BlockCard, { left: _jsx(NewIcon, { width: 20, height: 20 }), title: "Coming soon...", disabled: true, onClick: importHtml })] })] }));
//# sourceMappingURL=index.js.map