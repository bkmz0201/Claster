import type { PropsWithChildren } from 'react';
export interface UploadProps {
    uploadType?: string;
    accept?: string;
    fileChange: (file: File) => void;
    disabled?: boolean;
}
export declare const Upload: ({ fileChange, accept, children, disabled, ...props }: PropsWithChildren<UploadProps>) => string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<import("react").ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | null | undefined>;
//# sourceMappingURL=index.d.ts.map