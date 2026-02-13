import type { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import { OrderByProvider } from '../../provider';
import type { OrderByParams } from '../../types';
export declare class PropertyOrderByProvider extends Service implements OrderByProvider {
    private readonly workspacePropertyService;
    constructor(workspacePropertyService: WorkspacePropertyService);
    orderBy$(items$: Observable<Set<string>>, params: OrderByParams): Observable<string[]>;
}
//# sourceMappingURL=property.d.ts.map