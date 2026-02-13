export const displayFlex = (justifyContent = 'unset', alignItems = 'unset', alignContent = 'unset') => {
    return {
        display: 'flex',
        justifyContent,
        alignItems,
        alignContent,
    };
};
export const displayInlineFlex = (justifyContent = 'unset', alignItems = 'unset', alignContent = 'unset') => {
    return {
        display: 'inline-flex',
        justifyContent,
        alignItems,
        alignContent,
    };
};
export const absoluteCenter = ({ horizontal = false, vertical = false, position: { left, right, top, bottom } = {}, }) => {
    return {
        position: 'absolute',
        left: left ? left : horizontal ? '50%' : 'auto',
        top: top ? top : vertical ? '50%' : 'auto',
        right: right ? right : 'auto',
        bottom: bottom ? bottom : 'auto',
        transform: `translate(${horizontal ? '-50%' : '0'}, ${vertical ? '-50%' : '0'})`,
    };
};
export const fixedCenter = ({ horizontal = false, vertical = false, position: { left, right, top, bottom } = {}, }) => {
    return {
        position: 'fixed',
        left: left ? left : horizontal ? '50%' : 'auto',
        top: top ? top : vertical ? '50%' : 'auto',
        right: right ? right : 'auto',
        bottom: bottom ? bottom : 'auto',
        transform: `translate(${horizontal ? '-50%' : '0'}, ${vertical ? '-50%' : '0'})`,
    };
};
export const textEllipsis = (lineNum = 1) => {
    if (lineNum > 1) {
        return {
            display: '-webkit-box',
            wordBreak: 'break-all',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: `${lineNum}`, //the number of rows to display
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };
    }
    return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };
};
export const positionAbsolute = ({ left, top, right, bottom, }) => {
    return {
        position: 'absolute',
        left,
        top,
        right,
        bottom,
    };
};
//# sourceMappingURL=helper.js.map