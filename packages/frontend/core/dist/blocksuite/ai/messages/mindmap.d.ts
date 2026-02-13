import type { MindmapStyle } from '@blocksuite/affine/model';
import type { EditorHost } from '@blocksuite/affine/std';
import type { AIContext } from '../utils/context';
import type { AffineAIPanelWidgetConfig } from '../widgets/ai-panel/type';
export declare const createMindmapRenderer: (host: EditorHost, 
/**
 * Used to store data for later use during rendering.
 */
ctx: AIContext, style?: MindmapStyle) => AffineAIPanelWidgetConfig['answerRenderer'];
/**
 * Creates a renderer for executing a handler.
 * The ai panel will not display anything after the answer is generated.
 */
export declare const createMindmapExecuteRenderer: (host: EditorHost, 
/**
 * Used to store data for later use during rendering.
 */
ctx: AIContext, handler: (host: EditorHost, ctx: AIContext) => void) => AffineAIPanelWidgetConfig['answerRenderer'];
//# sourceMappingURL=mindmap.d.ts.map