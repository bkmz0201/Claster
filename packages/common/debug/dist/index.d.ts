type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export declare class DebugLogger {
    private readonly _debug;
    constructor(namespace: string);
    set enabled(enabled: boolean);
    get enabled(): boolean;
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    log(level: LogLevel, message: string, ...args: any[]): void;
    namespace(extra: string): DebugLogger;
}
export {};
//# sourceMappingURL=index.d.ts.map