import { LifeCycleWatcher } from '@blocksuite/affine/std';
import { buildAIPanelConfig } from '../ai-panel';
import { setupSpaceAIEntry } from '../entries/space/setup-space';
import { AffineAIPanelWidget } from '../widgets/ai-panel/ai-panel';
export function getAIPageRootWatcher(framework) {
    class AIPageRootWatcher extends LifeCycleWatcher {
        static { this.key = 'ai-page-root-watcher'; }
        mounted() {
            super.mounted();
            const { view } = this.std;
            view.viewUpdated.subscribe(payload => {
                if (payload.type !== 'widget' || payload.method !== 'add') {
                    return;
                }
                const component = payload.view;
                if (component instanceof AffineAIPanelWidget) {
                    component.style.width = '630px';
                    component.config = buildAIPanelConfig(component, framework);
                    setupSpaceAIEntry(component);
                }
            });
        }
    }
    return AIPageRootWatcher;
}
//# sourceMappingURL=ai-page-root.js.map