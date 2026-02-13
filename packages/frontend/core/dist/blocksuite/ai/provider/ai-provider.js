import { captureException } from '@sentry/react';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaymentRequiredError, RequestTimeoutError, UnauthorizedError, } from './error';
/**
 * AI provider for the block suite
 *
 * To use it, downstream (affine) has to provide AI actions implementation,
 * user info etc
 *
 * TODO: breakdown into different parts?
 */
export class AIProvider {
    constructor() {
        this.actions = {};
        this.photoEngine = null;
        this.histories = null;
        this.session = null;
        this.context = null;
        this.toggleGeneralAIOnboarding = null;
        this.forkChat = null;
        this.slots = {
            // use case: when user selects "continue in chat" in an ask ai result panel
            // do we need to pass the context to the chat panel?
            /* eslint-disable rxjs/finnish */
            requestOpenWithChat: new BehaviorSubject(null),
            requestSendWithChat: new BehaviorSubject(null),
            requestInsertTemplate: new Subject(),
            requestLogin: new Subject(),
            requestUpgradePlan: new Subject(),
            // stream of AI actions triggered by users
            actions: new Subject(),
            // downstream can emit this slot to notify ai presets that user info has been updated
            userInfo: new Subject(),
            previewPanelOpenChange: new Subject(),
            /* eslint-enable rxjs/finnish */
        };
        // track the history of triggered actions (in memory only)
        this.actionHistory = [];
        this.userInfoFn = () => null;
        this.embedding = null;
    }
    static get slots() {
        return AIProvider.instance.slots;
    }
    static get actions() {
        return AIProvider.instance.actions;
    }
    static get userInfo() {
        return AIProvider.instance.userInfoFn();
    }
    static get photoEngine() {
        return AIProvider.instance.photoEngine;
    }
    static get histories() {
        return AIProvider.instance.histories;
    }
    static get session() {
        return AIProvider.instance.session;
    }
    static get context() {
        return AIProvider.instance.context;
    }
    static get actionHistory() {
        return AIProvider.instance.actionHistory;
    }
    static get toggleGeneralAIOnboarding() {
        return AIProvider.instance.toggleGeneralAIOnboarding;
    }
    static get forkChat() {
        return AIProvider.instance.forkChat;
    }
    static get embedding() {
        return AIProvider.instance.embedding;
    }
    static { this.instance = new AIProvider(); }
    static { this.LAST_ACTION_SESSIONID = ''; }
    static { this.MAX_LOCAL_HISTORY = 10; }
    provideAction(id, action) {
        // @ts-expect-error TODO: maybe fix this
        this.actions[id] = async (...args) => {
            const options = args[0];
            const slots = this.slots;
            slots.actions.next({
                action: id,
                options,
                event: 'started',
            });
            this.actionHistory.push({ action: id, options });
            if (this.actionHistory.length > AIProvider.MAX_LOCAL_HISTORY) {
                this.actionHistory.shift();
            }
            // wrap the action with slot actions
            const result = await action(...args);
            const isTextStream = (m) => Reflect.has(m, Symbol.asyncIterator);
            if (isTextStream(result)) {
                return {
                    [Symbol.asyncIterator]: async function* () {
                        let user = null;
                        try {
                            user = await AIProvider.userInfo;
                            yield* result;
                            slots.actions.next({
                                action: id,
                                options,
                                event: 'finished',
                            });
                        }
                        catch (err) {
                            slots.actions.next({
                                action: id,
                                options,
                                event: 'error',
                            });
                            if (err instanceof RequestTimeoutError) {
                                slots.actions.next({
                                    action: id,
                                    options,
                                    event: 'aborted:timeout',
                                });
                            }
                            else if (err instanceof PaymentRequiredError) {
                                slots.actions.next({
                                    action: id,
                                    options,
                                    event: 'aborted:paywall',
                                });
                            }
                            else if (err instanceof UnauthorizedError) {
                                slots.actions.next({
                                    action: id,
                                    options,
                                    event: 'aborted:login-required',
                                });
                            }
                            else {
                                slots.actions.next({
                                    action: id,
                                    options,
                                    event: 'aborted:server-error',
                                });
                                captureException(err, {
                                    user: { id: user?.id },
                                    extra: {
                                        action: id,
                                        session: AIProvider.LAST_ACTION_SESSIONID,
                                    },
                                });
                            }
                            throw err;
                        }
                    },
                };
            }
            else {
                let user = null;
                return result
                    .then(async (result) => {
                    user = await AIProvider.userInfo;
                    slots.actions.next({
                        action: id,
                        options,
                        event: 'finished',
                    });
                    return result;
                })
                    .catch(err => {
                    slots.actions.next({
                        action: id,
                        options,
                        event: 'error',
                    });
                    if (err instanceof PaymentRequiredError) {
                        slots.actions.next({
                            action: id,
                            options,
                            event: 'aborted:paywall',
                        });
                    }
                    else {
                        captureException(err, {
                            user: { id: user?.id },
                            extra: {
                                action: id,
                                session: AIProvider.LAST_ACTION_SESSIONID,
                            },
                        });
                    }
                    throw err;
                });
            }
        };
    }
    static provide(id, action) {
        if (id === 'userInfo') {
            AIProvider.instance.userInfoFn = action;
        }
        else if (id === 'histories') {
            AIProvider.instance.histories =
                action;
        }
        else if (id === 'session') {
            AIProvider.instance.session =
                action;
        }
        else if (id === 'context') {
            AIProvider.instance.context =
                action;
        }
        else if (id === 'photoEngine') {
            AIProvider.instance.photoEngine =
                action;
        }
        else if (id === 'onboarding') {
            AIProvider.instance.toggleGeneralAIOnboarding = action;
        }
        else if (id === 'forkChat') {
            AIProvider.instance.forkChat = action;
        }
        else if (id === 'embedding') {
            AIProvider.instance.embedding =
                action;
        }
        else {
            AIProvider.instance.provideAction(id, action);
        }
    }
}
//# sourceMappingURL=ai-provider.js.map