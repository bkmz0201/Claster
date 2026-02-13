import { type Package } from '@affine-tools/utils/workspace';
import { type BuiltInParserName } from 'prettier';
import { Command } from './command';
export declare class InitCommand extends Command {
    static paths: string[][];
    execute(): Promise<void>;
    generateWorkspaceFiles(): Promise<void>;
    format(content: string, parser: BuiltInParserName): Promise<string>;
    genOxlintConfig: () => string;
    genWorkspaceInfo: () => string;
    genProjectTsConfig: (prev: string) => string;
    genPackageTsConfig: (pkg: Package, prev: string) => string;
}
//# sourceMappingURL=init.d.ts.map