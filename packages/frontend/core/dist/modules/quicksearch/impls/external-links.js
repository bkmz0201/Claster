import { LinkIcon } from '@blocksuite/icons/rc';
import { Entity, LiveData } from '@toeverything/infra';
import { resolveLinkToDoc } from '../../navigation';
import { isLink } from '../../navigation/utils';
export class ExternalLinksQuickSearchSession extends Entity {
    constructor(workspaceService) {
        super();
        this.workspaceService = workspaceService;
        this.query$ = new LiveData('');
        this.items$ = LiveData.computed(get => {
            const query = get(this.query$).trim();
            if (!query)
                return [];
            if (!isLink(query))
                return [];
            const resolvedDoc = resolveLinkToDoc(query);
            if (resolvedDoc &&
                resolvedDoc.workspaceId === this.workspaceService.workspace.id) {
                // is doc url
                return [];
            }
            return [
                {
                    id: 'external-link:' + query,
                    source: 'external-link',
                    icon: LinkIcon,
                    label: {
                        i18nKey: 'com.affine.cmdk.affine.insert-link',
                    },
                    payload: { url: query },
                },
            ];
        });
    }
    query(query) {
        this.query$.next(query);
    }
}
//# sourceMappingURL=external-links.js.map