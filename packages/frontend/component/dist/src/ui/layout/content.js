import { styled, textEllipsis } from '../../styles';
export const Content = styled('div', {
    shouldForwardProp: prop => {
        return ![
            'color',
            'fontSize',
            'weight',
            'lineHeight',
            'ellipsis',
            'lineNum',
            'width',
            'maxWidth',
            'align',
        ].includes(prop);
    },
})(({ color, fontSize, weight, lineHeight, ellipsis, lineNum, width, maxWidth, align, }) => {
    return {
        width,
        maxWidth,
        textAlign: align,
        display: 'inline-block',
        color: color ?? 'var(--affine-text-primary-color)',
        fontSize: fontSize ?? 'var(--affine-font-base)',
        fontWeight: weight ?? 400,
        lineHeight: lineHeight ?? 1.5,
        ...(ellipsis ? textEllipsis(lineNum) : {}),
    };
});
export default Content;
//# sourceMappingURL=content.js.map