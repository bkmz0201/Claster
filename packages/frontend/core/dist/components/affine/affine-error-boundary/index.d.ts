import type { FC, PropsWithChildren } from 'react';
export { type FallbackProps } from './error-basic/fallback-creator';
export interface AffineErrorBoundaryProps extends PropsWithChildren {
    height?: number | string;
    className?: string;
}
/**
 * TODO(@eyhn): Unify with SWRErrorBoundary
 */
export declare const AffineErrorBoundary: FC<AffineErrorBoundaryProps>;
//# sourceMappingURL=index.d.ts.map