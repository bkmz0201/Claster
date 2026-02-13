import type { NotificationStyle, NotificationTheme } from './types';
export declare const getCardColor: (style: NotificationStyle, theme: NotificationTheme) => string;
export declare const getActionTextColor: (style: NotificationStyle, theme: NotificationTheme) => string;
export declare const getCardBorderColor: (style: NotificationStyle) => string;
export declare const getCardForegroundColor: (style: NotificationStyle) => string;
export declare const getIconColor: (style: NotificationStyle, theme: NotificationTheme, iconColor?: string) => string;
export declare const getCloseIconColor: (style: NotificationStyle) => string;
export declare const getCardVars: (style: NotificationStyle, theme: NotificationTheme, iconColor?: string) => {
    [cssVarName: string]: string;
};
//# sourceMappingURL=utils.d.ts.map