import debug from 'debug';
const SESSION_KEY = 'affine:debug';
if (typeof window !== 'undefined') {
    // enable debug logs if the URL search string contains `debug`
    // e.g. http://localhost:3000/?debug
    if (window.location.search.includes('debug')) {
        // enable debug logs for the current session
        // since the query string may be removed by the browser after navigations,
        // we need to store the debug flag in sessionStorage
        sessionStorage.setItem(SESSION_KEY, 'true');
    }
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
        // enable all debug logs by default
        debug.enable('*');
        console.warn('Debug logs enabled');
    }
    if (BUILD_CONFIG.debug) {
        debug.enable('*,-micromark');
        console.warn('Debug logs enabled');
    }
}
export class DebugLogger {
    constructor(namespace) {
        this._debug = debug(namespace);
    }
    set enabled(enabled) {
        this._debug.enabled = enabled;
    }
    get enabled() {
        return this._debug.enabled;
    }
    debug(message, ...args) {
        this.log('debug', message, ...args);
    }
    info(message, ...args) {
        this.log('info', message, ...args);
    }
    warn(message, ...args) {
        this.log('warn', message, ...args);
    }
    error(message, ...args) {
        this.log('error', message, ...args);
    }
    log(level, message, ...args) {
        this._debug.log = console[level].bind(console);
        this._debug(`[${level.toUpperCase()}] ${message}`, ...args);
    }
    namespace(extra) {
        const currentNamespace = this._debug.namespace;
        return new DebugLogger(`${currentNamespace}:${extra}`);
    }
}
//# sourceMappingURL=index.js.map