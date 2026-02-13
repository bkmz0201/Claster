import { isInsidePageEditor } from '@blocksuite/affine/shared/utils';
import { mergeStreamContent } from '../../utils/stream-objects';
export function filterAIItemGroup(host, configs) {
    const editorMode = isInsidePageEditor(host) ? 'page' : 'edgeless';
    return configs
        .map(group => ({
        ...group,
        items: group.items.filter(item => item.showWhen
            ? item.showWhen(host.command.chain(), editorMode, host)
            : true),
    }))
        .filter(group => group.items.length > 0);
}
export function mergeAIActionAnswer(answer) {
    if (answer.streamObjects?.length) {
        return mergeStreamContent(answer.streamObjects);
    }
    return answer.content;
}
//# sourceMappingURL=utils.js.map