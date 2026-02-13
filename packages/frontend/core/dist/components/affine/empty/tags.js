import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import tagsDark from './assets/tag-list.dark.png';
import tagsLight from './assets/tag-list.light.png';
import { EmptyLayout } from './layout';
export const EmptyTags = (props) => {
    const t = useI18n();
    return (_jsx(EmptyLayout, { illustrationLight: tagsLight, illustrationDark: tagsDark, title: t['com.affine.empty.tags.title'](), description: t['com.affine.empty.tags.description'](), ...props }));
};
//# sourceMappingURL=tags.js.map