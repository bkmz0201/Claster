import { type ChildProcess, type SpawnOptions } from 'node:child_process';
export declare function spawn(tag: string, cmd: string | string[], options?: SpawnOptions): ChildProcess;
export declare function execAsync(tag: string, cmd: string | string[], options?: SpawnOptions): Promise<void>;
export declare function exec(tag: string, cmd: string, { silent }?: {
    silent: boolean;
}): string;
//# sourceMappingURL=process.d.ts.map