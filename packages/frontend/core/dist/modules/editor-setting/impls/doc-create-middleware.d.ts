import { Service } from '@toeverything/infra';
import type { DocCreateMiddleware, DocRecord } from '../../doc';
import type { DocCreateOptions } from '../../doc/types';
import type { AppThemeService } from '../../theme';
import type { EditorSettingService } from '../services/editor-setting';
export declare class EditorSettingDocCreateMiddleware extends Service implements DocCreateMiddleware {
    private readonly editorSettingService;
    private readonly appThemeService;
    constructor(editorSettingService: EditorSettingService, appThemeService: AppThemeService);
    beforeCreate(docCreateOptions: DocCreateOptions): DocCreateOptions;
    afterCreate(doc: DocRecord, _docCreateOptions: DocCreateOptions): void;
}
//# sourceMappingURL=doc-create-middleware.d.ts.map