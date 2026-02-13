import { type AffineCommand } from '@affine/core/commands';
import { Entity, LiveData } from '@toeverything/infra';
import type { GlobalContextService } from '../../global-context';
import type { QuickSearchSession } from '../providers/quick-search-provider';
import type { QuickSearchItem } from '../types/item';
export declare class CommandsQuickSearchSession extends Entity implements QuickSearchSession<'commands', AffineCommand> {
    private readonly contextService;
    constructor(contextService: GlobalContextService);
    query$: LiveData<string>;
    items$: LiveData<QuickSearchItem<"commands", AffineCommand>[]>;
    query(query: string): void;
}
//# sourceMappingURL=commands.d.ts.map