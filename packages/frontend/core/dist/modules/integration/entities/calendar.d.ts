import { Entity, LiveData } from '@toeverything/infra';
import { type Dayjs } from 'dayjs';
import type { CalendarStore, CalendarSubscriptionConfig } from '../store/calendar';
import type { CalendarEvent } from '../type';
import { CalendarSubscription } from './calendar-subscription';
export declare class CalendarIntegration extends Entity {
    private readonly store;
    constructor(store: CalendarStore);
    private readonly subscriptionPool;
    colors: ("#b3b3b3" | "#929292" | "#f43f48" | "#ed3f3f" | "#ffae63" | "#ff8c38" | "#fde047" | "#facc15" | "#44b931" | "#3cbc36" | "#8be7dc" | "#5cc7ba" | "#4ab1fa" | "#29a3fa" | "#9681ef" | "#6e52df" | "#f37fba" | "#e660a4")[];
    subscriptions$: LiveData<CalendarSubscription[]>;
    subscription$(url: string): LiveData<CalendarSubscription | undefined>;
    eventsByDateMap$: LiveData<import("../type").EventsByDateMap>;
    eventsByDate$(date: Dayjs): LiveData<CalendarEvent[]>;
    verifyUrl(_url: string): Promise<string>;
    createSubscription(url: string): Promise<void>;
    getSubscription(url: string): CalendarSubscriptionConfig;
    deleteSubscription(url: string): void;
    updateSubscription(url: string, updates: Partial<Omit<CalendarSubscriptionConfig, 'url'>>): void;
}
//# sourceMappingURL=calendar.d.ts.map