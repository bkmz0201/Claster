import type { AIToolsConfig } from '@affine/core/modules/ai-button';
import { type CopilotClient, Endpoint } from './copilot-client';
export type TextToTextOptions = {
    client: CopilotClient;
    sessionId: string;
    content?: string;
    attachments?: (string | Blob | File)[];
    params?: Record<string, any>;
    timeout?: number;
    stream?: boolean;
    signal?: AbortSignal;
    retry?: boolean;
    endpoint?: Endpoint;
    isRootSession?: boolean;
    postfix?: (text: string) => string;
    reasoning?: boolean;
    webSearch?: boolean;
    modelId?: string;
    toolsConfig?: AIToolsConfig;
};
export type ToImageOptions = TextToTextOptions & {
    seed?: string;
};
export declare function textToText({ client, sessionId, content, attachments, params, stream, signal, timeout, retry, endpoint, postfix, reasoning, webSearch, modelId, toolsConfig, }: TextToTextOptions): Promise<string | null> | {
    [Symbol.asyncIterator]: () => AsyncGenerator<string, void, unknown>;
};
export declare function toImage({ content, sessionId, attachments, params, seed, signal, timeout, retry, endpoint, client, }: ToImageOptions): {
    [Symbol.asyncIterator]: () => AsyncGenerator<string, void, unknown>;
};
//# sourceMappingURL=request.d.ts.map