export function templateToString({ strings, values }) {
    return strings.reduce((result, str, i) => result + str + (i < values.length ? String(values[i]) : ''), '');
}
//# sourceMappingURL=utils.js.map