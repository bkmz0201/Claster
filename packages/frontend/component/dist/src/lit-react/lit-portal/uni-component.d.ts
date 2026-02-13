import type { UniComponent } from '@blocksuite/affine-shared/types';
import { type ComponentType, type ReactNode } from 'react';
export declare const createUniReactRoot: () => {
    Root: () => Set<ReactNode>;
    createUniComponent: <T, E extends NonNullable<unknown>>(component: ComponentType<T>) => UniComponent<T, E>;
};
export declare const uniReactRoot: {
    Root: () => Set<ReactNode>;
    createUniComponent: <T, E extends NonNullable<unknown>>(component: ComponentType<T>) => UniComponent<T, E>;
};
//# sourceMappingURL=uni-component.d.ts.map