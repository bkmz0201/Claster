import type { Container } from '@blocksuite/affine/global/di';
import type { FrameworkProvider } from '@toeverything/infra';
export declare function patchFileSizeLimitExtension(framework: FrameworkProvider): {
    new (): {
        maxFileSize: number;
        onOverFileSize(): void;
    };
    setup(di: Container): void;
};
//# sourceMappingURL=file-size-limit.d.ts.map