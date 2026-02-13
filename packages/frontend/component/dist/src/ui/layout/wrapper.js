import { styled } from '../../styles';
// Sometimes we just want to wrap a component with a div to set flex or other styles, but we don't want to create a new component for it.
export const Wrapper = styled('div', {
    shouldForwardProp: prop => {
        return ![
            'display',
            'width',
            'height',
            'padding',
            'margin',
            'paddingTop',
            'paddingRight',
            'paddingLeft',
            'paddingBottom',
            'marginTop',
            'marginLeft',
            'marginRight',
            'marginBottom',
            'flexGrow',
            'flexShrink',
        ].includes(prop);
    },
})(({ display, width, height, padding, margin, paddingTop, paddingRight, paddingLeft, paddingBottom, marginTop, marginLeft, marginRight, marginBottom, flexGrow, flexShrink, }) => {
    return {
        display,
        width,
        height,
        padding,
        margin,
        paddingTop,
        paddingRight,
        paddingLeft,
        paddingBottom,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        flexGrow,
        flexShrink,
    };
});
export const FlexWrapper = styled(Wrapper, {
    shouldForwardProp: prop => {
        return ![
            'justifyContent',
            'alignItems',
            'wrap',
            'flexDirection',
            'flexShrink',
            'flexGrow',
            'gap',
        ].includes(prop);
    },
})(({ justifyContent, alignItems, wrap = false, flexDirection, flexShrink, flexGrow, gap, }) => {
    return {
        display: 'flex',
        justifyContent,
        alignItems,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        flexDirection,
        flexShrink,
        flexGrow,
        gap,
    };
});
export default Wrapper;
//# sourceMappingURL=wrapper.js.map