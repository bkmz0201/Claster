import type { EditorHost } from '@blocksuite/affine/std';
import type { AIContext } from '../utils/context';
import type { AffineAIPanelWidget } from '../widgets/ai-panel/ai-panel';
type AnswerRenderer = NonNullable<AffineAIPanelWidget['config']>['answerRenderer'];
export declare function actionToAnswerRenderer<T extends keyof BlockSuitePresets.AIActions>(id: T, host: EditorHost, ctx: AIContext): AnswerRenderer;
export {};
//# sourceMappingURL=answer-renderer.d.ts.map