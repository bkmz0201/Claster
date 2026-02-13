import { BlockService } from '@blocksuite/affine/std';
import { Subject } from 'rxjs';
export declare class MindmapService extends BlockService {
    static readonly flavour: "affine:page";
    requestCenter: Subject<void>;
    center(): void;
    mounted(): void;
}
//# sourceMappingURL=mindmap-service.d.ts.map