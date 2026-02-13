export interface AIButtonProvider {
    presentAIButton: () => Promise<void>;
    dismissAIButton: () => Promise<void>;
}
export declare const AIButtonProvider: import("@toeverything/infra").Identifier<AIButtonProvider> & ((variant: string) => import("@toeverything/infra").Identifier<AIButtonProvider>);
//# sourceMappingURL=ai-button.d.ts.map