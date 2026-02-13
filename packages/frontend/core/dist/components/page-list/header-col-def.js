import { jsx as _jsx } from "react/jsx-runtime";
import { Trans } from '@affine/i18n';
import { useMemo } from 'react';
import { ListHeaderTitleCell } from './page-header';
import { useAllDocDisplayProperties } from './use-all-doc-display-properties';
export const usePageHeaderColsDef = () => {
    const [displayProperties] = useAllDocDisplayProperties();
    return useMemo(() => [
        {
            key: 'title',
            content: _jsx(ListHeaderTitleCell, {}),
            flex: 6,
            alignment: 'start',
            sortable: true,
        },
        {
            key: 'tags',
            content: _jsx(Trans, { i18nKey: "Tags" }),
            flex: 3,
            alignment: 'end',
            hidden: !displayProperties.displayProperties.tags,
        },
        {
            key: 'createDate',
            content: _jsx(Trans, { i18nKey: "Created" }),
            flex: 1,
            sortable: true,
            alignment: 'end',
            hideInSmallContainer: true,
            hidden: !displayProperties.displayProperties.createDate,
        },
        {
            key: 'updatedDate',
            content: _jsx(Trans, { i18nKey: "Updated" }),
            flex: 1,
            sortable: true,
            alignment: 'end',
            hideInSmallContainer: true,
            hidden: !displayProperties.displayProperties.updatedDate,
        },
        {
            key: 'actions',
            content: '',
            flex: 1,
            alignment: 'end',
        },
    ], [displayProperties]);
};
export const collectionHeaderColsDef = [
    {
        key: 'title',
        content: _jsx(ListHeaderTitleCell, {}),
        flex: 9,
        alignment: 'start',
        sortable: true,
    },
];
export const tagHeaderColsDef = [
    {
        key: 'title',
        content: _jsx(ListHeaderTitleCell, {}),
        flex: 8,
        alignment: 'start',
        sortable: true,
    },
    {
        key: 'actions',
        content: '',
        flex: 1,
        alignment: 'end',
    },
];
//# sourceMappingURL=header-col-def.js.map