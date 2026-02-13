import type { FC, PropsWithChildren, ReactNode } from 'react';
export declare enum ErrorStatus {
    NotFound = 404,
    Unexpected = 500
}
export interface ErrorDetailProps extends PropsWithChildren {
    status?: ErrorStatus;
    title: string;
    description: ReactNode | Array<ReactNode>;
    buttonText?: string;
    onButtonClick?: () => void | Promise<void>;
    resetError?: () => void;
    error?: Error;
}
/**
 * TODO(@eyhn): Unify with NotFoundPage.
 */
export declare const ErrorDetail: FC<ErrorDetailProps>;
export declare function ContactUS(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=error-detail.d.ts.map