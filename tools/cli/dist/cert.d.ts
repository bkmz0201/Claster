import { Command } from './command';
export declare class CertCommand extends Command {
    static paths: string[][];
    install: boolean | undefined;
    domain: string | undefined;
    uninstall: boolean | undefined;
    execute(): Promise<void>;
    private createCert;
    private installCa;
    private trustCa;
    private uninstallCa;
    private checkInstalled;
}
//# sourceMappingURL=cert.d.ts.map