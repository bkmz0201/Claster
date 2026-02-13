import { Command } from './command';
export declare class CleanCommand extends Command {
    static paths: string[][];
    cleanDist: boolean;
    cleanRustTarget: boolean;
    cleanNodeModules: boolean;
    all: boolean;
    execute(): Promise<void>;
    doCleanNodeModules(): void;
    doCleanDist(): void;
    doCleanRust(): void;
}
//# sourceMappingURL=clean.d.ts.map