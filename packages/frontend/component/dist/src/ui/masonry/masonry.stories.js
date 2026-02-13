import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useMemo, useState } from 'react';
import { RadioGroup } from '../radio';
import { ResizePanel } from '../resize-panel/resize-panel';
import { Masonry } from './masonry';
export default {
    title: 'UI/Masonry',
};
const Card = ({ children, listView, }) => {
    return (_jsxs("div", { style: {
            width: '100%',
            height: '100%',
            borderRadius: listView ? 0 : 10,
            border: listView
                ? '0px solid rgba(100, 100, 100, 0.2)'
                : '1px solid rgba(100, 100, 100, 0.2)',
            boxShadow: listView ? 'none' : '0 1px 10px rgba(0, 0, 0, 0.1)',
            padding: listView ? '0px 20px' : 10,
            backgroundColor: listView ? 'transparent' : 'white',
            display: 'flex',
            flexDirection: listView ? 'row' : 'column',
            gap: 8,
            alignItems: listView ? 'center' : 'flex-start',
        }, children: [children, listView && (_jsx("div", { style: {
                    position: 'absolute',
                    top: `calc(100% + 5px)`,
                    left: 0,
                    borderBottom: `0.5px solid rgba(100, 100, 100, 0.2)`,
                    width: '100%',
                } }))] }));
};
const basicCards = Array.from({ length: 10000 }, (_, i) => {
    return {
        id: 'card-' + i,
        height: Math.round(100 + Math.random() * 100),
        children: (_jsxs(Card, { children: [_jsx("h1", { children: "Hello" }), _jsx("p", { children: "World" }), i] })),
    };
});
export const BasicVirtualScroll = () => {
    return (_jsx(ResizePanel, { width: 800, height: 600, children: _jsx(Masonry, { gapX: 10, gapY: 10, style: { width: '100%', height: '100%' }, paddingX: 12, paddingY: 12, virtualScroll: true, items: basicCards }) }));
};
const transitionCards = Array.from({ length: 10000 }, (_, i) => {
    return {
        id: 'card-' + i,
        height: Math.round(100 + Math.random() * 100),
        children: _jsx(Card, { children: i }),
        style: { transition: 'transform 0.2s ease' },
    };
});
export const CustomTransition = () => {
    return (_jsx(ResizePanel, { width: 800, height: 600, children: _jsx(Masonry, { gapX: 10, gapY: 10, style: { width: '100%', height: '100%' }, paddingX: 12, paddingY: 12, virtualScroll: true, items: transitionCards, locateMode: "transform3d" }) }));
};
const groups = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
    return {
        id: letter,
        height: 20,
        children: _jsxs("h1", { children: ["Group header: ", letter] }),
        items: Array.from({ length: 100 }, (_, i) => {
            return {
                id: i,
                height: Math.round(100 + Math.random() * 100),
                children: (_jsxs(Card, { children: [_jsxs("div", { children: ["Group: ", letter] }), _jsxs("div", { children: ["Item: ", i] })] })),
            };
        }),
    };
});
export const GroupVirtualScroll = () => {
    return (_jsx(ResizePanel, { width: 800, height: 600, children: _jsx(Masonry, { gapX: 10, gapY: 10, style: { width: '100%', height: '100%' }, paddingX: 12, paddingY: 12, virtualScroll: true, groupsGap: 10, groupHeaderGapWithItems: 10, items: groups, locateMode: "transform3d" }) }));
};
const GroupHeader = memo(function GroupHeader({ groupId, collapsed, itemCount, }) {
    return (_jsx("header", { style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
        }, children: _jsxs("h1", { children: ["Group header: ", groupId, " - ", itemCount, " items", ' ', _jsx("span", { style: {
                        display: 'inline-block',
                        transform: `rotate(${collapsed ? 0 : 90}deg)`,
                        transition: 'transform 0.2s ease',
                    }, children: ">" })] }) }));
});
const GroupItem = ({ groupId, itemId, view, }) => {
    return (_jsxs(Card, { listView: view === 'List', children: [_jsxs("div", { children: ["Group: ", groupId] }), _jsxs("div", { children: ["Item: ", itemId] })] }));
};
const viewGroups = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
    return {
        id: letter,
        height: 40,
        Component: GroupHeader,
        style: { transition: 'all 0.4s cubic-bezier(.4,.22,0,.98)' },
        items: Array.from({ length: Math.round(50 + Math.random() * 50) }, (_, i) => {
            return {
                id: `${i}`,
                height: {
                    List: 32,
                    Masonry: Math.round(100 + Math.random() * 100),
                    Grid: 100,
                },
                style: { transition: 'all 0.4s cubic-bezier(.4,.22,0,.98)' },
            };
        }),
    };
});
export const MultiViewTransition = () => {
    const [view, setView] = useState('List');
    const [collapsedGroups, setCollapsedGroups] = useState([]);
    const groups = useMemo(() => {
        return viewGroups.map(({ items, ...g }) => ({
            ...g,
            items: items.map(({ height, ...item }) => ({
                ...item,
                height: height[view],
                children: _jsx(GroupItem, { groupId: g.id, itemId: item.id, view: view }),
            })),
        }));
    }, [view]);
    const onGroupCollapse = useCallback((groupId, collapsed) => {
        setCollapsedGroups(prev => {
            return collapsed ? [...prev, groupId] : prev.filter(id => id !== groupId);
        });
    }, []);
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            alignItems: 'center',
        }, children: [_jsx(RadioGroup, { items: ['Masonry', 'Grid', 'List'], value: view, onChange: setView, width: 300 }), _jsx(ResizePanel, { width: 800, height: 600, offsetModifier: useCallback(([x, y]) => [x * 2, y], []), children: _jsx(Masonry, { gapX: 10, gapY: 10, style: { width: '100%', height: '100%' }, paddingX: 12, paddingY: 0, virtualScroll: true, groupsGap: 10, groupHeaderGapWithItems: 10, items: groups, locateMode: "transform3d", columns: view === 'List' ? 1 : undefined, collapsedGroups: collapsedGroups, onGroupCollapse: onGroupCollapse }) })] }));
};
const availableRatios = [0.8, 1.2, 1.4, 1.5, 1.6, 1.7, 1.8];
const ratioItems = Array.from({ length: 10000 }, (_, i) => {
    const ratio = availableRatios[Math.floor(Math.random() * availableRatios.length)];
    return {
        id: i.toString(),
        ratio,
        children: (_jsxs(Card, { children: [i, " ", _jsx("br", {}), " ratio: ", ratio] })),
    };
});
export const HeightByRatio = () => {
    return (_jsx(ResizePanel, { width: 800, height: 600, children: _jsx(Masonry, { gapX: 10, gapY: 10, style: { width: '100%', height: '100%' }, paddingX: 12, paddingY: 12, items: ratioItems, virtualScroll: true, itemWidthMin: 120 }) }));
};
//# sourceMappingURL=masonry.stories.js.map