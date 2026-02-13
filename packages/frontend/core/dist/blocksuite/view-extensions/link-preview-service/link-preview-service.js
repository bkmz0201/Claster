import { DEFAULT_LINK_PREVIEW_ENDPOINT } from '@blocksuite/affine/shared/consts';
import { LinkPreviewCacheIdentifier, LinkPreviewService, LinkPreviewServiceIdentifier, } from '@blocksuite/affine/shared/services';
import {} from '@blocksuite/affine/store';
import { ServerService } from '../../../modules/cloud/services/server';
class AffineLinkPreviewService extends LinkPreviewService {
    constructor(endpoint, cache) {
        super(cache);
        this.setEndpoint(endpoint);
    }
}
/**
 * Patch the link preview service, set the endpoint and cache
 * @param framework
 * @returns
 */
export function patchLinkPreviewService(framework) {
    // get link preview service endpoint from server and BUILD_CONFIG
    let linkPreviewUrl;
    try {
        const server = framework.get(ServerService).server;
        linkPreviewUrl = new URL(BUILD_CONFIG.linkPreviewUrl || '/', server.baseUrl).toString();
    }
    catch (err) {
        console.error('Invalid BUILD_CONFIG.linkPreviewUrl, falling back to default', err);
        linkPreviewUrl = DEFAULT_LINK_PREVIEW_ENDPOINT;
    }
    return {
        setup: (di) => {
            di.override(LinkPreviewServiceIdentifier, provider => {
                return new AffineLinkPreviewService(linkPreviewUrl, provider.get(LinkPreviewCacheIdentifier));
            });
        },
    };
}
//# sourceMappingURL=link-preview-service.js.map