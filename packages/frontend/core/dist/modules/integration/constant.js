import { DateTimeIcon, HistoryIcon, LinkIcon, ReadwiseLogoDuotoneIcon, TextIcon, } from '@blocksuite/icons/rc';
// name
export const INTEGRATION_TYPE_NAME_MAP = {
    readwise: 'com.affine.integration.name.readwise',
    // zotero: 'Zotero',
};
// schema
export const INTEGRATION_PROPERTY_SCHEMA = {
    readwise: {
        author: {
            order: '400',
            label: 'com.affine.integration.readwise-prop.author',
            key: 'author',
            type: 'text',
            icon: TextIcon,
        },
        source: {
            order: '300',
            label: 'com.affine.integration.readwise-prop.source',
            key: 'readwise_url',
            type: 'source',
            icon: LinkIcon,
        },
        created: {
            order: '100',
            label: 'com.affine.integration.readwise-prop.created',
            key: 'created_at',
            type: 'date',
            icon: DateTimeIcon,
        },
        updated: {
            order: '200',
            label: 'com.affine.integration.readwise-prop.updated',
            key: 'updated_at',
            type: 'date',
            icon: HistoryIcon,
        },
    },
    // zotero: {},
};
// icon
export const INTEGRATION_ICON_MAP = {
    readwise: ReadwiseLogoDuotoneIcon,
    // zotero: () => null,
};
//# sourceMappingURL=constant.js.map