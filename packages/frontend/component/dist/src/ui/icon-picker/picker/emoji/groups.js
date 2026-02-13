import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RecentIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { createContext, memo, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState, } from 'react';
import { IconButton } from '../../../button';
import { Loading } from '../../../loading';
import { Masonry, } from '../../../masonry';
import * as pickerStyles from '../picker.css';
import { GROUP_ICON_MAP, GROUPS } from './constants';
import rawData from './data/en.json';
import { EmojiButton } from './emoji-button';
import * as styles from './emoji-picker.css';
const emojiGroupList = rawData;
const initEmojiGroupMap = () => {
    const emojiGroupMap = new Map();
    emojiGroupList.forEach(group => {
        emojiGroupMap.set(group.name, new Map(group.emojis.map(emoji => [emoji.label, emoji])));
    });
    return emojiGroupMap;
};
const emojiGroupMap = initEmojiGroupMap();
const EmojiGroupContext = createContext({
    onSelect: () => { },
});
const RecentGroupItem = memo(function RecentGroupItem({ itemId, }) {
    const { onSelect } = useContext(EmojiGroupContext);
    return _jsx(EmojiButton, { emoji: itemId, onSelect: onSelect });
});
const EmojiGroupItem = memo(function EmojiGroupItem({ groupId, itemId, }) {
    const emoji = emojiGroupMap.get(groupId)?.get(itemId);
    const { onSelect, skin } = useContext(EmojiGroupContext);
    if (!emoji)
        return null;
    return (_jsx(EmojiButton, { emoji: skin !== undefined && emoji.skins
            ? (emoji.skins[skin]?.unicode ?? emoji.unicode)
            : emoji.unicode, onSelect: onSelect }));
});
const EmojiGroupHeader = memo(function EmojiGroupHeader({ groupId, }) {
    return (_jsx("div", { className: pickerStyles.groupName, "data-group-name": groupId, children: groupId }));
});
// Memoized emoji groups to prevent unnecessary re-renders
export const EmojiGroups = memo(function EmojiGroups({ recent, onSelect, keyword, skin, }) {
    const masonryRef = useRef(null);
    const [activeGroupId, setActiveGroupId] = useState('Recent');
    const [groups, setGroups] = useState([]);
    const loading = !keyword && !groups.length;
    useEffect(() => {
        if (!keyword) {
            setGroups(emojiGroupList);
            return;
        }
        startTransition(() => {
            setGroups(emojiGroupList
                .map(group => ({
                ...group,
                emojis: group.emojis.filter(emoji => emoji.tags?.some(tag => tag.includes(keyword.toLowerCase()))),
            }))
                .filter(group => group.emojis.length > 0));
        });
    }, [keyword]);
    const items = useMemo(() => {
        const emojiGroups = groups.map(group => {
            return {
                id: group.name,
                height: 30,
                Component: EmojiGroupHeader,
                items: group.emojis.map(emoji => {
                    return {
                        id: emoji.label,
                        height: 32,
                        ratio: 1,
                        Component: EmojiGroupItem,
                    };
                }),
            };
        });
        if (recent?.length) {
            emojiGroups.unshift({
                id: 'Recent',
                height: 30,
                Component: EmojiGroupHeader,
                items: recent.map(emoji => {
                    return {
                        id: emoji,
                        height: 32,
                        ratio: 1,
                        Component: RecentGroupItem,
                    };
                }),
            });
        }
        return emojiGroups;
    }, [groups, recent]);
    const contextValue = useMemo(() => ({ onSelect, skin }), [onSelect, skin]);
    const jumpToGroup = useCallback((groupName) => {
        setActiveGroupId(groupName);
        masonryRef.current?.scrollToGroup(groupName);
    }, []);
    if (loading) {
        return (_jsxs("div", { className: styles.loadingWrapper, children: [_jsx(Loading, { size: 16 }), _jsx("span", { style: { marginLeft: 4 }, children: "Loading emojis..." })] }));
    }
    return (_jsxs(EmojiGroupContext.Provider, { value: contextValue, children: [_jsx("div", { className: pickerStyles.emojiScrollRoot, children: _jsx(Masonry, { ref: masonryRef, virtualScroll: true, items: items, itemWidthMin: 32, itemWidth: 32, paddingX: 12, paddingY: 8, gapX: 4, gapY: 4, onStickyGroupChange: setActiveGroupId }) }), _jsx("div", { className: styles.footer, children: ['Recent', ...GROUPS].map(group => {
                    const Icon = GROUP_ICON_MAP[group] ?? RecentIcon;
                    const active = activeGroupId === group;
                    return (_jsx(IconButton, { size: 18, style: { padding: 3 }, icon: _jsx(Icon, { className: active ? styles.footerIconActive : styles.footerIcon }), className: clsx(active ? styles.footerButtonActive : styles.footerButton), onClick: () => jumpToGroup(group) }, group));
                }) })] }));
});
//# sourceMappingURL=groups.js.map