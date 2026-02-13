import { type DropTargetDropEvent } from '@affine/component';
import type { AffineDNDData } from '@affine/core/types/dnd';
interface RootEmptyProps {
    onDrop?: (data: DropTargetDropEvent<AffineDNDData>) => void;
    isLoading?: boolean;
}
export declare const RootEmpty: ({ isLoading, ...props }: RootEmptyProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=empty.d.ts.map