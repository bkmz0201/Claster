import { jsx as _jsx } from "react/jsx-runtime";
import { TagItem as TagItemComponent } from '@affine/core/components/tags';
import { useLiveData } from '@toeverything/infra';
export const TagItem = ({ tag, ...props }) => {
    const value = useLiveData(tag?.value$);
    const color = useLiveData(tag?.color$);
    if (!tag || !value || !color) {
        return null;
    }
    return (_jsx(TagItemComponent, { ...props, mode: props.mode === 'inline' ? 'inline-tag' : 'list-tag', tag: {
            id: tag?.id,
            name: value,
            color: color,
        } }));
};
//# sourceMappingURL=page-tags.js.map