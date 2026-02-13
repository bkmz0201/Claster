export function stopPropagation(event) {
    event.stopPropagation();
}
export function preventDefault(event) {
    event.preventDefault();
}
export function isNewTabTrigger(event) {
    return event
        ? (event.ctrlKey || event.metaKey || event.button === 1) && !event.altKey
        : false;
}
export function isNewViewTrigger(event) {
    return event ? (event.ctrlKey || event.metaKey) && event.altKey : false;
}
export function inferOpenMode(event) {
    if (isNewTabTrigger(event)) {
        return 'new-tab';
    }
    else if (isNewViewTrigger(event)) {
        return BUILD_CONFIG.isElectron ? 'tail' : 'new-tab';
    }
    return 'active';
}
//# sourceMappingURL=event.js.map