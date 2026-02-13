import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FrameIcon } from '@blocksuite/icons/rc';
import { useDraggable, useDropTarget } from '../dnd';
import { MenuItem } from '../menu';
import { PropertyCollapsibleContent, PropertyCollapsibleSection, PropertyName, PropertyRoot, PropertyValue, } from './property';
export default {
    title: 'UI/Property',
};
export const SingleProperty = () => {
    return (_jsxs(_Fragment, { children: [_jsxs(PropertyRoot, { children: [_jsx(PropertyName, { name: "Name", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { children: "Value" })] }), _jsxs(PropertyRoot, { children: [_jsx(PropertyName, { name: "Long nameeeeeeeeeeeeeeeee", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { children: "Value" })] }), _jsxs(PropertyRoot, { children: [_jsx(PropertyName, { name: "With Menu", icon: _jsx(FrameIcon, {}), menuItems: _jsx(MenuItem, { children: "Menu" }) }), _jsx(PropertyValue, { children: "Value" })] }), _jsxs(PropertyRoot, { children: [_jsx(PropertyName, { name: "Readonly", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { readonly: true, children: "Readonly Value" })] })] }));
};
export const DNDProperty = () => {
    const { dragRef: dragRef1 } = useDraggable(() => ({
        data: { text: 'hello' },
    }), []);
    const { dragRef: dragRef2 } = useDraggable(() => ({
        data: { text: 'hello' },
    }), []);
    const { dropTargetRef, closestEdge } = useDropTarget(() => ({
        closestEdge: {
            allowedEdges: ['top', 'bottom'],
        },
    }), []);
    return (_jsxs(_Fragment, { children: [_jsxs(PropertyRoot, { ref: dragRef1, children: [_jsx(PropertyName, { name: "Draggable", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { children: "Value" })] }), _jsxs(PropertyRoot, { ref: dragRef2, children: [_jsx(PropertyName, { name: "Draggable Menu", icon: _jsx(FrameIcon, {}), menuItems: _jsx(MenuItem, { children: "Menu" }) }), _jsx(PropertyValue, { children: "Value" })] }), _jsxs(PropertyRoot, { ref: dropTargetRef, dropIndicatorEdge: closestEdge, children: [_jsx(PropertyName, { name: "DropTarget", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { children: "Value" })] })] }));
};
export const HideEmptyProperty = () => {
    return (_jsxs(_Fragment, { children: [_jsxs(PropertyRoot, { hideEmpty: true, children: [_jsx(PropertyName, { name: "Should not be hidden", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { children: "Value" })] }), _jsxs(PropertyRoot, { hideEmpty: true, children: [_jsx(PropertyName, { name: "Should be hidden", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { isEmpty: true, children: "Value" })] })] }));
};
export const BasicPropertyCollapsibleContent = () => {
    return (_jsxs(PropertyCollapsibleContent, { collapsible: true, children: [_jsxs(PropertyRoot, { children: [_jsx(PropertyName, { name: "Always show", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { children: "Value" })] }), _jsxs(PropertyRoot, { hideEmpty: true, children: [_jsx(PropertyName, { name: "Hide with empty", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { isEmpty: true, children: "Value" })] }), _jsxs(PropertyRoot, { hide: true, children: [_jsx(PropertyName, { name: "Hide", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { children: "Value" })] })] }));
};
export const BasicPropertyCollapsibleSection = () => {
    return (_jsx(PropertyCollapsibleSection, { icon: _jsx(FrameIcon, {}), title: "Collapsible Section", children: _jsx(BasicPropertyCollapsibleContent, {}) }));
};
export const PropertyCollapsibleCustomButton = () => {
    return (_jsxs(PropertyCollapsibleContent, { collapsible: true, collapseButtonText: ({ hide, isCollapsed }) => `${isCollapsed ? 'Show' : 'Hide'} ${hide} properties`, children: [_jsxs(PropertyRoot, { children: [_jsx(PropertyName, { name: "Always show", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { children: "Value" })] }), _jsxs(PropertyRoot, { hideEmpty: true, children: [_jsx(PropertyName, { name: "Hide with empty", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { isEmpty: true, children: "Value" })] }), _jsxs(PropertyRoot, { hide: true, children: [_jsx(PropertyName, { name: "Hide", icon: _jsx(FrameIcon, {}) }), _jsx(PropertyValue, { children: "Value" })] })] }));
};
//# sourceMappingURL=property.stories.js.map