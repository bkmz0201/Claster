import { Bound } from '@blocksuite/affine/global/gfx';
import type { BlockStdScope } from '@blocksuite/affine/std';
import { type AIChatBlockModel } from '../blocks';
/**
 * Calculates the bounding box for a child block
 * Based on the parent block's position and the existing connectors.
 * Place the child block to the right of the parent block as much as possible.
 * If the parent block already has connected child blocks
 * Distribute them evenly along the y-axis as much as possible.
 * @param parentModel - The model of the parent block.
 * @param service - The EdgelessRootService instance.
 * @returns The calculated bounding box for the child block.
 */
export declare function calcChildBound(parentModel: AIChatBlockModel, std: BlockStdScope): Bound;
//# sourceMappingURL=utils.d.ts.map