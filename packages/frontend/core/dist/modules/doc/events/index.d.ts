import type { Doc } from '../entities/doc';
import type { DocRecord } from '../entities/record';
import type { DocCreateOptions } from '../types';
export declare const DocCreated: import("@toeverything/infra").FrameworkEvent<{
    doc: DocRecord;
    docCreateOptions: DocCreateOptions;
}>;
export declare const DocInitialized: import("@toeverything/infra").FrameworkEvent<Doc>;
//# sourceMappingURL=index.d.ts.map