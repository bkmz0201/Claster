import { type DropTargetDropEvent } from '@affine/component';
import type { AffineDNDData } from '@affine/core/types/dnd';
interface RootEmptyProps {
    onClickCreate?: () => void;
    isLoading?: boolean;
    onDrop?: (data: DropTargetDropEvent<AffineDNDData>) => void;
}
export declare const RootEmptyLoading: () => import("react/jsx-runtime").JSX.Element;
export declare const RootEmptyReady: ({ onClickCreate, onDrop, }: Omit<RootEmptyProps, "isLoading">) => import("react/jsx-runtime").JSX.Element;
export declare const RootEmpty: ({ isLoading, ...props }: RootEmptyProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=empty.d.ts.map