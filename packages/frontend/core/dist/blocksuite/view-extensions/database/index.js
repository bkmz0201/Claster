import { ViewExtensionProvider, } from '@blocksuite/affine/ext-loader';
import { z } from 'zod';
import { patchDatabaseBlockConfigService } from './database-block-config-service';
const optionsSchema = z.object({});
export class AffineDatabaseViewExtension extends ViewExtensionProvider {
    constructor() {
        super(...arguments);
        this.name = 'affine-database-view';
        this.schema = optionsSchema;
    }
    setup(context, options) {
        super.setup(context, options);
        context.register(patchDatabaseBlockConfigService());
    }
}
//# sourceMappingURL=index.js.map