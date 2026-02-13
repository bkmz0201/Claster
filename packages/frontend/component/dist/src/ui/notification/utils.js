import { cssVar } from '@toeverything/theme';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './desktop/styles.css';
export const getCardColor = (style, theme) => {
    if (style === 'information') {
        const map = {
            error: cssVar('backgroundErrorColor'),
            info: cssVar('backgroundProcessingColor'),
            success: cssVar('backgroundSuccessColor'),
            warning: cssVar('backgroundWarningColor'),
        };
        return map[theme];
    }
    if (style === 'alert') {
        const map = {
            error: cssVar('errorColor'),
            info: cssVar('processingColor'),
            success: cssVar('successColor'),
            warning: cssVar('warningColor'),
        };
        return map[theme];
    }
    return cssVar('white');
};
export const getActionTextColor = (style, theme) => {
    if (style === 'information') {
        const map = {
            error: cssVar('errorColor'),
            info: cssVar('processingColor'),
            success: cssVar('successColor'),
            warning: cssVar('warningColor'),
        };
        return map[theme];
    }
    return getCardForegroundColor(style);
};
export const getCardBorderColor = (style) => {
    return style === 'normal' ? cssVar('borderColor') : cssVar('black10');
};
export const getCardForegroundColor = (style) => {
    return style === 'alert' ? cssVar('pureWhite') : cssVar('textPrimaryColor');
};
export const getIconColor = (style, theme, iconColor) => {
    if (style !== 'alert') {
        const map = {
            error: cssVar('errorColor'),
            info: cssVar('processingColor'),
            success: cssVar('successColor'),
            warning: cssVar('warningColor'),
        };
        return iconColor || map[theme];
    }
    return iconColor || cssVar('pureWhite');
};
export const getCloseIconColor = (style) => {
    return style === 'alert'
        ? getCardForegroundColor(style)
        : cssVar('iconColor');
};
export const getCardVars = (style, theme, iconColor) => {
    return assignInlineVars({
        [styles.cardColor]: getCardColor(style, theme),
        [styles.cardBorderColor]: getCardBorderColor(style),
        [styles.cardForeground]: getCardForegroundColor(style),
        [styles.actionTextColor]: getActionTextColor(style, theme),
        [styles.iconColor]: getIconColor(style, theme, iconColor),
        [styles.closeIconColor]: getCloseIconColor(style),
    });
};
//# sourceMappingURL=utils.js.map