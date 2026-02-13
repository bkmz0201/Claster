import { type MenuRef } from '@affine/component';
import type { ReactNode } from 'react';
import type { TagColor, TagLike } from './types';
export interface TagsEditorProps {
    tags: TagLike[];
    selectedTags: string[];
    onCreateTag: (name: string, color: string) => TagLike;
    onSelectTag: (tagId: string) => void;
    onDeselectTag: (tagId: string) => void;
    tagColors: TagColor[];
    onTagChange: (id: string, property: keyof TagLike, value: string) => void;
    onDeleteTag: (id: string) => void;
    jumpToTag?: (id: string) => void;
    tagMode: 'inline-tag' | 'db-label';
    style?: React.CSSProperties;
}
export interface TagsInlineEditorProps extends TagsEditorProps {
    placeholder?: ReactNode;
    className?: string;
    readonly?: boolean;
    title?: ReactNode;
    modalMenu?: boolean;
    menuClassName?: string;
    style?: React.CSSProperties;
    ref?: React.Ref<MenuRef>;
    onEditorClose?: () => void;
}
export declare const TagsEditor: ({ tags, selectedTags, onSelectTag, onDeselectTag, onCreateTag, tagColors, onDeleteTag, onTagChange, jumpToTag, tagMode, style, }: TagsEditorProps) => import("react/jsx-runtime").JSX.Element;
export declare const TagsInlineEditor: ({ readonly, placeholder, className, title, style, onEditorClose, ref, ...props }: TagsInlineEditorProps) => import("react/jsx-runtime").JSX.Element;
export declare const WorkspaceTagsInlineEditor: ({ selectedTags, onDeselectTag, ref, onEditorClose, ...otherProps }: Omit<TagsInlineEditorProps, "tags" | "onCreateTag" | "onDeleteTag" | "tagColors" | "onTagChange">) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tags-editor.d.ts.map