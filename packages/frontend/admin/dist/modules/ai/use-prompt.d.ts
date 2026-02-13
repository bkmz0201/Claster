import type { Prompt } from './prompts';
export declare const usePrompt: () => {
    prompts: {
        __typename?: "CopilotPromptType";
        name: string;
        model: string;
        action: string | null;
        config: {
            __typename?: "CopilotPromptConfigType";
            frequencyPenalty: number | null;
            presencePenalty: number | null;
            temperature: number | null;
            topP: number | null;
        } | null;
        messages: Array<{
            __typename?: "CopilotPromptMessageType";
            role: import("@affine/graphql").CopilotPromptMessageRole;
            content: string;
            params: Record<string, string> | null;
        }>;
    }[];
    updatePrompt: (args_0: {
        name: string;
        messages: Prompt["messages"];
    }) => void;
};
//# sourceMappingURL=use-prompt.d.ts.map