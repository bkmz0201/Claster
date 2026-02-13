import { Service } from '@toeverything/infra';
const RECENT_PAGES_LIMIT = 3; // adjust this?
const RECENT_PAGES_KEY = 'recent-pages';
const EMPTY_ARRAY = [];
export class RecentDocsService extends Service {
    constructor(localState, docsService) {
        super();
        this.localState = localState;
        this.docsService = docsService;
    }
    addRecentDoc(pageId) {
        let recentPages = this.getRecentDocIds();
        recentPages = recentPages.filter(id => id !== pageId);
        if (recentPages.length >= RECENT_PAGES_LIMIT) {
            recentPages.pop();
        }
        recentPages.unshift(pageId);
        this.localState.set(RECENT_PAGES_KEY, recentPages);
    }
    getRecentDocs() {
        const docs = this.docsService.list.docs$.value;
        return this.getRecentDocIds()
            .map(id => docs.find(doc => doc.id === id))
            .filter((d) => !!d);
    }
    getRecentDocIds() {
        return (this.localState.get(RECENT_PAGES_KEY) || EMPTY_ARRAY);
    }
}
//# sourceMappingURL=recent-pages.js.map