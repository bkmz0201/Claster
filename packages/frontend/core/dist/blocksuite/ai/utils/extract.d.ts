import { type EditorHost } from '@blocksuite/affine/std';
import type { Store } from '@blocksuite/affine/store';
import type { ChatContextValue } from '../components/ai-chat-content';
export declare function extractSelectedContent(host: EditorHost): Promise<Partial<ChatContextValue> | null>;
export declare function extractMarkdownFromDoc(doc: Store): Promise<string>;
//# sourceMappingURL=extract.d.ts.map