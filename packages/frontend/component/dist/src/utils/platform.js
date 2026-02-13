export function isMacOS() {
    if (typeof navigator === 'undefined')
        return false;
    return navigator.userAgent.indexOf('Mac') !== -1;
}
//# sourceMappingURL=platform.js.map