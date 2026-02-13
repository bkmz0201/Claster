import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { PropertyValue } from '@affine/component';
import { DocService } from '@affine/core/modules/doc';
import { TagService } from '@affine/core/modules/tag';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { TagsIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { useNavigateHelper } from '../hooks/use-navigate-helper';
import { WorkspaceTagsInlineEditor as TagsInlineEditorComponent, WorkspaceTagsInlineEditor, } from '../tags';
import * as styles from './tags.css';
export const TagsValue = ({ readonly }) => {
    const t = useI18n();
    const doc = useService(DocService).doc;
    const tagList = useService(TagService).tagList;
    const tagIds = useLiveData(tagList.tagIdsByPageId$(doc.id));
    const empty = !tagIds || tagIds.length === 0;
    return (_jsx(PropertyValue, { className: styles.container, isEmpty: empty, "data-testid": "property-tags-value", readonly: readonly, children: _jsx(TagsInlineEditor, { className: styles.tagInlineEditor, placeholder: t['com.affine.page-properties.property-value-placeholder'](), pageId: doc.id, onChange: () => { }, readonly: readonly }) }));
};
export const TagsFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const t = useI18n();
    const tagService = useService(TagService);
    const allTagMetas = useLiveData(tagService.tagList.tagMetas$);
    const menuRef = useRef(null);
    useEffect(() => {
        if (isDraft) {
            menuRef.current?.changeOpen(true);
        }
    }, [isDraft]);
    const selectedTags = useMemo(() => filter.value
        ?.split(',')
        .filter(id => allTagMetas.some(tag => tag.id === id)) ?? [], [filter, allTagMetas]);
    const handleSelectTag = useCallback((tagId) => {
        onChange({
            ...filter,
            value: [...selectedTags, tagId].join(','),
        });
    }, [filter, onChange, selectedTags]);
    const handleDeselectTag = useCallback((tagId) => {
        onChange({
            ...filter,
            value: selectedTags.filter(id => id !== tagId).join(','),
        });
    }, [filter, onChange, selectedTags]);
    useEffect(() => {
        if (isDraft &&
            (filter.method === 'is-not-empty' || filter.method === 'is-empty')) {
            onDraftCompleted?.();
        }
    }, [isDraft, filter.method, onDraftCompleted]);
    return filter.method !== 'is-not-empty' && filter.method !== 'is-empty' ? (_jsx(WorkspaceTagsInlineEditor, { placeholder: _jsx("span", { style: { color: cssVarV2('text/placeholder') }, children: t['com.affine.filter.empty']() }), selectedTags: selectedTags, onSelectTag: handleSelectTag, onDeselectTag: handleDeselectTag, menuClassName: styles.filterValueMenu, tagMode: "inline-tag", ref: menuRef, onEditorClose: onDraftCompleted })) : undefined;
};
const TagsInlineEditor = ({ pageId, readonly, placeholder, className, onChange, }) => {
    const workspace = useService(WorkspaceService);
    const tagService = useService(TagService);
    const tagIds$ = tagService.tagList.tagIdsByPageId$(pageId);
    const tagIds = useLiveData(tagIds$);
    const onSelectTag = useCallback((tagId) => {
        tagService.tagList.tagByTagId$(tagId).value?.tag(pageId);
        onChange?.(tagIds$.value);
    }, [onChange, pageId, tagIds$, tagService.tagList]);
    const onDeselectTag = useCallback((tagId) => {
        tagService.tagList.tagByTagId$(tagId).value?.untag(pageId);
        onChange?.(tagIds$.value);
    }, [onChange, pageId, tagIds$, tagService.tagList]);
    const navigator = useNavigateHelper();
    const jumpToTag = useCallback((id) => {
        navigator.jumpToTag(workspace.workspace.id, id);
    }, [navigator, workspace.workspace.id]);
    const t = useI18n();
    return (_jsx(TagsInlineEditorComponent, { tagMode: "inline-tag", jumpToTag: jumpToTag, readonly: readonly, placeholder: placeholder, className: className, selectedTags: tagIds, onSelectTag: onSelectTag, onDeselectTag: onDeselectTag, title: _jsxs(_Fragment, { children: [_jsx(TagsIcon, {}), t['Tags']()] }) }));
};
const TagName = ({ tag }) => {
    const name = useLiveData(tag.value$);
    return name;
};
const TagIcon = ({ tag, size = 8 }) => {
    const color = useLiveData(tag.color$);
    return (_jsx("div", { style: {
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: '50%',
        } }));
};
export const TagsDocListProperty = ({ doc }) => {
    const max = 3;
    const t = useI18n();
    const tagList = useService(TagService).tagList;
    const tags = useLiveData(tagList.tagsByPageId$(doc.id));
    const showRest = tags.length > max + 1;
    const visibleTags = tags.length === max + 1 ? max + 1 : max;
    return (_jsxs(_Fragment, { children: [tags.slice(0, visibleTags).map(tag => {
                return (_jsx(StackProperty, { icon: _jsx(TagIcon, { tag: tag }), children: _jsx(TagName, { tag: tag }) }, tag.id));
            }), showRest ? (_jsxs(StackProperty, { icon: null, children: [_jsxs("span", { children: ["+", tags.length - max] }), _jsx("span", { className: styles.moreTagsLabel, children: t['Tags']() })] })) : null] }));
};
export const TagsGroupHeader = ({ groupId, docCount }) => {
    const t = useI18n();
    const tagService = useService(TagService);
    const tag = useLiveData(tagService.tagList.tagByTagId$(groupId));
    if (!tag) {
        return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, icon: _jsx("div", { style: {
                    backgroundColor: cssVarV2.icon.secondary,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                } }), children: t['com.affine.page.display.grouping.group-by-tag.untagged']() }));
    }
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, icon: _jsx(TagIcon, { tag: tag }), children: _jsx(TagName, { tag: tag }) }));
};
//# sourceMappingURL=tags.js.map