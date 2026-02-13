import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { TagListHeader, VirtualizedTagList, } from '@affine/core/components/page-list/tags';
import { CreateOrEditTag } from '@affine/core/components/page-list/tags/create-tag';
import { TagService, useDeleteTagConfirmModal } from '@affine/core/modules/tag';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { ViewBody, ViewHeader, ViewIcon, ViewTitle, } from '../../../../modules/workbench';
import { AllDocSidebarTabs } from '../layouts/all-doc-sidebar-tabs';
import { EmptyTagList } from '../page-list-empty';
import * as styles from './all-tag.css';
import { AllTagHeader } from './header';
const EmptyTagListHeader = () => {
    const [showCreateTagInput, setShowCreateTagInput] = useState(false);
    const handleOpen = useCallback(() => {
        setShowCreateTagInput(true);
    }, [setShowCreateTagInput]);
    return (_jsxs("div", { children: [_jsx(TagListHeader, { onOpen: handleOpen }), _jsx(CreateOrEditTag, { open: showCreateTagInput, onOpenChange: setShowCreateTagInput })] }));
};
export const AllTag = () => {
    const tagList = useService(TagService).tagList;
    const tags = useLiveData(tagList.tags$);
    const tagMetas = useLiveData(tagList.tagMetas$);
    const handleDeleteTags = useDeleteTagConfirmModal();
    const onTagDelete = useAsyncCallback(async (tagIds) => {
        await handleDeleteTags(tagIds);
    }, [handleDeleteTags]);
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsx(ViewTitle, { title: t['Tags']() }), _jsx(ViewIcon, { icon: "tag" }), _jsx(ViewHeader, { children: _jsx(AllTagHeader, {}) }), _jsx(ViewBody, { children: _jsx("div", { className: styles.body, children: tags.length > 0 ? (_jsx(VirtualizedTagList, { tags: tags, tagMetas: tagMetas, onTagDelete: onTagDelete })) : (_jsx(EmptyTagList, { heading: _jsx(EmptyTagListHeader, {}) })) }) }), _jsx(AllDocSidebarTabs, {})] }));
};
export const Component = () => {
    return _jsx(AllTag, {});
};
//# sourceMappingURL=index.js.map