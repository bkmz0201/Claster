import type { FrameworkProvider } from '@toeverything/infra';
export declare function getAIEdgelessRootWatcher(framework: FrameworkProvider): {
    new (std: import("@blocksuite/std").BlockStdScope): {
        mounted(): void;
        readonly std: import("@blocksuite/std").BlockStdScope;
        created(): void;
        rendered(): void;
        unmounted(): void;
    };
    key: string;
    setup(di: import("@blocksuite/global/di").Container): void;
};
//# sourceMappingURL=ai-edgeless-root.d.ts.map