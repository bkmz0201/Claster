import { toDocSearchParams } from '@affine/core/modules/navigation/utils';
import { Unreachable } from '@affine/env/constant';
import { Entity, LiveData } from '@toeverything/infra';
import {} from 'history';
import { omit } from 'lodash-es';
import { nanoid } from 'nanoid';
import { View } from './view';
const sidebarOpenKey = 'workbenchSidebarOpen';
const sidebarWidthKey = 'workbenchSidebarWidth';
const workspaceSelectorOpenKey = 'workspaceSelectorOpen';
export class Workbench extends Entity {
    constructor(defaultState, newTabHandler, globalState) {
        super();
        this.defaultState = defaultState;
        this.newTabHandler = newTabHandler;
        this.globalState = globalState;
        this.activeViewIndex$ = new LiveData(this.defaultState.activeViewIndex);
        this.basename$ = new LiveData(this.defaultState.basename);
        this.views$ = new LiveData(this.defaultState.views.map(meta => {
            return this.framework.createEntity(View, {
                id: meta.id,
                defaultLocation: meta.path,
                icon: meta.icon,
                title: meta.title,
            });
        }));
        this.activeView$ = LiveData.computed(get => {
            const activeIndex = get(this.activeViewIndex$);
            const views = get(this.views$);
            // activeIndex could be out of bounds when reordering views
            return views.at(activeIndex) || views[0];
        });
        this.location$ = LiveData.computed(get => {
            return get(get(this.activeView$).location$);
        });
        this.sidebarOpen$ = LiveData.from(this.globalState.watch(sidebarOpenKey), this.globalState.get(sidebarOpenKey) ?? false);
        this.sidebarWidth$ = LiveData.from(this.globalState.watch(sidebarWidthKey), this.globalState.get(sidebarWidthKey) ?? 320);
        this.workspaceSelectorOpen$ = LiveData.from(this.globalState.watch(workspaceSelectorOpenKey), this.globalState.get(workspaceSelectorOpenKey) ?? false);
    }
    setSidebarOpen(open) {
        this.globalState.set(sidebarOpenKey, open);
    }
    setSidebarWidth(width) {
        this.globalState.set(sidebarWidthKey, width);
    }
    setWorkspaceSelectorOpen(open) {
        this.globalState.set(workspaceSelectorOpenKey, open);
    }
    active(index) {
        if (typeof index === 'number') {
            index = Math.max(0, Math.min(index, this.views$.value.length - 1));
            this.activeViewIndex$.next(index);
        }
        else {
            this.activeViewIndex$.next(this.views$.value.indexOf(index));
        }
    }
    updateBasename(basename) {
        this.basename$.next(basename);
    }
    createView(at = 'beside', defaultLocation, active = true) {
        const view = this.framework.createEntity(View, {
            id: nanoid(),
            defaultLocation,
        });
        const newViews = [...this.views$.value];
        newViews.splice(this.indexAt(at), 0, view);
        this.views$.next(newViews);
        const index = newViews.indexOf(view);
        if (active) {
            this.active(index);
        }
        return index;
    }
    openSidebar() {
        this.setSidebarOpen(true);
    }
    closeSidebar() {
        this.setSidebarOpen(false);
    }
    toggleSidebar() {
        this.setSidebarOpen(!this.sidebarOpen$.value);
    }
    openWorkspaceSelector() {
        this.setWorkspaceSelectorOpen(true);
    }
    closeWorkspaceSelector() {
        this.setWorkspaceSelectorOpen(false);
    }
    toggleWorkspaceSelector() {
        this.setWorkspaceSelectorOpen(!this.workspaceSelectorOpen$.value);
    }
    open(to, option = {}) {
        if (option.at === 'new-tab') {
            this.newTab(to, {
                show: option.show,
            });
        }
        else {
            const { at = 'active', replaceHistory = false } = option;
            let view = this.viewAt(at);
            if (!view) {
                const newIndex = this.createView(at, to, option.show);
                view = this.viewAt(newIndex);
                if (!view) {
                    throw new Unreachable();
                }
            }
            else {
                if (replaceHistory) {
                    view.history.replace(to);
                }
                else {
                    view.history.push(to);
                }
            }
        }
    }
    newTab(to, { show, } = {}) {
        this.newTabHandler.handle({
            basename: this.basename$.value,
            to,
            show: show ?? true,
        });
    }
    openDoc(id, options) {
        const isString = typeof id === 'string';
        const docId = isString ? id : id.docId;
        let query = '';
        if (!isString) {
            const search = toDocSearchParams(omit(id, ['docId']));
            if (search?.size) {
                query = `?${search.toString()}`;
            }
        }
        this.open(`/${docId}${query}`, options);
    }
    openAttachment(docId, blockId, options) {
        this.open(`/${docId}/attachments/${blockId}`, options);
    }
    openCollections(options) {
        this.open('/collection', options);
    }
    openCollection(collectionId, options) {
        this.open(`/collection/${collectionId}`, options);
    }
    openAll(options) {
        this.open('/all', options);
    }
    openTrash(options) {
        this.open('/trash', options);
    }
    openTags(options) {
        this.open('/tag', options);
    }
    openTag(tagId, options) {
        this.open(`/tag/${tagId}`, options);
    }
    viewAt(positionIndex) {
        return this.views$.value[this.indexAt(positionIndex)];
    }
    close(view) {
        if (this.views$.value.length === 1)
            return;
        const index = this.views$.value.indexOf(view);
        if (index === -1)
            return;
        const newViews = [...this.views$.value];
        newViews.splice(index, 1);
        const activeViewIndex = this.activeViewIndex$.value;
        if (activeViewIndex !== 0 && activeViewIndex >= index) {
            this.active(activeViewIndex - 1);
        }
        this.views$.next(newViews);
    }
    closeOthers(view) {
        view.size$.next(100);
        this.views$.next([view]);
        this.active(0);
    }
    moveView(from, to) {
        from = Math.max(0, Math.min(from, this.views$.value.length - 1));
        to = Math.max(0, Math.min(to, this.views$.value.length - 1));
        if (from === to)
            return;
        const views = [...this.views$.value];
        const fromView = views[from];
        const toView = views[to];
        views[to] = fromView;
        views[from] = toView;
        this.views$.next(views);
        this.active(to);
    }
    /**
     * resize specified view and the next view
     * @param view
     * @param percent from 0 to 1
     * @returns
     */
    resize(index, percent) {
        const view = this.views$.value[index];
        const nextView = this.views$.value[index + 1];
        if (!nextView)
            return;
        const totalViewSize = this.views$.value.reduce((sum, v) => sum + v.size$.value, 0);
        const percentOfTotal = totalViewSize * percent;
        const newSize = Number((view.size$.value + percentOfTotal).toFixed(4));
        const newNextSize = Number((nextView.size$.value - percentOfTotal).toFixed(4));
        // TODO(@catsjuice): better strategy to limit size
        if (newSize / totalViewSize < 0.2 || newNextSize / totalViewSize < 0.2)
            return;
        view.setSize(newSize);
        nextView.setSize(newNextSize);
    }
    indexAt(positionIndex) {
        if (positionIndex === 'active') {
            return this.activeViewIndex$.value;
        }
        if (positionIndex === 'beside') {
            return this.activeViewIndex$.value + 1;
        }
        if (positionIndex === 'head') {
            return 0;
        }
        if (positionIndex === 'tail') {
            return this.views$.value.length;
        }
        return positionIndex;
    }
}
//# sourceMappingURL=workbench.js.map