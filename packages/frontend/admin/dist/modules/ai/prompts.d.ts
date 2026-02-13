import type { CopilotPromptMessageRole } from '@affine/graphql';
export type Prompt = {
    __typename?: 'CopilotPromptType';
    name: string;
    model: string;
    action: string | null;
    config: {
        __typename?: 'CopilotPromptConfigType';
        frequencyPenalty: number | null;
        presencePenalty: number | null;
        temperature: number | null;
        topP: number | null;
    } | null;
    messages: Array<{
        __typename?: 'CopilotPromptMessageType';
        role: CopilotPromptMessageRole;
        content: string;
        params: Record<string, string> | null;
    }>;
};
export declare function Prompts(): import("react/jsx-runtime").JSX.Element;
export declare const PromptRow: ({ item, index }: {
    item: Prompt;
    index: number;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=prompts.d.ts.map