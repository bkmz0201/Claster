import { AliasToPackage } from '@affine-tools/utils/distribution';
import { Logger } from '@affine-tools/utils/logger';
import { exec, execAsync, spawn } from '@affine-tools/utils/process';
import { Workspace } from '@affine-tools/utils/workspace';
import { Command as BaseCommand, Option } from 'clipanion';
import inquirer from 'inquirer';
import * as t from 'typanion';
export class Command extends BaseCommand {
    constructor() {
        super(...arguments);
        // @ts-expect-error hack: Get the command name
        this.cmd = this.constructor.paths[0][0];
        this.exec = exec.bind(null, this.cmd);
        this.execAsync = execAsync.bind(null, this.cmd);
        this.spawn = spawn.bind(null, this.cmd);
    }
    get logger() {
        return new Logger(this.cmd);
    }
    get workspace() {
        return this.context.workspace;
    }
    set workspace(workspace) {
        this.context.workspace = workspace;
    }
}
export class PackageCommand extends Command {
    constructor() {
        super(...arguments);
        this.availablePackageNameArgs = Workspace.PackageNames.concat(Array.from(AliasToPackage.keys()));
        this.packageNameValidator = t.isOneOf(this.availablePackageNameArgs.map(k => t.isLiteral(k)));
        this.packageNameOrAlias = Option.String('--package,-p', {
            required: true,
            validator: this.packageNameValidator,
            description: 'The package name or alias to be run with',
        });
        this._deps = Option.Boolean('--deps', false, {
            description: 'Execute the same command in workspace dependencies, if defined.',
        });
        this.waitDeps = Option.Boolean('--wait-deps', false, {
            description: 'Wait for dependencies to be ready before running the command',
        });
    }
    get package() {
        const name = AliasToPackage.get(this.packageNameOrAlias) ??
            this.packageNameOrAlias;
        // check
        this.workspace.getPackage(name);
        return name;
    }
    get deps() {
        return this._deps;
    }
}
export class PackagesCommand extends Command {
    constructor() {
        super(...arguments);
        this.availablePackageNameArgs = Workspace.PackageNames.concat(Array.from(AliasToPackage.keys()));
        this.packageNameValidator = t.isOneOf(this.availablePackageNameArgs.map(k => t.isLiteral(k)));
        this.packageNamesOrAliases = Option.Array('--package,-p', {
            required: true,
            validator: t.isArray(this.packageNameValidator),
        });
        this.deps = Option.Boolean('--deps', false, {
            description: 'Execute the same command in workspace dependencies, if defined.',
        });
    }
    get packages() {
        return this.packageNamesOrAliases.map(name => AliasToPackage.get(name) ?? name);
    }
}
export class PackageSelectorCommand extends Command {
    constructor() {
        super(...arguments);
        this.availablePackages = Workspace.PackageNames;
        this.availablePackageNameArgs = Workspace.PackageNames.concat(Array.from(AliasToPackage.keys()));
        this.packageNameValidator = t.isOneOf(this.availablePackageNameArgs.map(k => t.isLiteral(k)));
        this.packageNameOrAlias = Option.String('--package,-p', {
            validator: this.packageNameValidator,
            description: 'The package name or alias to be run with',
        });
    }
    async getPackage() {
        let name = this.packageNameOrAlias
            ? (AliasToPackage.get(this.packageNameOrAlias) ??
                this.packageNameOrAlias)
            : undefined;
        if (!name) {
            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'package',
                    message: 'Which package do you want to dev?',
                    choices: this.availablePackages.map(name => ({
                        name,
                        value: name,
                    })),
                    pageSize: 10,
                    default: '@affine/web',
                },
            ]);
            name = answer.package;
        }
        // check
        this.workspace.getPackage(name);
        return name;
    }
}
export { Option };
//# sourceMappingURL=command.js.map