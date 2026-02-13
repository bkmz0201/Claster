import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cssVar } from '@toeverything/theme';
import { cloneDeep } from 'lodash-es';
import { useCallback, useState } from 'react';
import { DropIndicator, useDraggable, useDropTarget, } from './index';
export default {
    title: 'UI/Dnd',
};
export const Draggable = ({ canDrag, disableDragPreview }) => {
    const { dragRef } = useDraggable(() => ({
        canDrag,
        disableDragPreview,
    }), [canDrag, disableDragPreview]);
    return (_jsxs("div", { children: [_jsx("style", { children: `.draggable[data-dragging='true'] {
          opacity: 0.3;
        }` }), _jsx("div", { className: "draggable", ref: dragRef, children: "Drag here" })] }));
};
Draggable.args = {
    canDrag: true,
    disableDragPreview: false,
};
export const DraggableCustomPreview = () => {
    const { dragRef, CustomDragPreview } = useDraggable(() => ({}), []);
    return (_jsxs("div", { children: [_jsx("div", { ref: dragRef, children: "Drag here" }), _jsx(CustomDragPreview, { children: _jsx("div", { children: "Dragging\uD83E\uDD0C" }) })] }));
};
export const DraggableControlledPreview = () => {
    const { dragRef, draggingPosition } = useDraggable(() => ({
        disableDragPreview: true,
    }), []);
    return (_jsx("div", { children: _jsx("div", { ref: dragRef, style: {
                transform: `translate(${draggingPosition.offsetX}px, 0px)`,
            }, children: "Drag here" }) }));
};
export const DropTarget = ({ canDrop }) => {
    const [dropData, setDropData] = useState('');
    const { dragRef } = useDraggable(() => ({
        data: { text: 'hello' },
    }), []);
    const { dropTargetRef } = useDropTarget(() => ({
        canDrop,
        onDrop(data) {
            setDropData(prev => prev + data.source.data.text);
        },
        fromExternalData(args) {
            return {
                text: args.source.getStringData(args.source.types[0]) || 'no value',
            };
        },
    }), [canDrop]);
    return (_jsxs("div", { style: {
            display: 'flex',
            justifyContent: 'space-between',
        }, children: [_jsx("style", { children: `
        .drop-target {
          width: 100px;
          height: 100px;
          text-align: center;
          border: 2px solid red;
        }
        .drop-target[data-dragged-over='true'] {
          border: 2px solid green;
        }` }), _jsx("div", { ref: dragRef, children: "\uD83D\uDC49 hello" }), _jsx("a", { href: "https://www.google.com", children: "https://www.google.com" }), _jsx("p", { children: "Some random texts" }), _jsx("div", { className: "drop-target", ref: dropTargetRef, children: dropData || 'Drop here' })] }));
};
DropTarget.args = {
    canDrop: true,
};
const DropList = ({ children }) => {
    const [dropData, setDropData] = useState([]);
    const { dropTargetRef, draggedOver } = useDropTarget(() => ({
        onDrop(data) {
            setDropData(prev => [...prev, data.source.data.text]);
        },
    }), []);
    return (_jsxs("ul", { style: { padding: '20px' }, ref: dropTargetRef, children: [_jsxs("li", { children: ["Append here", draggedOver && ' [dragged-over]'] }), dropData.map((text, i) => (_jsx("li", { children: text }, i))), children] }));
};
export const NestedDropTarget = () => {
    const { dragRef } = useDraggable(() => ({
        data: { text: 'hello' },
    }), []);
    return (_jsxs("div", { children: [_jsx("div", { ref: dragRef, children: "\uD83D\uDC49 hello" }), _jsx("br", {}), _jsx("ul", { children: _jsx(DropList, { children: _jsx(DropList, { children: _jsx(DropList, {}) }) }) })] }));
};
NestedDropTarget.args = {
    canDrop: true,
};
export const DynamicDragPreview = () => {
    const { dragRef, dragging, draggingPosition, dropTarget, CustomDragPreview } = useDraggable(() => ({}), []);
    const { dropTargetRef: bigDropTargetRef } = useDropTarget(() => ({
        data: { type: 'big' },
    }), []);
    const { dropTargetRef: smallDropTargetRef } = useDropTarget(() => ({
        data: { type: 'small' },
    }), []);
    const { dropTargetRef: tipsDropTargetRef, draggedOver: tipsDraggedOver, draggedOverPosition: tipsDraggedOverPosition, } = useDropTarget(() => ({
        data: { type: 'tips' },
    }), []);
    return (_jsxs("div", { style: {
            display: 'flex',
            margin: '0 auto',
            width: '600px',
            border: '3px solid red',
            flexWrap: 'wrap',
            padding: '8px',
        }, children: [_jsx("div", { ref: dragRef, style: {
                    padding: '10px',
                    border: '1px solid blue',
                    transform: `${dropTarget.length > 0 ? `translate(${draggingPosition.offsetX}px, ${draggingPosition.offsetY}px)` : `translate(${draggingPosition.offsetX}px, 0px)`}
          ${dropTarget.some(t => t.data.type === 'big') ? 'scale(1.5)' : dropTarget.some(t => t.data.type === 'small') ? 'scale(0.5)' : ''}
          ${draggingPosition.outWindow ? 'scale(0.0)' : ''}`,
                    opacity: draggingPosition.outWindow ? 0.2 : 1,
                    pointerEvents: dragging ? 'none' : 'auto',
                    transition: 'transform 50ms, opacity 200ms',
                    marginBottom: '100px',
                    willChange: 'transform',
                    background: cssVar('--affine-background-primary-color'),
                }, children: "\uD83D\uDC49 drag here" }), _jsx("div", { ref: bigDropTargetRef, style: {
                    width: '100%',
                    border: '1px solid green',
                    height: '100px',
                    fontSize: '50px',
                }, children: "Big" }), _jsx("div", { ref: smallDropTargetRef, style: {
                    width: '100%',
                    border: '1px solid green',
                    height: '100px',
                    fontSize: '50px',
                }, children: "Small" }), _jsxs("div", { ref: tipsDropTargetRef, style: {
                    position: 'relative',
                    width: '100%',
                    border: '1px solid green',
                    height: '100px',
                    fontSize: '50px',
                }, children: ["Tips", tipsDraggedOver && (_jsx("div", { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transform: `translate(${tipsDraggedOverPosition.relativeX}px, ${tipsDraggedOverPosition.relativeY}px)`,
                        }, children: "tips" }))] }), _jsx(CustomDragPreview, { position: "pointer-outside", children: _jsx("div", { style: {
                        background: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '5px',
                        padding: '2px 6px',
                    }, children: "\uD83D\uDC4B this is a record" }) })] }));
};
const ReorderableListItem = ({ id, onDrop, orientation, }) => {
    const { dropTargetRef, closestEdge } = useDropTarget(() => ({
        isSticky: true,
        closestEdge: {
            allowedEdges: orientation === 'vertical' ? ['top', 'bottom'] : ['left', 'right'],
        },
        onDrop,
    }), [onDrop, orientation]);
    const { dragRef } = useDraggable(() => ({
        data: { id },
    }), [id]);
    return (_jsxs("div", { ref: node => {
            dropTargetRef.current = node;
            dragRef.current = node;
        }, style: {
            position: 'relative',
            padding: '10px',
            border: '1px solid black',
        }, children: ["Item ", id, _jsx(DropIndicator, { edge: closestEdge })] }));
};
export const ReorderableList = ({ orientation }) => {
    const [items, setItems] = useState(['A', 'B', 'C']);
    return (_jsx("div", { style: {
            display: 'flex',
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        }, children: items.map((item, i) => (_jsx(ReorderableListItem, { id: item, orientation: orientation, onDrop: data => {
                const dropId = data.source.data.id;
                if (dropId === item) {
                    return;
                }
                const closestEdge = data.closestEdge;
                if (!closestEdge) {
                    return;
                }
                const newItems = items.filter(i => i !== dropId);
                const newPosition = newItems.findIndex(i => i === item);
                newItems.splice(closestEdge === 'bottom' || closestEdge === 'right'
                    ? newPosition + 1
                    : newPosition, 0, dropId);
                setItems(newItems);
            } }, i))) }));
};
ReorderableList.argTypes = {
    orientation: {
        type: {
            name: 'enum',
            value: ['horizontal', 'vertical'],
            required: true,
        },
    },
};
ReorderableList.args = {
    orientation: 'vertical',
};
const ReorderableTreeNode = ({ level, node, onDrop, isLastInGroup, }) => {
    const [expanded, setExpanded] = useState(true);
    const { dragRef, dragging } = useDraggable(() => ({
        data: { node },
    }), [node]);
    const { dropTargetRef, treeInstruction } = useDropTarget(() => ({
        isSticky: true,
        treeInstruction: {
            mode: expanded && !node.leaf
                ? 'expanded'
                : isLastInGroup
                    ? 'last-in-group'
                    : 'standard',
            block: node.leaf ? ['make-child'] : [],
            currentLevel: level,
            indentPerLevel: 20,
        },
        onDrop: data => {
            onDrop({ ...data, dropAt: node });
        },
    }), [onDrop, expanded, isLastInGroup, level, node]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { ref: node => {
                    dropTargetRef.current = node;
                    dragRef.current = node;
                }, style: {
                    paddingLeft: level * 20,
                    position: 'relative',
                }, children: [_jsx("span", { onClick: () => setExpanded(prev => !prev), children: node.leaf ? '📃 ' : expanded ? '📂 ' : '📁 ' }), node.id, _jsx(DropIndicator, { instruction: treeInstruction })] }), expanded &&
                !dragging &&
                node.children.map((child, i) => (_jsx(ReorderableTreeNode, { level: level + 1, isLastInGroup: i === node.children.length - 1, node: child, onDrop: onDrop }, child.id)))] }));
};
export const ReorderableTree = () => {
    const [tree, setTree] = useState({
        id: 'root',
        children: [
            {
                id: 'a',
                children: [],
            },
            {
                id: 'b',
                children: [
                    {
                        id: 'c',
                        children: [],
                        leaf: true,
                    },
                    {
                        id: 'd',
                        children: [],
                        leaf: true,
                    },
                    {
                        id: 'e',
                        children: [
                            {
                                id: 'f',
                                children: [],
                                leaf: true,
                            },
                        ],
                    },
                ],
            },
        ],
    });
    const handleDrop = useCallback((data) => {
        const clonedTree = cloneDeep(tree);
        const findNode = (node, id) => {
            if (node.id === id) {
                return { parent: node, index: -1, node };
            }
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].id === id) {
                    return { parent: node, index: i, node: node.children[i] };
                }
                const result = findNode(node.children[i], id);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        const nodePosition = findNode(clonedTree, data.source.data.node.id);
        const dropAtPosition = findNode(clonedTree, data.dropAt.id);
        // delete the node from the tree
        nodePosition.parent.children.splice(nodePosition.index, 1);
        if (data.treeInstruction) {
            if (data.treeInstruction.type === 'make-child') {
                if (dropAtPosition.node.leaf) {
                    return;
                }
                if (nodePosition.node.id === dropAtPosition.node.id) {
                    return;
                }
                dropAtPosition.node.children.splice(0, 0, nodePosition.node);
            }
            else if (data.treeInstruction.type === 'reparent') {
                const up = data.treeInstruction.currentLevel -
                    data.treeInstruction.desiredLevel -
                    1;
                let parentPosition = findNode(clonedTree, dropAtPosition.parent.id);
                for (let i = 0; i < up; i++) {
                    parentPosition = findNode(clonedTree, parentPosition.parent.id);
                }
                parentPosition.parent.children.splice(parentPosition.index + 1, 0, nodePosition.node);
            }
            else if (data.treeInstruction.type === 'reorder-above') {
                if (dropAtPosition.node.id === 'root') {
                    return;
                }
                dropAtPosition.parent.children.splice(dropAtPosition.index, 0, nodePosition.node);
            }
            else if (data.treeInstruction.type === 'reorder-below') {
                if (dropAtPosition.node.id === 'root') {
                    return;
                }
                dropAtPosition.parent.children.splice(dropAtPosition.index + 1, 0, nodePosition.node);
            }
            else if (data.treeInstruction.type === 'instruction-blocked') {
                return;
            }
            setTree(clonedTree);
        }
    }, [tree]);
    return (_jsx("div", { style: { display: 'flex', flexDirection: 'column' }, children: _jsx(ReorderableTreeNode, { isLastInGroup: true, level: 0, node: tree, onDrop: handleDrop }) }));
};
ReorderableList.argTypes = {
    orientation: {
        type: {
            name: 'enum',
            value: ['horizontal', 'vertical'],
            required: true,
        },
    },
};
ReorderableList.args = {
    orientation: 'vertical',
};
//# sourceMappingURL=dnd.stories.js.map