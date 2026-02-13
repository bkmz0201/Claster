import { track } from '@affine/track';
import { Service } from '@toeverything/infra';
import { CollectionsQuickSearchSession } from '../impls/collections';
import { CommandsQuickSearchSession } from '../impls/commands';
import { CreationQuickSearchSession } from '../impls/creation';
import { DocsQuickSearchSession } from '../impls/docs';
import { LinksQuickSearchSession } from '../impls/links';
import { RecentDocsQuickSearchSession } from '../impls/recent-docs';
import { TagsQuickSearchSession } from '../impls/tags';
export class CMDKQuickSearchService extends Service {
    constructor(quickSearchService, workbenchService, docsService) {
        super();
        this.quickSearchService = quickSearchService;
        this.workbenchService = workbenchService;
        this.docsService = docsService;
    }
    toggle() {
        if (this.quickSearchService.quickSearch.show$.value) {
            this.quickSearchService.quickSearch.hide();
        }
        else {
            this.quickSearchService.quickSearch.show([
                this.framework.createEntity(RecentDocsQuickSearchSession),
                this.framework.createEntity(CollectionsQuickSearchSession),
                this.framework.createEntity(CommandsQuickSearchSession),
                this.framework.createEntity(CreationQuickSearchSession),
                this.framework.createEntity(DocsQuickSearchSession),
                this.framework.createEntity(LinksQuickSearchSession),
                this.framework.createEntity(TagsQuickSearchSession),
            ], result => {
                if (!result) {
                    return;
                }
                if (result.source === 'commands') {
                    result.payload.run()?.catch(err => {
                        console.error(err);
                    });
                    return;
                }
                if (result.source === 'link') {
                    const { docId, blockIds, elementIds, mode } = result.payload;
                    this.workbenchService.workbench.openDoc({
                        docId,
                        blockIds,
                        elementIds,
                        mode,
                    });
                    return;
                }
                if (result.source === 'recent-doc' || result.source === 'docs') {
                    const doc = result.payload;
                    if (!doc.docId) {
                        return;
                    }
                    result.source === 'recent-doc' && track.$.cmdk.recent.recentDocs();
                    result.source === 'docs' &&
                        track.$.cmdk.results.searchResultsDocs();
                    const options = {
                        docId: doc.docId,
                    };
                    if (doc.blockId) {
                        options.blockIds = [doc.blockId];
                    }
                    this.workbenchService.workbench.openDoc(options);
                    return;
                }
                if (result.source === 'collections') {
                    this.workbenchService.workbench.openCollection(result.payload.collectionId);
                    return;
                }
                if (result.source === 'tags') {
                    this.workbenchService.workbench.openTag(result.payload.tagId);
                    return;
                }
                if (result.source === 'creation') {
                    if (result.id === 'creation:create-page') {
                        const newDoc = this.docsService.createDoc({
                            primaryMode: 'page',
                            title: result.payload.title,
                        });
                        this.workbenchService.workbench.openDoc(newDoc.id);
                    }
                    else if (result.id === 'creation:create-edgeless') {
                        const newDoc = this.docsService.createDoc({
                            primaryMode: 'edgeless',
                            title: result.payload.title,
                        });
                        this.workbenchService.workbench.openDoc(newDoc.id);
                    }
                    return;
                }
            }, {
                placeholder: {
                    i18nKey: 'com.affine.cmdk.docs.placeholder',
                },
            });
        }
    }
}
//# sourceMappingURL=cmdk.js.map