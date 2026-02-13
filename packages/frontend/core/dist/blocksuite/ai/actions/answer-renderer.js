import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { createAIScrollableTextRenderer } from '../components/ai-scrollable-text-renderer';
import { createMindmapExecuteRenderer, createMindmapRenderer, } from '../messages/mindmap';
import { createSlidesRenderer } from '../messages/slides-renderer';
import { createIframeRenderer, createImageRenderer } from '../messages/wrapper';
import { isMindmapChild, isMindMapRoot } from '../utils/edgeless';
import { IMAGE_ACTIONS } from './consts';
import { responseToExpandMindmap } from './edgeless-response';
export function actionToAnswerRenderer(id, host, ctx) {
    if (id === 'brainstormMindmap') {
        const selectedElements = ctx.get().selectedElements;
        if (selectedElements &&
            (isMindMapRoot(selectedElements[0]) ||
                isMindmapChild(selectedElements[0]))) {
            const mindmap = selectedElements[0].group;
            return createMindmapRenderer(host, ctx, mindmap.style);
        }
        return createMindmapRenderer(host, ctx);
    }
    if (id === 'expandMindmap') {
        return createMindmapExecuteRenderer(host, ctx, responseToExpandMindmap);
    }
    if (id === 'createSlides') {
        return createSlidesRenderer(host, ctx);
    }
    if (id === 'makeItReal') {
        return createIframeRenderer(host, { height: 300 });
    }
    if (IMAGE_ACTIONS.includes(id)) {
        return createImageRenderer(host, { height: 300 });
    }
    return createAIScrollableTextRenderer({
        theme: host.std.get(ThemeProvider).app$,
    }, 320, true);
}
//# sourceMappingURL=answer-renderer.js.map