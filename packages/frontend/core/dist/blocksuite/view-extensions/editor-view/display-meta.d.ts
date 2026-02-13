import type { Container } from '@blocksuite/affine/global/di';
import type { DocDisplayMetaParams } from '@blocksuite/affine/shared/services';
import { type ReadonlySignal } from '@preact/signals-core';
import { type FrameworkProvider } from '@toeverything/infra';
import type { TemplateResult } from 'lit';
export declare function buildDocDisplayMetaExtension(framework: FrameworkProvider): {
    new (std: import("@blocksuite/std").BlockStdScope): {
        readonly disposables: (() => void)[];
        dispose(): void;
        icon(docId: string, { params, title, referenced }?: DocDisplayMetaParams): ReadonlySignal<TemplateResult>;
        title(docId: string, { title, referenced }?: DocDisplayMetaParams): ReadonlySignal<string>;
        unmounted(): void;
        readonly std: import("@blocksuite/std").BlockStdScope;
        created(): void;
        mounted(): void;
        rendered(): void;
    };
    key: string;
    setup(di: Container): void;
};
//# sourceMappingURL=display-meta.d.ts.map