export const defaultDatePickerProps = {
    format: 'YYYY-MM-DD',
    gapX: 8,
    gapY: BUILD_CONFIG.isMobileEdition ? 16 : 8,
    cellFontSize: BUILD_CONFIG.isMobileEdition ? 17 : 14,
    cellSize: BUILD_CONFIG.isMobileEdition ? 34 : 28,
    weekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].join(','),
    monthNames: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ].join(','),
    todayLabel: 'Today',
};
//# sourceMappingURL=types.js.map