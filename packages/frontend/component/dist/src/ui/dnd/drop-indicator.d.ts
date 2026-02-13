import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import type { Instruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item';
export type DropIndicatorProps = {
    instruction?: Instruction | null;
    edge?: Edge | null;
    noTerminal?: boolean;
};
export declare function DropIndicator({ instruction, edge, noTerminal, }: DropIndicatorProps): import("react/jsx-runtime").JSX.Element | null | undefined;
//# sourceMappingURL=drop-indicator.d.ts.map