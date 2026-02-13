import type { DocRecord } from '../entities/record';
import type { DocCreateOptions } from '../types';
export interface DocCreateMiddleware {
    beforeCreate?: (docCreateOptions: DocCreateOptions) => DocCreateOptions;
    afterCreate?: (doc: DocRecord, docCreateOptions: DocCreateOptions) => void;
}
export declare const DocCreateMiddleware: import("@toeverything/infra").Identifier<DocCreateMiddleware> & ((variant: string) => import("@toeverything/infra").Identifier<DocCreateMiddleware>);
//# sourceMappingURL=doc-create-middleware.d.ts.map