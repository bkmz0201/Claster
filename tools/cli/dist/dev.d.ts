import type { PackageName } from '@affine-tools/utils/workspace';
import { PackageSelectorCommand } from './command';
export declare class DevCommand extends PackageSelectorCommand {
    static paths: string[][];
    protected availablePackages: PackageName[];
    protected deps: boolean | undefined;
    execute(): Promise<void>;
}
//# sourceMappingURL=dev.d.ts.map