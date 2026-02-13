import type { EventArgs, Events } from './events';
type EventPropsOverride = {
    page?: keyof Events;
    segment?: string;
    module?: string;
    control?: string;
};
export type CallableEventsChain = {
    [Page in keyof Events]: {
        [Segment in keyof Events[Page]]: {
            [Module in keyof Events[Page][Segment]]: {
                [Event in Events[Page][Segment][Module][number]]: Event extends keyof EventArgs ? (args?: Partial<EventArgs[Event]> & EventPropsOverride) => void : (args?: EventPropsOverride) => void;
            };
        };
    };
};
export type EventsUnion = {
    [Page in keyof Events]: {
        [Segment in keyof Events[Page]]: {
            [Module in keyof Events[Page][Segment]]: {
                [Event in Events[Page][Segment][Module][number]]: `${Page}.${Segment}.${Module}.${Event}`;
            }[Events[Page][Segment][Module][number]];
        }[keyof Events[Page][Segment]];
    }[keyof Events[Page]];
}[keyof Events];
type IsFourLevelsDeep<T, Depth extends number[] = []> = Depth['length'] extends 3 ? T extends Array<any> ? true : false : T extends object ? {
    [K in keyof T]: IsFourLevelsDeep<T[K], [...Depth, 0]>;
}[keyof T] extends true ? true : false : false;
export declare const _assertIsAllEventsDefinedInFourLevels: IsFourLevelsDeep<Events>;
export interface EventProps {
    page?: keyof Events;
    segment?: string;
    module?: string;
    control?: string;
    arg?: string;
    type?: string;
    category?: string;
    id?: string;
}
export {};
//# sourceMappingURL=types.d.ts.map