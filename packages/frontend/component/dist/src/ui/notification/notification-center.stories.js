import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { SingleSelectCheckSolidIcon } from '@blocksuite/icons/rc';
import { cssVar } from '@toeverything/theme';
import { useState } from 'react';
import { Button } from '../button';
import { Modal } from '../modal';
import { NotificationCenter, notify } from '.';
import { getCardBorderColor, getCardColor, getCardForegroundColor, } from './utils';
export default {
    title: 'UI/NotificationCenter',
};
const themes = ['info', 'success', 'warning', 'error'];
const styles = ['normal', 'information', 'alert'];
const Root = ({ children, ...attrs }) => (_jsxs(_Fragment, { children: [_jsx(NotificationCenter, {}), _jsx("div", { ...attrs, children: children })] }));
const Label = ({ children, ...attrs }) => (_jsxs("span", { style: { fontWeight: 400, opacity: 0.5 }, ...attrs, children: [children, ":\u00A0"] }));
export const ThemeAndStyle = () => {
    return (_jsx(Root, { children: styles.map(style => {
            return (_jsxs("div", { style: { marginBottom: 20 }, children: [_jsxs("h3", { style: { marginBottom: 8 }, children: [_jsx(Label, { children: "style" }), style] }), _jsx("div", { style: { display: 'flex', gap: 4 }, children: themes.map(theme => {
                            return (_jsxs(Button, { style: {
                                    backgroundColor: getCardColor(style, theme),
                                    borderColor: getCardBorderColor(style),
                                    color: getCardForegroundColor(style),
                                }, onClick: () => notify({
                                    title: `${theme} title`,
                                    message: (_jsxs("span", { children: ["Test with ", _jsx(Label, { children: "style" }), _jsx("code", { children: style }), "\u00A0and\u00A0", _jsx(Label, { children: "theme" }), _jsx("code", { children: theme })] })),
                                    style,
                                    theme,
                                }), children: [_jsx(Label, { children: "theme" }), " ", theme] }, theme));
                        }) })] }, style));
        }) }));
};
export const CustomIcon = () => {
    const icons = [
        { label: 'No icon', icon: null },
        {
            label: 'SingleSelectIcon',
            icon: _jsx(SingleSelectCheckSolidIcon, {}),
        },
        {
            label: 'Icon Color',
            icon: _jsx(SingleSelectCheckSolidIcon, { color: cssVar('successColor') }),
        },
    ];
    return (_jsx(Root, { style: { display: 'flex', gap: 4 }, children: icons.map(({ label, icon }) => (_jsx(Button, { onClick: () => notify({
                title: label,
                message: 'test with custom icon ' + label,
                icon,
            }), children: label }, label))) }));
};
export const CustomRenderer = () => {
    const CustomRender = ({ onDismiss }) => {
        return (_jsxs("div", { style: {
                border: '1px solid ' + cssVar('borderColor'),
                padding: 16,
                borderRadius: 4,
                background: cssVar('white'),
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }, children: ["CustomRenderer", _jsx(Button, { onClick: onDismiss, children: "Close" })] }));
    };
    return (_jsx(Root, { children: _jsx(Button, { onClick: () => notify.custom(CustomRender), children: "Open CustomRenderer" }) }));
};
export const WithAction = () => {
    return (_jsxs(Root, { children: [styles.map(style => {
                return (_jsxs("div", { style: { marginBottom: 20 }, children: [_jsxs("h3", { style: { marginBottom: 8 }, children: [_jsx(Label, { children: "style" }), style] }), _jsx("div", { style: { display: 'flex', gap: 4 }, children: themes.map(theme => {
                                return (_jsxs(Button, { style: {
                                        backgroundColor: getCardColor(style, theme),
                                        borderColor: getCardBorderColor(style),
                                        color: getCardForegroundColor(style),
                                    }, onClick: () => notify({
                                        title: `${theme} title`,
                                        message: (_jsxs("span", { children: ["Test with ", _jsx(Label, { children: "style" }), _jsx("code", { children: style }), "\u00A0and\u00A0", _jsx(Label, { children: "theme" }), _jsx("code", { children: theme })] })),
                                        style,
                                        theme,
                                        actions: [
                                            {
                                                key: 'undo',
                                                label: 'UNDO',
                                                onClick: () => console.log('undo'),
                                            },
                                        ],
                                    }), children: [_jsx(Label, { children: "theme" }), " ", theme] }, theme));
                            }) })] }, style));
            }), _jsx("h3", { style: { marginBottom: 8 }, children: "Disable auto close" }), _jsx(Button, { onClick: () => {
                    notify({
                        title: 'Disable auto close',
                        message: 'Test with disable auto close',
                        actions: [
                            {
                                key: 'undo',
                                label: 'UNDO',
                                onClick: () => console.log('undo'),
                                autoClose: false,
                            },
                        ],
                    }, { duration: 22222222 });
                }, children: "Do not close after action clicked" })] }));
};
export const ZIndexWithModal = () => {
    const [open, setOpen] = useState(false);
    return (_jsxs(Root, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open modal" }), _jsx(Modal, { open: open, onOpenChange: setOpen, children: _jsx(Button, { onClick: () => notify({ title: 'Notify', message: 'Test with modal' }, { duration: 2000000 }), children: "Notify" }) })] }));
};
export const DifferentSize = () => {
    const openTiny = () => {
        notify({ title: 'Tiny' }, { duration: 60000 });
    };
    const openNormal = () => notify({
        title: 'Normal Size',
        message: 'With basic title and one line message',
    }, { duration: 60000 });
    const openLarge = () => {
        notify({
            title: 'Large Size',
            message: (_jsxs("div", { children: [_jsx("h1", { children: "Large Size" }), _jsx("p", { children: "With long title and long message to test the size of the notification; The content may be multiline and the card will be larger." })] })),
        }, { duration: 60000 });
    };
    const openWithThumb = () => {
        notify({
            thumb: (_jsx("div", { style: {
                    height: 100,
                    background: 'rgba(100,100,100,.05)',
                    lineHeight: '100px',
                    textAlign: 'center',
                    borderTopLeftRadius: 'inherit',
                    borderTopRightRadius: 'inherit',
                }, children: "Hack thumb" })),
            title: 'Card with thumb',
            message: 'With basic title and one line message',
        }, { duration: 60000 });
    };
    return (_jsxs(Root, { style: { display: 'flex', gap: 8 }, children: [_jsx(Button, { onClick: openTiny, children: "Open Tiny" }), _jsx(Button, { onClick: openNormal, children: "Open Normal" }), _jsx(Button, { onClick: openLarge, children: "Open Large" }), _jsx(Button, { onClick: openWithThumb, children: "Open with thumb" })] }));
};
//# sourceMappingURL=notification-center.stories.js.map