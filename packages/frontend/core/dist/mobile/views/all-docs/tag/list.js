import { jsx as _jsx } from "react/jsx-runtime";
import { EmptyTags } from '@affine/core/components/affine/empty';
import { TagService } from '@affine/core/modules/tag';
import { useLiveData, useService } from '@toeverything/infra';
import { TagItem } from './item';
import { list } from './styles.css';
export const TagList = () => {
    const tagList = useService(TagService).tagList;
    const tags = useLiveData(tagList.tags$);
    if (!tags.length) {
        return _jsx(EmptyTags, { absoluteCenter: true });
    }
    return (_jsx("ul", { className: list, children: tags.map(tag => (_jsx(TagItem, { tag: tag }, tag.id))) }));
};
//# sourceMappingURL=list.js.map