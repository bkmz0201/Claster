import type { FrameworkProvider } from '../provider';
export declare class Component<Props = {}> {
    readonly framework: FrameworkProvider;
    readonly props: Props;
    protected readonly disposables: (() => void)[];
    get eventBus(): import("../event").EventBus;
    constructor();
    dispose(): void;
    [Symbol.dispose](): void;
}
//# sourceMappingURL=component.d.ts.map