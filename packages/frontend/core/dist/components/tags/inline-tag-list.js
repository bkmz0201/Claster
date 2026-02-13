import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as styles from './inline-tag-list.css';
import { TagItem } from './tag';
export const InlineTagList = ({ children, focusedIndex, tags, onRemoved, tagMode, }) => {
    return (_jsxs("div", { className: styles.inlineTagsContainer, "data-testid": "inline-tags-list", children: [tags.map((tag, idx) => {
                if (!tag) {
                    return null;
                }
                const handleRemoved = onRemoved
                    ? () => {
                        onRemoved?.(tag.id);
                    }
                    : undefined;
                return (_jsx(TagItem, { idx: idx, focused: focusedIndex === idx, onRemoved: handleRemoved, mode: tagMode, tag: tag }, tag.id));
            }), children] }));
};
//# sourceMappingURL=inline-tag-list.js.map