import { Entity, LiveData } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import queryString from 'query-string';
import { Observable } from 'rxjs';
import { createNavigableHistory } from '../../../utils/navigable-history';
import { ViewScope } from '../scopes/view';
import { SidebarTab } from './sidebar-tab';
export class View extends Entity {
    get id() {
        return this.props.id;
    }
    set id(id) {
        this.props.id = id;
    }
    constructor() {
        super();
        this.scope = this.framework.createScope(ViewScope, {
            view: this,
        });
        this.sidebarTabs$ = new LiveData([]);
        this.scrollPositions = new WeakMap();
        // _activeTabId may point to a non-existent tab.
        // In this case, we still retain the activeTabId data and wait for the non-existent tab to be mounted.
        this._activeSidebarTabId$ = new LiveData(null);
        this.activeSidebarTab$ = LiveData.computed(get => {
            const activeTabId = get(this._activeSidebarTabId$);
            const tabs = get(this.sidebarTabs$);
            return tabs.length > 0
                ? (tabs.find(tab => tab.id === activeTabId) ?? tabs[0])
                : null;
        });
        this.history = createNavigableHistory({
            initialEntries: ['/all'],
            initialIndex: 0,
        });
        this.location$ = LiveData.from(new Observable(subscriber => {
            subscriber.next(this.history.location);
            return this.history.listen(update => {
                subscriber.next(update.location);
            });
        }), this.history.location);
        this.entries$ = LiveData.from(new Observable(subscriber => {
            subscriber.next(this.history.entries);
            return this.history.listen(() => {
                subscriber.next(this.history.entries);
            });
        }), this.history.entries);
        this.size$ = new LiveData(100);
        this.title$ = new LiveData(this.props.title ?? '');
        this.icon$ = new LiveData(this.props.icon ?? 'allDocs');
        this.history = createNavigableHistory({
            initialEntries: [this.props.defaultLocation ?? { pathname: '/all' }],
            initialIndex: 0,
        });
    }
    queryString$(options = {
        parseNumbers: true,
        parseBooleans: true,
    }) {
        return this.location$
            .selector(v => v.search)
            .map(search => queryString.parse(search, options));
    }
    updateQueryString(patch, { forceUpdate, parseNumbers, replace, } = {}) {
        const oldQueryStrings = queryString.parse(location.search, {
            parseBooleans: true,
            parseNumbers: parseNumbers,
        });
        const newQueryStrings = { ...oldQueryStrings, ...patch };
        if (forceUpdate || !isEqual(oldQueryStrings, newQueryStrings)) {
            const search = queryString.stringify(newQueryStrings);
            const newState = {
                ...this.history.location,
                search,
            };
            if (replace) {
                this.history.replace(newState);
            }
            else {
                this.history.push(newState);
            }
        }
    }
    push(path) {
        this.history.push(path);
    }
    go(n) {
        this.history.go(n);
    }
    replace(path) {
        this.history.replace(path);
    }
    setSize(size) {
        this.size$.next(size ?? 100);
    }
    addSidebarTab(id) {
        this.sidebarTabs$.next([
            ...this.sidebarTabs$.value,
            this.scope.createEntity(SidebarTab, {
                id,
            }),
        ]);
        return id;
    }
    removeSidebarTab(id) {
        this.sidebarTabs$.next(this.sidebarTabs$.value.filter(tab => tab.id !== id));
    }
    activeSidebarTab(id) {
        this._activeSidebarTabId$.next(id);
    }
    getScrollPosition() {
        return this.scrollPositions.get(this.history.location);
    }
    setScrollPosition(position) {
        this.scrollPositions.set(this.history.location, position);
    }
    setTitle(title) {
        this.title$.next(title);
    }
    setIcon(icon) {
        this.icon$.next(icon);
    }
}
//# sourceMappingURL=view.js.map