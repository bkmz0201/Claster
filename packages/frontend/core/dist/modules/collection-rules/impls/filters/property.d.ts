import type { WorkspacePropertyService } from '@affine/core/modules/workspace-property';
import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import { FilterProvider } from '../../provider';
import type { FilterParams } from '../../types';
export declare class PropertyFilterProvider extends Service implements FilterProvider {
    private readonly workspacePropertyService;
    constructor(workspacePropertyService: WorkspacePropertyService);
    filter$(params: FilterParams): Observable<Set<string>>;
}
//# sourceMappingURL=property.d.ts.map