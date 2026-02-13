export { Doc } from './entities/doc';
export { DocRecord } from './entities/record';
export { DocRecordList } from './entities/record-list';
export { DocCreated } from './events';
export { DocScope } from './scopes/doc';
export { DocService } from './services/doc';
export { DocsService } from './services/docs';
import type { Framework } from '@toeverything/infra';
export { DocCreateMiddleware } from './providers/doc-create-middleware';
export declare function configureDocModule(framework: Framework): void;
//# sourceMappingURL=index.d.ts.map