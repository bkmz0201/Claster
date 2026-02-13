import { Option, PackageSelectorCommand } from './command';
export class DevCommand extends PackageSelectorCommand {
    constructor() {
        super(...arguments);
        this.availablePackages = [
            '@affine/web',
            '@affine/server',
            '@affine/electron',
            '@affine/electron-renderer',
            '@affine/mobile',
            '@affine/ios',
            '@affine/android',
            '@affine/admin',
        ];
        this.deps = Option.Boolean('--deps', {
            description: 'Run dev with dependencies',
        });
    }
    static { this.paths = [['dev'], ['d']]; }
    async execute() {
        const name = await this.getPackage();
        const args = [];
        if (this.deps) {
            args.push('--deps');
        }
        args.push(name, 'dev');
        await this.cli.run(args);
    }
}
//# sourceMappingURL=dev.js.map