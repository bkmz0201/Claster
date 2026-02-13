export declare class Path {
    private readonly path;
    static dir(url: string): Path;
    get value(): string;
    get relativePath(): string;
    constructor(path: string);
    join(...paths: string[]): Path;
    parent(): Path;
    toPosixString(): string;
    toString(): string;
    exists(): boolean;
    rm(opts?: {
        recursive?: boolean;
    }): void;
    mkdir(): void;
    readAsFile(): NonSharedBuffer;
    writeFile(content: Buffer | string): void;
    stats(): import("fs").Stats;
    isFile(): boolean;
    isDirectory(): boolean;
    toFileUrl(): import("url").URL;
    relative(to: string): string;
}
export declare const ProjectRoot: Path;
//# sourceMappingURL=path.d.ts.map