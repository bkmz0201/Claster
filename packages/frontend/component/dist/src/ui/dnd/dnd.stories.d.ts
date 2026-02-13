import type { StoryFn } from '@storybook/react';
declare const _default: {
    title: string;
};
export default _default;
export declare const Draggable: StoryFn<{
    canDrag: boolean;
    disableDragPreview: boolean;
}>;
export declare const DraggableCustomPreview: StoryFn;
export declare const DraggableControlledPreview: StoryFn;
export declare const DropTarget: StoryFn<{
    canDrop: boolean;
}>;
export declare const NestedDropTarget: StoryFn<{
    canDrop: boolean;
}>;
export declare const DynamicDragPreview: () => import("react/jsx-runtime").JSX.Element;
export declare const ReorderableList: StoryFn<{
    orientation: 'horizontal' | 'vertical';
}>;
export declare const ReorderableTree: StoryFn;
//# sourceMappingURL=dnd.stories.d.ts.map