import { jsx as _jsx } from "react/jsx-runtime";
import { NewPageButton } from '../components/new-page-button';
import * as styles from './page-list-new-page-button.css';
export const PageListNewPageButton = ({ className, children, size, onCreateDoc, onCreatePage, onCreateEdgeless, onImportFile, ...props }) => {
    return (_jsx("div", { className: className, ...props, children: _jsx(NewPageButton, { size: size, importFile: onImportFile, createNewDoc: onCreateDoc, createNewEdgeless: onCreateEdgeless, createNewPage: onCreatePage, children: _jsx("div", { className: styles.newPageButtonLabel, children: children }) }) }));
};
//# sourceMappingURL=page-list-new-page-button.js.map