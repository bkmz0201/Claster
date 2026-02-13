import dayjs from 'dayjs';
import { type I18nInstance } from '../i18next';
export type TimeUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
/**
 * ```ts
 * // timestamp to string
 * i18nTime(1728538228000) -> 'Oct 10, 2024, 1:30:28 PM'
 *
 * // absolute time string
 * i18nTime('2024-10-10 13:30:28', { absolute: { accuracy: 'minute' } }) -> '2024-10-10 13:30 PM'
 * i18nTime('2024-10-10 13:30:28', { absolute: { accuracy: 'minute', noDate: true } }) -> '13:30 PM'
 * i18nTime('2024-10-10 13:30:28', { absolute: { accuracy: 'minute', noYear: true } }) -> 'Oct 10, 13:30 PM'
 * i18nTime('2024-10-10 13:30:28', { absolute: { accuracy: 'day' } }) -> 'Oct 10, 2024'
 *
 * // relative time string
 * i18nTime('2024-10-10 13:30:30', { relative: true }) -> 'now'
 * i18nTime('2024-10-10 13:30:00', { relative: true }) -> '30s ago'
 * i18nTime('2024-10-10 13:30:30', { relative: { accuracy: 'minute' } }) -> '2m ago'
 *
 * // show absolute time string if time is pass 1 day
 * i18nTime('2024-10-9 14:30:30', { relative: { max: [1, 'day'] } }) -> '23h ago'
 * i18nTime('2024-10-9 13:30:30', { relative: { max: [1, 'day'] } }) -> 'Oct 9, 2024, 1:30:30 PM'
 * ```
 */
export declare function i18nTime(time: dayjs.ConfigType, options?: {
    i18n?: I18nInstance;
    now?: dayjs.ConfigType;
    relative?: {
        max?: [number, TimeUnit];
        accuracy?: TimeUnit;
        weekday?: boolean;
        yesterdayAndTomorrow?: boolean;
    } | true;
    absolute?: {
        accuracy?: TimeUnit;
        noYear?: boolean;
        noDate?: boolean;
    };
}): string;
//# sourceMappingURL=time.d.ts.map