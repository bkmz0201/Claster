import { DebugLogger } from '@affine/debug';
const logger = new DebugLogger('mixpanel');
const levels = ['page', 'segment', 'module', 'event'];
export function makeTracker(trackFn) {
    function makeTrackerInner(level, info) {
        const proxy = new Proxy({}, {
            get(target, prop) {
                if (typeof prop !== 'string' ||
                    prop === '$$typeof' /* webpack hot-reload reads this prop */) {
                    return undefined;
                }
                if (levels[level] === 'event') {
                    return (arg) => {
                        trackFn(prop, {
                            ...info,
                            ...(typeof arg === 'string' ? { arg } : arg),
                        });
                    };
                }
                else {
                    let levelProxy = target[prop];
                    if (levelProxy) {
                        return levelProxy;
                    }
                    levelProxy = makeTrackerInner(level + 1, prop === '$' ? { ...info } : { ...info, [levels[level]]: prop });
                    target[prop] = levelProxy;
                    return levelProxy;
                }
            },
        });
        return proxy;
    }
    return makeTrackerInner(0, {});
}
/**
 * listen on clicking on all subtree elements and auto track events if defined
 *
 * @example
 *
 * ```html
 * <button
 *   data-event-chain='$.cmdk.settings.changeLanguage'
 *   data-event-arg='cn'
 *   <!-- or -->
 *   data-event-args-foo='bar'
 * />
 * ```
 */
export function enableAutoTrack(root, trackFn) {
    const listener = (e) => {
        const el = e.target;
        if (!el) {
            return;
        }
        const dataset = el.dataset;
        if (dataset['eventProps']) {
            const args = {};
            if (dataset['eventArg'] !== undefined) {
                args['arg'] = dataset['event-arg'];
            }
            else {
                for (const argName of Object.keys(dataset)) {
                    if (argName.startsWith('eventArgs')) {
                        args[argName.slice(9).toLowerCase()] = dataset[argName];
                    }
                }
            }
            const props = dataset['eventProps']
                .split('.')
                .map(name => (name === '$' ? undefined : name));
            if (props.length !== levels.length) {
                logger.error('Invalid event props on element', el);
                return;
            }
            const event = props[3];
            if (!event) {
                logger.error('Invalid event props on element', el);
                return;
            }
            trackFn(event, {
                page: props[0],
                segment: props[1],
                module: props[2],
                ...args,
            });
        }
    };
    root.addEventListener('click', listener, {});
    return () => {
        root.removeEventListener('click', listener);
    };
}
//# sourceMappingURL=auto.js.map