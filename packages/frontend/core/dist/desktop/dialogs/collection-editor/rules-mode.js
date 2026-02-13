import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, IconButton, Masonry, Tooltip, } from '@affine/component';
import { createDocExplorerContext, DocExplorerContext, } from '@affine/core/components/explorer/context';
import { DocListItemComponent } from '@affine/core/components/explorer/docs-view/docs-list';
import { Filters } from '@affine/core/components/filter';
import { AffineShapeIcon } from '@affine/core/components/page-list';
import { CollectionRulesService } from '@affine/core/modules/collection-rules';
import { DocsService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { Trans, useI18n } from '@affine/i18n';
import { CloseIcon, EdgelessIcon, PageIcon, ToggleRightIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import clsx from 'clsx';
import { memo, useEffect, useMemo, useState } from 'react';
import * as styles from './edit-collection.css';
export const RulesMode = ({ collection, updateCollection, reset, buttons, switchMode, }) => {
    const t = useI18n();
    const [showPreview, setShowPreview] = useState(true);
    const docsService = useService(DocsService);
    const collectionRulesService = useService(CollectionRulesService);
    const [rulesPageIds, setRulesPageIds] = useState([]);
    const [docExplorerContextValue] = useState(() => createDocExplorerContext({
        displayProperties: ['createdAt', 'updatedAt', 'tags'],
        showDragHandle: false,
        showMoreOperation: false,
        quickFavorite: true,
        groupBy: undefined,
        orderBy: undefined,
    }));
    useEffect(() => {
        const subscription = collectionRulesService
            .watch({
            filters: collection.rules.filters,
            extraFilters: [
                {
                    type: 'system',
                    key: 'trash',
                    method: 'is',
                    value: 'false',
                },
                {
                    type: 'system',
                    key: 'empty-journal',
                    method: 'is',
                    value: 'false',
                },
            ],
            orderBy: {
                type: 'system',
                key: 'updatedAt',
                desc: true,
            },
        })
            .subscribe(rules => {
            setRulesPageIds(rules.groups.flatMap(group => group.items));
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [collection, collectionRulesService]);
    const masonryItems = useMemo(() => [
        {
            id: 'rules-group',
            height: 0,
            children: null,
            items: rulesPageIds.length
                ? rulesPageIds.map(docId => {
                    return {
                        id: docId,
                        height: 42,
                        Component: DocListItemComponent,
                    };
                })
                : [
                    {
                        id: 'rules-empty',
                        height: 300,
                        children: (_jsx(RulesEmpty, { noRules: collection.rules.filters.length === 0, fullHeight: true })),
                    },
                ],
        },
        {
            id: 'allow-list-group',
            height: 30,
            children: (_jsx("div", { className: styles.includeListTitle, children: t['com.affine.editCollection.rules.include.title']() })),
            className: styles.includeListGroup,
            items: collection.allowList.map(docId => {
                return {
                    id: docId,
                    height: 42,
                    Component: DocListItemComponent,
                };
            }),
        },
    ], [collection.allowList, collection.rules.filters.length, rulesPageIds, t]);
    const [expandInclude, setExpandInclude] = useState(collection.allowList.length > 0);
    const tips = useMemo(() => (_jsx(Trans, { i18nKey: "com.affine.editCollection.rules.tips", values: {
            highlight: t['com.affine.editCollection.rules.tips.highlight'](),
        }, components: {
            2: _jsx("span", { className: styles.rulesTitleHighlight }),
        } })), [t]);
    return (_jsxs(_Fragment, { children: [_jsx(Tooltip, { content: tips, children: _jsx("div", { className: clsx(styles.rulesTitle, styles.ellipsis), children: tips }) }), _jsxs("div", { className: styles.rulesContainer, children: [_jsxs("div", { className: styles.rulesContainerLeft, children: [_jsx("div", { className: styles.rulesContainerLeftTab, children: switchMode }), _jsx("div", { className: styles.rulesContainerLeftContent, children: _jsxs("div", { style: {
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 8,
                                        overflowY: 'auto',
                                    }, children: [_jsx(Filters, { filters: collection.rules.filters, onChange: filters => {
                                                updateCollection({
                                                    ...collection,
                                                    rules: {
                                                        ...collection.rules,
                                                        filters,
                                                    },
                                                });
                                            } }), _jsxs("div", { className: styles.rulesContainerLeftContentInclude, children: [collection.allowList.length > 0 ? (_jsxs("div", { className: styles.includeTitle, children: [_jsx(IconButton, { onClick: () => setExpandInclude(!expandInclude), iconStyle: {
                                                                transform: expandInclude ? 'rotate(90deg)' : undefined,
                                                            }, icon: _jsx(ToggleRightIcon, {}) }), _jsx("div", { style: { color: cssVar('textSecondaryColor') }, children: t['com.affine.editCollection.rules.include.title']() })] })) : null, _jsx("div", { style: {
                                                        display: expandInclude ? 'flex' : 'none',
                                                        flexWrap: 'wrap',
                                                        gap: '8px 16px',
                                                    }, children: collection.allowList.map(id => {
                                                        return (_jsxs("div", { className: styles.includeItem, children: [_jsxs("div", { className: styles.includeItemContent, children: [_jsxs("div", { style: {
                                                                                display: 'flex',
                                                                                gap: 6,
                                                                                alignItems: 'center',
                                                                            }, children: [docsService.list.getPrimaryMode(id) ===
                                                                                    'edgeless' ? (_jsx(EdgelessIcon, { style: { width: 16, height: 16 } })) : (_jsx(PageIcon, { style: { width: 16, height: 16 } })), t['com.affine.editCollection.rules.include.page']()] }), _jsx("div", { className: styles.includeItemContentIs, children: t['com.affine.editCollection.rules.include.is']() }), _jsx(DocTitle, { id: id })] }), _jsx(IconButton, { size: "14", icon: _jsx(CloseIcon, {}), onClick: () => {
                                                                        updateCollection({
                                                                            ...collection,
                                                                            allowList: collection.allowList.filter(v => v !== id),
                                                                        });
                                                                    } })] }, id));
                                                    }) })] })] }) })] }), _jsx("div", { className: styles.rulesContainerRight, children: _jsx(DocExplorerContext.Provider, { value: docExplorerContextValue, children: _jsx(Masonry, { items: masonryItems, columns: 1, gapY: 12, virtualScroll: true, paddingX: 12, groupHeaderGapWithItems: 12, groupsGap: 12 }) }) })] }), _jsxs("div", { className: styles.rulesBottom, children: [_jsxs("div", { className: styles.bottomLeft, children: [_jsx(Button, { onClick: () => {
                                    setShowPreview(!showPreview);
                                }, children: t['com.affine.editCollection.rules.preview']() }), _jsx(Button, { variant: "plain", onClick: reset, children: t['com.affine.editCollection.rules.reset']() }), _jsx("div", { className: styles.previewCountTips, children: _jsxs(Trans, { i18nKey: "com.affine.editCollection.rules.countTips", values: {
                                        selectedCount: collection.allowList.length,
                                        filteredCount: rulesPageIds.length,
                                    }, children: ["Selected", _jsx("span", { className: styles.previewCountTipsHighlight, children: "count" }), ", filtered", _jsx("span", { className: styles.previewCountTipsHighlight, children: "count" })] }) })] }), _jsx("div", { style: { display: 'flex', alignItems: 'center', gap: 20 }, children: buttons })] })] }));
};
const RulesEmpty = ({ noRules, fullHeight, }) => {
    const t = useI18n();
    return (_jsxs("div", { style: {
            height: fullHeight ? '100%' : '70%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            padding: '48px 0',
        }, children: [_jsx(AffineShapeIcon, {}), _jsx("strong", { style: { fontSize: 20, lineHeight: '28px' }, children: noRules
                    ? t['com.affine.editCollection.rules.empty.noRules']()
                    : t['com.affine.editCollection.rules.empty.noResults']() }), _jsx("div", { style: {
                    width: '389px',
                    textAlign: 'center',
                    fontSize: 15,
                    lineHeight: '24px',
                }, children: noRules ? (_jsxs(Trans, { i18nKey: "com.affine.editCollection.rules.empty.noRules.tips", children: ["Please ", _jsx("strong", { children: "add rules" }), " to save this collection or switch to ", _jsx("strong", { children: "Pages" }), ", use manual selection mode"] })) : (t['com.affine.editCollection.rules.empty.noResults.tips']()) })] }));
};
const DocTitle = memo(function DocTitle({ id }) {
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const docsService = useService(DocsService);
    const doc = useLiveData(docsService.list.doc$(id));
    const trash = useLiveData(doc?.trash$);
    const title = useLiveData(docDisplayMetaService.title$(id));
    return (_jsx("div", { className: clsx(styles.includeItemTitle, trash && styles.trashTitle, styles.ellipsis), children: title }));
});
//# sourceMappingURL=rules-mode.js.map