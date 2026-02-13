import { jsx as _jsx } from "react/jsx-runtime";
import { HighlightText } from '@affine/core/modules/quicksearch/views/highlight-text';
import { isI18nString, useI18n } from '@affine/i18n';
export const SearchResLabel = ({ item }) => {
    const i18n = useI18n();
    return (_jsx(HighlightText, { text: i18n.t(isI18nString(item.label) ? item.label : item.label.title), start: "<b>", end: "</b>" }));
};
//# sourceMappingURL=search-res-label.js.map