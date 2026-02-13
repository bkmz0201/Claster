import { type BlockComponent, type EditorHost, type TextSelection } from '@blocksuite/affine/std';
import { type BlockModel } from '@blocksuite/affine/store';
import type { AffineAIPanelWidget } from '../widgets/ai-panel/ai-panel';
export declare const insert: (host: EditorHost, content: string, selectBlock: BlockComponent, below?: boolean) => Promise<void>;
export declare const insertBelow: (host: EditorHost, content: string, selectBlock: BlockComponent) => Promise<void>;
export declare const insertAbove: (host: EditorHost, content: string, selectBlock: BlockComponent) => Promise<void>;
export declare const replace: (host: EditorHost, content: string, firstBlock: BlockComponent, selectedModels: BlockModel[], textSelection?: TextSelection) => Promise<void>;
export declare const copyTextAnswer: (panel: AffineAIPanelWidget) => Promise<boolean>;
export declare const copyText: (text: string) => Promise<boolean>;
//# sourceMappingURL=editor-actions.d.ts.map