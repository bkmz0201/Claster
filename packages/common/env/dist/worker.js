export function getWorkerUrl(name) {
    return (
    // NOTE: worker can not use publicPath because it must obey the same-origin policy
    (environment.subPath || '/') +
        'js/' +
        `${name}-${BUILD_CONFIG.appVersion}.worker.js`);
}
//# sourceMappingURL=worker.js.map