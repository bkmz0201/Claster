import { type EditorHost } from '@blocksuite/affine/std';
import { type TemplateResult } from 'lit';
import { type AIItemGroupConfig } from '../components/ai-item/types';
import { type AIError } from '../provider';
import type { AIActionAnswer } from '../widgets/ai-panel/type';
export declare function bindTextStream(stream: BlockSuitePresets.TextStream, { update, finish, signal, }: {
    update: (answer: AIActionAnswer) => void;
    finish: (state: 'success' | 'error' | 'aborted', err?: AIError) => void;
    signal?: AbortSignal;
}): void;
export declare function actionToHandler<T extends keyof BlockSuitePresets.AIActions>(id: T, generatingIcon: TemplateResult<1>, variants?: Omit<Parameters<BlockSuitePresets.AIActions[T]>[0], keyof BlockSuitePresets.AITextActionOptions>, trackerOptions?: BlockSuitePresets.TrackerOptions): (host: EditorHost) => void;
export declare function handleInlineAskAIAction(host: EditorHost, actionGroups?: AIItemGroupConfig[]): void;
//# sourceMappingURL=doc-handler.d.ts.map