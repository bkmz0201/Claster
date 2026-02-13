import { PackageCommand } from './command';
export class BuildCommand extends PackageCommand {
    static { this.paths = [['build'], ['b']]; }
    async execute() {
        const args = [];
        if (this.deps) {
            args.push('--deps', '--wait-deps');
        }
        args.push(this.package, 'build');
        await this.cli.run(args);
    }
}
//# sourceMappingURL=build.js.map