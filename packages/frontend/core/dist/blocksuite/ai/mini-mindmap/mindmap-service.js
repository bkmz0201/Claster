import { RootBlockSchema } from '@blocksuite/affine/model';
import { BlockService } from '@blocksuite/affine/std';
import { Subject } from 'rxjs';
export class MindmapService extends BlockService {
    constructor() {
        super(...arguments);
        // eslint-disable-next-line rxjs/finnish
        this.requestCenter = new Subject();
    }
    static { this.flavour = RootBlockSchema.model.flavour; }
    center() {
        this.requestCenter.next();
    }
    mounted() { }
}
//# sourceMappingURL=mindmap-service.js.map