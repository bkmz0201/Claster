export { Tag } from './entities/tag';
export { affineLabelToDatabaseTagColor, databaseTagColorToAffineLabel, } from './entities/utils';
export { TagService } from './service/tag';
export { useDeleteTagConfirmModal } from './view/delete-tag-modal';
import { type Framework } from '@toeverything/infra';
export declare function configureTagModule(framework: Framework): void;
//# sourceMappingURL=index.d.ts.map