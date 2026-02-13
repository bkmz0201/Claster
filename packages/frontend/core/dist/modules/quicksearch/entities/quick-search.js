import { Entity, LiveData } from '@toeverything/infra';
import { mean } from 'lodash-es';
export class QuickSearch extends Entity {
    constructor() {
        super();
        this.state$ = new LiveData(null);
        this.items$ = this.state$
            .map(s => s?.sessions.map(session => session.items$) ?? [])
            .flat()
            .map(items => items.flat());
        this.error$ = this.state$
            .map(s => s?.sessions.map(session => session.error$) ?? [])
            .flat()
            .map(items => items.find(v => !!v) ?? null);
        this.show$ = this.state$.map(s => !!s);
        this.options$ = this.state$.map(s => s?.options);
        this.isLoading$ = this.state$
            .map(s => s?.sessions.map(session => session.isLoading$ ?? new LiveData(false)) ??
            [])
            .flat()
            .map(items => items.reduce((acc, item) => acc || item, false));
        this.loadingProgress$ = this.state$
            .map(s => s?.sessions.map(session => (session.loadingProgress$ ?? new LiveData(null))) ?? [])
            .flat()
            .map(items => mean(items.filter((v) => v === null)));
        this.show = (sources, cb, options = {}) => {
            if (this.state$.value) {
                this.hide();
            }
            const sessions = sources.map((source) => {
                if (typeof source === 'function') {
                    const items$ = new LiveData([]);
                    return {
                        items$,
                        query: (query) => {
                            items$.next(source(query));
                        },
                    };
                }
                else {
                    return source;
                }
            });
            sessions.forEach(session => {
                session.query?.(options.defaultQuery || '');
            });
            this.state$.next({
                query: options.defaultQuery ?? '',
                options,
                sessions: sessions,
                callback: cb,
            });
        };
        this.query$ = this.state$.map(s => s?.query || '');
        this.setQuery = (query) => {
            if (!this.state$.value)
                return;
            this.state$.next({
                ...this.state$.value,
                query,
            });
            this.state$.value.sessions.forEach(session => session.query?.(query));
        };
    }
    hide() {
        if (this.state$.value) {
            this.state$.value.sessions.forEach(session => session.dispose?.());
            this.state$.value.callback?.(null);
        }
        this.state$.next(null);
    }
    submit(result) {
        if (result && result.beforeSubmit && !result.beforeSubmit?.()) {
            return;
        }
        if (this.state$.value?.callback) {
            this.state$.value.sessions.forEach(session => session.dispose?.());
            this.state$.value.callback(result);
        }
        this.state$.next(null);
    }
}
//# sourceMappingURL=quick-search.js.map