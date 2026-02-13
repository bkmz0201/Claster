import { jsx as _jsx } from "react/jsx-runtime";
import { TagService } from '@affine/core/modules/tag';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { inferOpenMode } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { AllDocsIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { usePageHelper } from '../../../blocksuite/block-suite-page-list/utils';
import { ActionButton } from './action-button';
import docsIllustrationDark from './assets/docs.dark.png';
import docsIllustrationLight from './assets/docs.light.png';
import { EmptyLayout } from './layout';
export const EmptyDocs = ({ type = 'all', tagId, allowCreate = true, ...props }) => {
    const t = useI18n();
    const tagService = useService(TagService);
    const currentWorkspace = useService(WorkspaceService).workspace;
    const pageHelper = usePageHelper(currentWorkspace.docCollection);
    const tag = useLiveData(tagService.tagList.tagByTagId$(tagId));
    const showActionButton = type !== 'trash'; // && !BUILD_CONFIG.isMobileEdition;
    const onCreate = useCallback((e) => {
        const doc = pageHelper.createPage(undefined, {
            at: inferOpenMode(e),
        });
        if (tag)
            tag.tag(doc.id);
    }, [pageHelper, tag]);
    return (_jsx(EmptyLayout, { illustrationLight: docsIllustrationLight, illustrationDark: docsIllustrationDark, title: t['com.affine.empty.docs.title'](), description: type === 'trash'
            ? t['com.affine.empty.docs.trash-description']()
            : t['com.affine.empty.docs.all-description'](), action: allowCreate && showActionButton ? (_jsx(ActionButton, { onClick: onCreate, prefix: _jsx(AllDocsIcon, {}), children: t['com.affine.empty.docs.action.new-doc']() })) : null, ...props }));
};
//# sourceMappingURL=docs.js.map