import { AIProvider } from '../provider';
export function reportResponse(event) {
    const lastAction = AIProvider.actionHistory.at(-1);
    if (!lastAction)
        return;
    AIProvider.slots.actions.next({
        action: lastAction.action,
        options: lastAction.options,
        event,
    });
}
//# sourceMappingURL=action-reporter.js.map