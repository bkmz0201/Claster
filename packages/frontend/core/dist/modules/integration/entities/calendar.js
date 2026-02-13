import { Entity, LiveData, ObjectPool } from '@toeverything/infra';
import {} from 'dayjs';
import ICAL from 'ical.js';
import { Observable, switchMap } from 'rxjs';
import { parseCalendarUrl } from '../utils/calendar-url-parser';
import { CalendarSubscription } from './calendar-subscription';
export class CalendarIntegration extends Entity {
    constructor(store) {
        super();
        this.store = store;
        this.subscriptionPool = new ObjectPool();
        this.colors = this.store.colors;
        this.subscriptions$ = LiveData.from(this.store.watchSubscriptionMap().pipe(switchMap(subs => {
            const refs = Object.entries(subs ?? {}).map(([url]) => {
                const exists = this.subscriptionPool.get(url);
                if (exists) {
                    return exists;
                }
                const subscription = this.framework.createEntity(CalendarSubscription, { url });
                const ref = this.subscriptionPool.put(url, subscription);
                return ref;
            });
            return new Observable(subscribe => {
                subscribe.next(refs.map(ref => ref.obj));
                return () => {
                    refs.forEach(ref => ref.release());
                };
            });
        })), []);
        this.eventsByDateMap$ = LiveData.computed(get => {
            return get(this.subscriptions$)
                .map(sub => get(sub.eventsByDateMap$))
                .reduce((acc, map) => {
                for (const [date, events] of map) {
                    acc.set(date, acc.has(date) ? [...(acc.get(date) ?? []), ...events] : [...events]);
                }
                return acc;
            }, new Map());
        });
    }
    subscription$(url) {
        return this.subscriptions$.map(subscriptions => subscriptions.find(sub => sub.url === url));
    }
    eventsByDate$(date) {
        return this.eventsByDateMap$.map(eventsByDateMap => {
            const dateKey = date.format('YYYY-MM-DD');
            const events = [...(eventsByDateMap.get(dateKey) || [])];
            // sort events by start time
            return events.sort((a, b) => {
                return ((a.startAt?.toJSDate().getTime() ?? 0) -
                    (b.startAt?.toJSDate().getTime() ?? 0));
            });
        });
    }
    async verifyUrl(_url) {
        const url = parseCalendarUrl(_url);
        try {
            const response = await fetch(url);
            const content = await response.text();
            ICAL.parse(content);
            return content;
        }
        catch (err) {
            console.error(err);
            throw new Error('Failed to verify URL');
        }
    }
    async createSubscription(url) {
        try {
            const content = await this.verifyUrl(url);
            this.store.addSubscription(url);
            this.store.setSubscriptionCache(url, content).catch(console.error);
        }
        catch (err) {
            console.error(err);
            throw new Error('Failed to verify URL');
        }
    }
    getSubscription(url) {
        return this.store.getSubscription(url);
    }
    deleteSubscription(url) {
        this.store.removeSubscription(url);
    }
    updateSubscription(url, updates) {
        this.store.updateSubscription(url, updates);
    }
}
//# sourceMappingURL=calendar.js.map