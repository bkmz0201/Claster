import { Logger } from '@affine-tools/utils/logger';
import { type PackageName, Workspace } from '@affine-tools/utils/workspace';
import { Command as BaseCommand, Option } from 'clipanion';
import * as t from 'typanion';
import type { CliContext } from './context';
export declare abstract class Command extends BaseCommand<CliContext> {
    cmd: any;
    get logger(): Logger;
    get workspace(): Workspace;
    set workspace(workspace: Workspace);
    exec: (cmd: string, args_1?: {
        silent: boolean;
    } | undefined) => string;
    execAsync: (cmd: string | string[], options?: import("child_process").SpawnOptions | undefined) => Promise<void>;
    spawn: (cmd: string | string[], options?: import("child_process").SpawnOptions | undefined) => import("child_process").ChildProcess;
}
export declare abstract class PackageCommand extends Command {
    protected availablePackageNameArgs: string[];
    protected packageNameValidator: t.StrictValidator<unknown, string>;
    protected packageNameOrAlias: string;
    get package(): PackageName;
    protected _deps: boolean;
    get deps(): boolean;
    waitDeps: boolean;
}
export declare abstract class PackagesCommand extends Command {
    protected availablePackageNameArgs: string[];
    protected packageNameValidator: t.StrictValidator<unknown, string>;
    protected packageNamesOrAliases: string[];
    get packages(): string[];
    deps: boolean;
}
export declare abstract class PackageSelectorCommand extends Command {
    protected availablePackages: PackageName[];
    protected availablePackageNameArgs: string[];
    protected packageNameValidator: t.StrictValidator<unknown, string>;
    protected packageNameOrAlias: string | undefined;
    getPackage(): Promise<PackageName>;
}
export { Option };
//# sourceMappingURL=command.d.ts.map