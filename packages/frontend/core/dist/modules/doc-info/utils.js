import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';
export function signalToObservable(signal) {
    return new Observable(subscriber => {
        const unsub = signal.subscribe(value => {
            subscriber.next(value);
        });
        return () => {
            unsub();
        };
    });
}
export function useSignalValue(signal) {
    const [value, setValue] = useState(signal?.value);
    useEffect(() => {
        if (signal == null) {
            return;
        }
        return signal.subscribe(value => {
            setValue(value);
        });
    }, [signal]);
    return value;
}
//# sourceMappingURL=utils.js.map