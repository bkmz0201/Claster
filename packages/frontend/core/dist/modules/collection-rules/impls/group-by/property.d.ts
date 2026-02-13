import type { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { Service } from '@toeverything/infra';
import type { Observable } from 'rxjs';
import { GroupByProvider } from '../../provider';
import type { GroupByParams } from '../../types';
export declare class PropertyGroupByProvider extends Service implements GroupByProvider {
    private readonly workspacePropertyService;
    constructor(workspacePropertyService: WorkspacePropertyService);
    groupBy$(items$: Observable<Set<string>>, params: GroupByParams): Observable<Map<string, Set<string>>>;
}
//# sourceMappingURL=property.d.ts.map