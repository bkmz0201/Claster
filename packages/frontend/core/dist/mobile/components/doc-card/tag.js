import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TagService } from '@affine/core/modules/tag';
import { MoreHorizontalIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './tag.css';
const DocCardTag = ({ tag }) => {
    const name = useLiveData(tag.value$);
    const color = useLiveData(tag.color$);
    return (_jsx("li", { "data-name": name, "data-color": color, className: styles.tag, style: assignInlineVars({ [styles.tagColorVar]: color }), children: name }));
};
const DocCardTagsRenderer = ({ tags }) => {
    return (_jsxs("ul", { className: styles.tags, children: [tags.slice(0, 2).map(tag => (_jsx(DocCardTag, { tag: tag }, tag.id))), tags.length > 2 ? _jsx(MoreHorizontalIcon, { className: styles.more }) : null] }));
};
export const DocCardTags = ({ docId }) => {
    const tagService = useService(TagService);
    const tags = useLiveData(tagService.tagList.tagsByPageId$(docId));
    if (!tags.length)
        return null;
    return _jsx(DocCardTagsRenderer, { tags: tags });
};
//# sourceMappingURL=tag.js.map