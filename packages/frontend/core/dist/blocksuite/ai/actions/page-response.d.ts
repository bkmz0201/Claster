import { type EditorHost } from '@blocksuite/affine/std';
import type { AIContext } from '../utils/context';
type Place = 'after' | 'before';
export declare function pageResponseHandler<T extends keyof BlockSuitePresets.AIActions>(id: T, host: EditorHost, ctx: AIContext, place?: Place): Promise<void>;
export declare function responseToCreateImage(host: EditorHost, place: Place): void;
export declare function replaceWithMarkdown(host: EditorHost): Promise<void>;
export {};
//# sourceMappingURL=page-response.d.ts.map