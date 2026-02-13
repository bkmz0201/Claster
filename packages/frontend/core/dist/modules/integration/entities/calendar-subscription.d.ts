import { Entity, LiveData } from '@toeverything/infra';
import type { CalendarStore, CalendarSubscriptionConfig } from '../store/calendar';
import type { EventsByDateMap } from '../type';
export declare class CalendarSubscription extends Entity<{
    url: string;
}> {
    private readonly store;
    constructor(store: CalendarStore);
    config$: LiveData<CalendarSubscriptionConfig | null>;
    content$: LiveData<string | undefined>;
    name$: LiveData<string>;
    eventsByDateMap$: LiveData<EventsByDateMap>;
    url: string;
    loading$: LiveData<boolean>;
    error$: LiveData<any>;
    update: import("@toeverything/infra").Effect<unknown>;
    dispose(): void;
}
//# sourceMappingURL=calendar-subscription.d.ts.map