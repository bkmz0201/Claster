import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, PropertyCollapsibleContent, PropertyCollapsibleSection, PropertyName, } from '@affine/component';
import { AffinePageReference } from '@affine/core/components/affine/reference-link';
import { DocService } from '@affine/core/modules/doc';
import { TemplateDocService } from '@affine/core/modules/template-doc';
import { useI18n } from '@affine/i18n';
import { DatabaseTableViewIcon, PageIcon } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
import { DocDatabaseBacklinksService } from '../../services/doc-database-backlinks';
import { DatabaseRendererTypes } from './constant';
import * as styles from './doc-database-backlink-info.css';
const DatabaseBacklinkCellName = ({ cell, config, }) => {
    const propertyName = useLiveData(cell.property.name$);
    const t = useI18n();
    return (_jsx(PropertyName, { icon: _jsx(config.Icon, {}), name: propertyName ?? (config.name ? t.t(config.name) : t['unnamed']()) }));
};
const DatabaseBacklinkCell = ({ cell, dataSource, rowId, onChange, }) => {
    const cellType = useLiveData(cell.property.type$);
    const config = cellType ? DatabaseRendererTypes[cellType] : undefined;
    // do not render title cell!
    if (!config || cellType === 'title') {
        return null;
    }
    return (_jsxs("li", { className: styles.cell, "data-testid": "database-backlink-cell", children: [_jsx(DatabaseBacklinkCellName, { cell: cell, config: config }), _jsx(config.Renderer, { cell: cell, dataSource: dataSource, rowId: rowId, onChange: onChange })] }, cell.id));
};
/**
 * A row in the database backlink info.
 * Note: it is being rendered in a list. The name might be confusing.
 */
const DatabaseBacklinkRow = ({ defaultOpen = false, row$, onChange, }) => {
    const row = useLiveData(useMemo(() => LiveData.from(row$, undefined), [row$]));
    const sortedCells = useMemo(() => {
        return row?.cells
            .filter(cell => cell.property.id !== 'title')
            .toSorted((a, b) => {
            return (a.property.name$.value ?? '').localeCompare(b.property.name$.value ?? '');
        });
    }, [row?.cells]);
    const t = useI18n();
    const templateDocService = useService(TemplateDocService);
    const isTemplateDoc = useLiveData(useMemo(() => row?.docId ? templateDocService.list.isTemplate$(row.docId) : undefined, [row?.docId, templateDocService.list]));
    const pageRefParams = useMemo(() => {
        const params = new URLSearchParams();
        if (row?.id) {
            params.set('blockIds', row.databaseId);
        }
        return params;
    }, [row]);
    if (!row || !sortedCells || sortedCells.length === 0 || isTemplateDoc) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(PropertyCollapsibleSection, { title: _jsxs("span", { className: styles.databaseNameWrapper, children: [_jsx("span", { className: styles.databaseName, children: row.databaseName || t['unnamed']() }), t['properties']()] }), defaultCollapsed: !defaultOpen, icon: _jsx(DatabaseTableViewIcon, {}), suffix: _jsx(AffinePageReference, { className: BUILD_CONFIG.isMobileEdition
                        ? styles.mobileDocRefLink
                        : styles.docRefLink, pageId: row.docId, params: pageRefParams, Icon: PageIcon }), children: _jsx(PropertyCollapsibleContent, { className: styles.cellList, collapsible: false, children: sortedCells.map(cell => {
                        return (_jsx(DatabaseBacklinkCell, { cell: cell, dataSource: row.dataSource, rowId: row.id, onChange: value => onChange?.(row, cell, value) }, cell.id));
                    }) }) }), _jsx(Divider, { size: "thinner", className: styles.divider })] }));
};
export const DocDatabaseBacklinkInfo = ({ defaultOpen, onChange, }) => {
    const doc = useService(DocService).doc;
    const docDatabaseBacklinks = useService(DocDatabaseBacklinksService);
    const rows = useLiveData(useMemo(() => LiveData.from(docDatabaseBacklinks.watchDbBacklinkRows$(doc.id, defaultOpen), []), [docDatabaseBacklinks, doc.id, defaultOpen]));
    if (!rows.length) {
        return null;
    }
    return (_jsx("div", { className: styles.root, children: rows.map(({ docId, databaseBlockId, rowId, row$ }) => (_jsx(DatabaseBacklinkRow, { defaultOpen: defaultOpen?.some(backlink => backlink.databaseBlockId === databaseBlockId &&
                backlink.rowId === rowId &&
                backlink.docId === docId) ?? false, "row$": row$, onChange: onChange }, `${docId}-${rowId}`))) }));
};
//# sourceMappingURL=doc-database-backlink-info.js.map