import type { AIError } from '../../provider';
import type { ChatStatus, HistoryMessage } from '../ai-chat-messages';
export type ChatContextValue = {
    messages: HistoryMessage[];
    status: ChatStatus;
    error: AIError | null;
    quote: string;
    markdown: string;
    images: File[];
    snapshot: string | null;
    attachments: {
        sourceId: string;
        name: string;
    }[];
    combinedElementsMarkdown: string | null;
    docs: string[];
    html: string | null;
    abortController: AbortController | null;
};
//# sourceMappingURL=type.d.ts.map