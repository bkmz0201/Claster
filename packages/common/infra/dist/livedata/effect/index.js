import { DebugLogger } from '@affine/debug';
import { Unreachable } from '@affine/env/constant';
import { Subject } from 'rxjs';
const logger = new DebugLogger('effect');
export function effect(...args) {
    const subject$ = new Subject();
    const effectLocation = BUILD_CONFIG.debug
        ? `(${new Error().stack?.split('\n')[2].trim()})`
        : '';
    class EffectError extends Unreachable {
        constructor(message, value) {
            logger.error(`effect ${effectLocation} ${message}`, value);
            super(`effect ${effectLocation} ${message}` +
                ` ${value ? (value instanceof Error ? (value.stack ?? value.message) : value + '') : ''}`);
        }
    }
    let subscription = null;
    function subscribe() {
        subscription = subject$.pipe.apply(subject$, args).subscribe({
            complete() {
                const error = new EffectError('effect unexpected complete');
                // make a uncaught exception
                setTimeout(() => {
                    throw error;
                }, 0);
            },
            error(error) {
                const effectError = new EffectError('effect uncaught error', error);
                // make a uncaught exception
                setTimeout(() => {
                    throw effectError;
                }, 0);
            },
        });
    }
    subscribe();
    const fn = (value) => {
        subject$.next(value);
    };
    fn.unsubscribe = () => subscription?.unsubscribe();
    fn.reset = () => {
        subscription?.unsubscribe();
        subscribe();
    };
    return fn;
}
//# sourceMappingURL=index.js.map