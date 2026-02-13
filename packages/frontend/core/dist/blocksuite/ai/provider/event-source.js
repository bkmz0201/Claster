import { handleError } from './copilot-client';
import { RequestTimeoutError } from './error';
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// todo(@Peng): may need to extend the error type
const safeParseError = (data) => {
    try {
        return JSON.parse(data);
    }
    catch {
        return {
            status: 500,
        };
    }
};
export function toTextStream(eventSource, { timeout, signal } = {}) {
    return {
        [Symbol.asyncIterator]: async function* () {
            const messageQueue = [];
            let resolveMessagePromise;
            let rejectMessagePromise;
            function resetMessagePromise() {
                if (resolveMessagePromise) {
                    resolveMessagePromise();
                }
                return new Promise((resolve, reject) => {
                    resolveMessagePromise = resolve;
                    rejectMessagePromise = reject;
                });
            }
            let messagePromise = resetMessagePromise();
            function messageListener(event) {
                messageQueue.push({
                    type: event.type,
                    data: event.data,
                });
                messagePromise = resetMessagePromise();
            }
            eventSource.addEventListener('message', messageListener);
            eventSource.addEventListener('attachment', messageListener);
            eventSource.addEventListener('error', event => {
                const errorMessage = event.data;
                // if there is data in Error event, it means the server sent an error message
                // otherwise, the stream is finished successfully
                if (event.type === 'error' && errorMessage) {
                    // try to parse the error message as a JSON object
                    const error = safeParseError(errorMessage);
                    rejectMessagePromise(handleError(error));
                }
                else {
                    resolveMessagePromise();
                }
                eventSource.close();
            });
            try {
                while (eventSource.readyState !== EventSource.CLOSED &&
                    !signal?.aborted) {
                    if (messageQueue.length === 0) {
                        // Wait for the next message or timeout
                        await (timeout
                            ? Promise.race([
                                messagePromise,
                                delay(timeout).then(() => {
                                    if (!signal?.aborted) {
                                        throw new RequestTimeoutError();
                                    }
                                }),
                            ])
                            : messagePromise);
                    }
                    else if (messageQueue.length > 0) {
                        const top = messageQueue.shift();
                        if (top) {
                            yield top;
                        }
                    }
                }
            }
            finally {
                eventSource.close();
            }
        },
    };
}
//# sourceMappingURL=event-source.js.map