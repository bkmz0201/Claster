export function isSameDay(a, b) {
    return a.isValid() && b.isValid() && a.isSame(b, 'day');
}
export function isSameMonth(a, b) {
    return a.isValid() && b.isValid() && a.isSame(b, 'month');
}
//# sourceMappingURL=helpers.js.map