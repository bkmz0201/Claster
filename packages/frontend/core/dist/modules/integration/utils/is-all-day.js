export const isAllDay = (current, start, end) => {
    if (current.isSame(start, 'day')) {
        return (start.hour() === 0 && start.minute() === 0 && !current.isSame(end, 'day'));
    }
    else if (current.isSame(end, 'day')) {
        return false;
    }
    else {
        return true;
    }
};
//# sourceMappingURL=is-all-day.js.map