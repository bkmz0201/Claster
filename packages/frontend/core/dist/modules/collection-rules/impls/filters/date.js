import { Service } from '@toeverything/infra';
import dayjs, { isDayjs } from 'dayjs';
import { map } from 'rxjs';
export class DatePropertyFilterProvider extends Service {
    constructor(docsService) {
        super();
        this.docsService = docsService;
    }
    filter$(params) {
        return this.docsService
            .propertyValues$('custom:' + params.key)
            .pipe(basicDateFilter(params));
    }
}
export function basicDateFilter(params) {
    return upstream$ => {
        // value can be like "2025-01-01,2025-01-02"
        // or "2025-01-01"
        const filterValues = (params.value
            ?.split(',')
            .map(t => parseDate(t))
            .filter(Boolean) ?? []);
        const now = dayjs();
        const method = params.method;
        const relativeRanges = {
            'last-3-days': now.subtract(3, 'day'),
            'last-7-days': now.subtract(7, 'day'),
            'last-15-days': now.subtract(15, 'day'),
            'last-30-days': now.subtract(30, 'day'),
            'this-week': now.startOf('week'),
            'this-month': now.startOf('month'),
            // @ts-expect-error 'quarter' is not in type, but it's supported by dayjs
            'this-quarter': now.startOf('quarter'),
            'this-year': now.startOf('year'),
        };
        return upstream$.pipe(map(o => {
            if (method === 'is-empty' || method === 'is-not-empty') {
                const match = new Set();
                for (const [id, value] of o) {
                    if (method === 'is-empty' ? !value : !!value) {
                        match.add(id);
                    }
                }
                return match;
            }
            if (method === 'between' && filterValues.length >= 2) {
                return handleDateRangeFilter(o, parsed => isAfter(parsed, filterValues[0]) &&
                    isBefore(parsed, filterValues[1]));
            }
            if (method === 'after' && filterValues.length >= 1) {
                return handleDateRangeFilter(o, parsed => isAfter(parsed, filterValues[0]));
            }
            if (method === 'before' && filterValues.length >= 1) {
                return handleDateRangeFilter(o, parsed => isBefore(parsed, filterValues[0]));
            }
            if (method in relativeRanges) {
                return handleDateRangeFilter(o, parsed => isAfter(parsed, relativeRanges[method]));
            }
            throw new Error(`Unsupported method: ${method}`);
        }));
    };
}
function parseDate(value) {
    if (typeof value === 'string') {
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
            return null;
        }
        const [_, year, month, day] = match;
        return [parseInt(year), parseInt(month), parseInt(day)];
    }
    else if (typeof value === 'number') {
        const date = new Date(value);
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    }
    return null;
}
function handleDateRangeFilter(propertyValues, predicate) {
    const match = new Set();
    for (const [id, value] of propertyValues) {
        if (!value) {
            continue;
        }
        const parsed = parseDate(value);
        if (parsed && predicate(parsed)) {
            match.add(id);
        }
    }
    return match;
}
function isAfter(targetDate, referenceDate) {
    const [targetYear, targetMonth, targetDay] = isDayjs(targetDate)
        ? [targetDate.year(), targetDate.month() + 1, targetDate.date()]
        : targetDate;
    const [refYear, refMonth, refDay] = isDayjs(referenceDate)
        ? [referenceDate.year(), referenceDate.month() + 1, referenceDate.date()]
        : referenceDate;
    return (targetYear > refYear ||
        (targetYear === refYear && targetMonth > refMonth) ||
        (targetYear === refYear && targetMonth === refMonth && targetDay >= refDay));
}
function isBefore(targetDate, referenceDate) {
    const [targetYear, targetMonth, targetDay] = targetDate;
    const [refYear, refMonth, refDay] = referenceDate;
    return (targetYear < refYear ||
        (targetYear === refYear && targetMonth < refMonth) ||
        (targetYear === refYear && targetMonth === refMonth && targetDay <= refDay));
}
//# sourceMappingURL=date.js.map