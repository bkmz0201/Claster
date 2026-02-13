import { atom } from 'jotai';
import { nanoid } from 'nanoid';
const globalLoadingEventsBaseAtom = atom([]);
export const globalLoadingEventsAtom = atom(get => get(globalLoadingEventsBaseAtom));
export const resolveGlobalLoadingEventAtom = atom(null, (_, set, key) => {
    set(globalLoadingEventsBaseAtom, globalLoadingEvent => globalLoadingEvent.filter(notification => notification.key !== key));
});
export const pushGlobalLoadingEventAtom = atom(null, (_, set, newGlobalLoadingEvent) => {
    newGlobalLoadingEvent.key = newGlobalLoadingEvent.key || nanoid();
    set(globalLoadingEventsBaseAtom, globalLoadingEvents => [
        // push to the top
        { ...newGlobalLoadingEvent },
        ...globalLoadingEvents,
    ]);
});
//# sourceMappingURL=index.jotai.js.map