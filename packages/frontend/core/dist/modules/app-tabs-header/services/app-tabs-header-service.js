import { LiveData, Service } from '@toeverything/infra';
import { Observable } from 'rxjs';
export class AppTabsHeaderService extends Service {
    constructor(desktopApi) {
        super();
        this.desktopApi = desktopApi;
        this.tabsStatus$ = LiveData.from(new Observable(subscriber => {
            let unsub;
            this.desktopApi.handler.ui
                .getTabsStatus()
                .then(tabs => {
                subscriber.next(tabs);
                unsub = this.desktopApi.events.ui.onTabsStatusChange(tabs => {
                    subscriber.next(tabs);
                });
            })
                .catch(console.error);
            return () => {
                unsub?.();
            };
        }), []);
        this.showContextMenu = this.desktopApi.handler.ui.showTabContextMenu;
        this.activateView = this.desktopApi.handler.ui.activateView;
        this.closeTab = this.desktopApi.handler.ui.closeTab;
        this.onAddTab = this.desktopApi.handler.ui.addTab;
        this.onAddDocTab = async (docId, targetTabId, edge) => {
            await this.desktopApi.handler.ui.addTab({
                view: {
                    path: {
                        pathname: '/' + docId,
                    },
                },
                target: targetTabId,
                edge,
            });
        };
        this.onAddTagTab = async (tagId, targetTabId, edge) => {
            await this.desktopApi.handler.ui.addTab({
                view: {
                    path: {
                        pathname: '/tag/' + tagId,
                    },
                },
                target: targetTabId,
                edge,
            });
        };
        this.onAddCollectionTab = async (collectionId, targetTabId, edge) => {
            await this.desktopApi.handler.ui.addTab({
                view: {
                    path: {
                        pathname: '/collection/' + collectionId,
                    },
                },
                target: targetTabId,
                edge,
            });
        };
        this.onToggleRightSidebar = this.desktopApi.handler.ui.toggleRightSidebar;
        this.moveTab = this.desktopApi.handler.ui.moveTab;
    }
}
//# sourceMappingURL=app-tabs-header-service.js.map