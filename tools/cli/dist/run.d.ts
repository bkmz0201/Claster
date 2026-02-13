import type { Package, PackageName } from '@affine-tools/utils/workspace';
import { PackageCommand } from './command';
interface RunScriptOptions {
    includeDependencies?: boolean;
    waitDependencies?: boolean;
    ignoreIfNotFound?: boolean;
}
export declare class RunCommand extends PackageCommand {
    static paths: string[][];
    static usage: import("clipanion").Usage;
    protected packageNameOrAlias: string;
    args: string[];
    execute(): Promise<void>;
    run(name: PackageName, args: string[], opts?: RunScriptOptions): Promise<void>;
    runScript(pkg: Package, scriptName: string, args: string[], opts?: RunScriptOptions): Promise<void>;
    runCommand(pkg: Package, args: string[]): Promise<void>;
    private extractEnvs;
}
export {};
//# sourceMappingURL=run.d.ts.map