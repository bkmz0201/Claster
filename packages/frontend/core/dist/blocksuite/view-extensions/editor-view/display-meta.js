import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { DocDisplayMetaProvider } from '@blocksuite/affine/shared/services';
import { createSignalFromObservable, referenceToNode, } from '@blocksuite/affine/shared/utils';
import { LifeCycleWatcher, StdIdentifier } from '@blocksuite/affine/std';
import { LinkedPageIcon, PageIcon } from '@blocksuite/icons/lit';
import { computed } from '@preact/signals-core';
import {} from '@toeverything/infra';
export function buildDocDisplayMetaExtension(framework) {
    const docDisplayMetaService = framework.get(DocDisplayMetaService);
    function iconBuilder(icon, size = '1.25em', style = 'user-select:none;flex-shrink:0;vertical-align:middle;font-size:inherit;margin-bottom:0.1em;') {
        return icon({
            width: size,
            height: size,
            style,
        });
    }
    class AffineDocDisplayMetaService extends LifeCycleWatcher {
        constructor() {
            super(...arguments);
            this.disposables = [];
        }
        static { this.key = 'doc-display-meta'; }
        static setup(di) {
            super.setup(di);
            di.override(DocDisplayMetaProvider, this, [StdIdentifier]);
        }
        dispose() {
            while (this.disposables.length > 0) {
                this.disposables.pop()?.();
            }
        }
        icon(docId, { params, title, referenced } = {}) {
            const icon$ = docDisplayMetaService
                .icon$(docId, {
                type: 'lit',
                title,
                reference: referenced,
                referenceToNode: referenceToNode({ pageId: docId, params }),
            })
                .map(iconBuilder);
            const { signal: iconSignal, cleanup } = createSignalFromObservable(icon$, iconBuilder(referenced ? LinkedPageIcon : PageIcon));
            this.disposables.push(cleanup);
            return computed(() => iconSignal.value);
        }
        title(docId, { title, referenced } = {}) {
            const title$ = docDisplayMetaService.title$(docId, {
                title,
                reference: referenced,
            });
            const { signal: titleSignal, cleanup } = createSignalFromObservable(title$, title ?? '');
            this.disposables.push(cleanup);
            return computed(() => titleSignal.value);
        }
        unmounted() {
            this.dispose();
        }
    }
    return AffineDocDisplayMetaService;
}
//# sourceMappingURL=display-meta.js.map