import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SearchIcon } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useState } from 'react';
import { IconButton } from '../../../button';
import Input from '../../../input';
import { Menu } from '../../../menu';
import * as pickerStyles from '../picker.css';
// import { emojiGroupList } from './gen-data';
import * as styles from './emoji-picker.css';
import { EmojiGroups } from './groups';
import { useRecentEmojis } from './recent';
const skinList = [
    { unicode: '👋', value: undefined },
    { unicode: '👋🏻', value: 0 },
    { unicode: '👋🏼', value: 1 },
    { unicode: '👋🏽', value: 2 },
    { unicode: '👋🏾', value: 3 },
    { unicode: '👋🏿', value: 4 },
];
export const EmojiPicker = ({ onSelect, }) => {
    const [keyword, setKeyword] = useState('');
    const [skin, setSkin] = useState(undefined);
    const { add: addRecent, recentEmojis } = useRecentEmojis();
    const handleEmojiSelect = useCallback((emoji) => {
        addRecent(emoji);
        onSelect?.(emoji);
    }, [addRecent, onSelect]);
    return (_jsxs("div", { className: pickerStyles.root, children: [_jsxs("header", { className: pickerStyles.searchContainer, children: [_jsx(Input, { value: keyword, onChange: setKeyword, className: pickerStyles.searchInput, preFix: _jsx("div", { style: { marginLeft: 10, lineHeight: 0 }, children: _jsx(SearchIcon, { style: { color: cssVarV2.icon.primary, fontSize: 16 } }) }), placeholder: "Filter..." }), _jsx(Menu, { contentOptions: {
                            align: 'center',
                            side: 'bottom',
                            sideOffset: 4,
                            style: { minWidth: 140 },
                        }, items: _jsx("ul", { className: styles.skinList, children: skinList.map(skin => (_jsx(IconButton, { className: styles.skinItem, style: { padding: 3 }, size: 18, icon: _jsx("span", { children: skin.unicode }), onClick: () => setSkin(skin.value) }, skin.unicode))) }), children: _jsx(IconButton, { size: 18, style: {
                                width: 32,
                                height: 32,
                                border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
                            }, icon: _jsx("span", { children: skin !== undefined
                                    ? skinList[skin + 1].unicode
                                    : skinList[0].unicode }) }) })] }), _jsx(EmojiGroups, { recent: recentEmojis, onSelect: handleEmojiSelect, keyword: keyword, skin: skin })] }));
};
//# sourceMappingURL=emoji-picker.js.map