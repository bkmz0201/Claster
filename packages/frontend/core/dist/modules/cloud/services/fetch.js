import { DebugLogger } from '@affine/debug';
import { UserFriendlyError } from '@affine/error';
import { fromPromise, Service } from '@toeverything/infra';
const logger = new DebugLogger('affine:fetch');
export class FetchService extends Service {
    constructor(serverService) {
        super();
        this.serverService = serverService;
        this.rxFetch = (input, init) => {
            return fromPromise(signal => {
                return this.fetch(input, { signal, ...init });
            });
        };
        /**
         * fetch with custom custom timeout and error handling.
         */
        this.fetch = async (input, init) => {
            logger.debug('fetch', input);
            const externalSignal = init?.signal;
            if (externalSignal?.aborted) {
                throw externalSignal.reason;
            }
            const abortController = new AbortController();
            externalSignal?.addEventListener('abort', reason => {
                abortController.abort(reason);
            });
            const timeout = init?.timeout ?? 15000;
            const timeoutId = timeout > 0
                ? setTimeout(() => {
                    abortController.abort(new Error('timeout after ' + timeout + 'ms'));
                }, timeout)
                : undefined;
            let res;
            try {
                res = await globalThis.fetch(new URL(input, this.serverService.server.serverMetadata.baseUrl), {
                    ...init,
                    signal: abortController.signal,
                    headers: {
                        ...init?.headers,
                        'x-affine-version': BUILD_CONFIG.appVersion,
                    },
                });
            }
            catch (err) {
                throw new UserFriendlyError({
                    status: 504,
                    code: 'NETWORK_ERROR',
                    type: 'NETWORK_ERROR',
                    name: 'NETWORK_ERROR',
                    message: `Network error: ${err.message}`,
                    stacktrace: err.stack,
                });
            }
            finally {
                clearTimeout(timeoutId);
            }
            if (!res.ok) {
                if (res.status === 504) {
                    const error = new Error('Gateway Timeout');
                    logger.debug('network error', error);
                    throw new UserFriendlyError({
                        status: 504,
                        code: 'NETWORK_ERROR',
                        type: 'NETWORK_ERROR',
                        name: 'NETWORK_ERROR',
                        message: 'Gateway Timeout',
                        stacktrace: error.stack,
                    });
                }
                else {
                    if (res.headers.get('Content-Type')?.startsWith('application/json')) {
                        throw UserFriendlyError.fromAny(await res.json());
                    }
                    else {
                        throw UserFriendlyError.fromAny(await res.text());
                    }
                }
            }
            return res;
        };
    }
}
//# sourceMappingURL=fetch.js.map