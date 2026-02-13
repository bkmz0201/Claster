import type { ReactNode } from 'react';
export declare enum PreconditionStrategy {
    Always = 0,
    InPaperOrEdgeless = 1,
    InPaper = 2,
    InEdgeless = 3,
    InEdgelessPresentationMode = 4,
    NoSearchResult = 5,
    Never = 6
}
export type CommandCategory = 'editor:insert-object' | 'editor:page' | 'editor:edgeless' | 'affine:recent' | 'affine:pages' | 'affine:edgeless' | 'affine:collections' | 'affine:navigation' | 'affine:creation' | 'affine:settings' | 'affine:layout' | 'affine:updates' | 'affine:help' | 'affine:general' | 'affine:results';
export interface KeybindingOptions {
    binding: string;
    capture?: boolean;
    skipRegister?: boolean;
}
export interface AffineCommandOptions {
    id: string;
    preconditionStrategy?: PreconditionStrategy | (() => boolean);
    label: string | (() => string) | {
        title: string;
        subTitle?: string;
    } | (() => {
        title: string;
        subTitle?: string;
    });
    icon: ReactNode;
    category?: CommandCategory;
    keyBinding?: KeybindingOptions | string;
    run: () => void | Promise<void>;
}
export interface AffineCommand {
    readonly id: string;
    readonly preconditionStrategy: PreconditionStrategy | (() => boolean);
    readonly label: {
        title: string;
        subTitle?: string;
    };
    readonly icon?: ReactNode;
    readonly category: CommandCategory;
    readonly keyBinding?: KeybindingOptions;
    run(): void | Promise<void>;
}
export declare function createAffineCommand(options: AffineCommandOptions): AffineCommand;
//# sourceMappingURL=command.d.ts.map