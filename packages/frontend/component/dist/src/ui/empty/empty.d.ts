import type { CSSProperties, ReactNode } from 'react';
type ContainerStyleProps = {
    width?: string;
    height?: string;
    fontSize?: string;
};
export type EmptyContentProps = {
    containerStyle?: ContainerStyleProps;
    title?: ReactNode;
    description?: ReactNode;
    descriptionStyle?: CSSProperties;
};
/**
 * @deprecated use different empty components for different use cases, like `EmptyDocs` for documentation empty state
 */
export declare const Empty: ({ containerStyle, title, description, descriptionStyle, }: EmptyContentProps) => import("react/jsx-runtime").JSX.Element;
export default Empty;
//# sourceMappingURL=empty.d.ts.map