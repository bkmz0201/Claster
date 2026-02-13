import { DebugLogger } from '@affine/debug';
import mixpanelBrowser from 'mixpanel-browser';
const logger = new DebugLogger('mixpanel');
function createMixpanel() {
    let mixpanel;
    if (BUILD_CONFIG.MIXPANEL_TOKEN) {
        mixpanelBrowser.init(BUILD_CONFIG.MIXPANEL_TOKEN || '', {
            track_pageview: true,
            persistence: 'localStorage',
            api_host: 'https://telemetry.affine.run',
            ignore_dnt: true,
        });
        mixpanel = mixpanelBrowser;
    }
    else {
        mixpanel = new Proxy(function () { }, createProxyHandler());
    }
    const middlewares = new Set();
    const wrapped = {
        init() {
            const defaultProps = {
                appVersion: BUILD_CONFIG.appVersion,
                environment: BUILD_CONFIG.appBuildType,
                editorVersion: BUILD_CONFIG.editorVersion,
                isDesktop: BUILD_CONFIG.isElectron,
                distribution: BUILD_CONFIG.distribution,
            };
            this.register(defaultProps);
        },
        // provide a way to override the default properties
        register(props) {
            logger.debug('register with', props);
            mixpanel.register(props);
        },
        reset() {
            mixpanel.reset();
            this.init();
        },
        track(event_name, properties) {
            const middlewareProperties = Array.from(middlewares).reduce((acc, middleware) => {
                return middleware(event_name, acc);
            }, properties);
            logger.debug('track', event_name, middlewareProperties);
            mixpanel.track(event_name, middlewareProperties);
        },
        middleware(cb) {
            middlewares.add(cb);
            return () => {
                middlewares.delete(cb);
            };
        },
        opt_out_tracking() {
            mixpanel.opt_out_tracking();
        },
        opt_in_tracking() {
            mixpanel.opt_in_tracking();
        },
        has_opted_in_tracking() {
            mixpanel.has_opted_in_tracking();
        },
        has_opted_out_tracking() {
            mixpanel.has_opted_out_tracking();
        },
        identify(unique_id) {
            mixpanel.identify(unique_id);
        },
        get people() {
            return mixpanel.people;
        },
        track_pageview(properties) {
            const middlewareProperties = Array.from(middlewares).reduce((acc, middleware) => {
                return middleware('track_pageview', acc);
            }, properties);
            logger.debug('track_pageview', middlewareProperties);
            mixpanel.track_pageview(middlewareProperties);
        },
    };
    return wrapped;
}
export const mixpanel = createMixpanel();
function createProxyHandler() {
    const handler = {
        get: () => {
            return new Proxy(function () { }, createProxyHandler());
        },
        apply: () => { },
    };
    return handler;
}
//# sourceMappingURL=mixpanel.js.map