import { ZERO_WIDTH_FOR_EMPTY_LINE } from '../consts.js';
export function calculateTextLength(text) {
    if (text.wholeText === ZERO_WIDTH_FOR_EMPTY_LINE) {
        return 0;
    }
    else {
        return text.wholeText.length;
    }
}
export function getTextNodesFromElement(element) {
    const textSpanElements = Array.from(element.querySelectorAll('[data-v-text="true"]'));
    const textNodes = textSpanElements.flatMap(textSpanElement => {
        const textNode = Array.from(textSpanElement.childNodes).find((node) => node instanceof Text);
        if (!textNode)
            return [];
        return textNode;
    });
    return textNodes;
}
//# sourceMappingURL=text.js.map