import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Credits to sonner
// License on the MIT
// https://github.com/emilkowalski/sonner/blob/5cb703edc108a23fd74979235c2f3c4005edd2a7/src/index.tsx
import { useI18n } from '@affine/i18n';
import { CloseIcon, InformationFillDuotoneIcon } from '@blocksuite/icons/rc';
import * as Toast from '@radix-ui/react-toast';
import clsx from 'clsx';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import { IconButton } from '../../ui/button';
import { SuccessIcon } from './icons';
import * as styles from './index.css';
import { expandNotificationCenterAtom, notificationsAtom, pushNotificationAtom, removeNotificationAtom, } from './index.jotai';
export { expandNotificationCenterAtom, pushNotificationAtom, removeNotificationAtom, };
const typeColorMap = {
    info: {
        light: styles.lightInfoStyle,
        dark: styles.darkInfoStyle,
        default: '',
        icon: _jsx(InformationFillDuotoneIcon, {}),
    },
    success: {
        light: styles.lightSuccessStyle,
        dark: styles.darkSuccessStyle,
        default: '',
        icon: _jsx(SuccessIcon, {}),
    },
    warning: {
        light: styles.lightWarningStyle,
        dark: styles.darkWarningStyle,
        default: '',
        icon: _jsx(InformationFillDuotoneIcon, {}),
    },
    error: {
        light: styles.lightErrorStyle,
        dark: styles.darkErrorStyle,
        default: '',
        icon: _jsx(InformationFillDuotoneIcon, {}),
    },
};
function NotificationCard(props) {
    const t = useI18n();
    const removeNotification = useSetAtom(removeNotificationAtom);
    const { notification, notifications, setHeights, heights, index } = props;
    const [expand, setExpand] = useAtom(expandNotificationCenterAtom);
    // const setNotificationRemoveAnimation = useSetAtom(notificationRemoveAnimationAtom);
    const [mounted, setMounted] = useState(false);
    const [removed, setRemoved] = useState(false);
    const [offsetBeforeRemove, setOffsetBeforeRemove] = useState(0);
    const [initialHeight, setInitialHeight] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);
    const animationRef = useRef(null);
    const notificationRef = useRef(null);
    const timerIdRef = useRef(null);
    const isFront = index === 0;
    const isVisible = index + 1 <= 3;
    const progressDuration = notification.timeout || 3000;
    const heightIndex = useMemo(() => heights.findIndex(height => height.notificationKey === notification.key) || 0, [heights, notification.key]);
    const duration = notification.timeout || 3000;
    const offset = useRef(0);
    const notificationsHeightBefore = useMemo(() => {
        return heights.reduce((prev, curr, reducerIndex) => {
            // Calculate offset up until current  notification
            if (reducerIndex >= heightIndex) {
                return prev;
            }
            return prev + curr.height;
        }, 0);
    }, [heights, heightIndex]);
    offset.current = useMemo(() => heightIndex * 14 + notificationsHeightBefore, [heightIndex, notificationsHeightBefore]);
    useEffect(() => {
        // Trigger enter animation without using CSS animation
        setMounted(true);
    }, []);
    useEffect(() => {
        if (!expand) {
            animationRef.current?.beginElement();
        }
    }, [expand]);
    const resetAnimation = () => {
        setAnimationKey(prevKey => prevKey + 1);
    };
    useLayoutEffect(() => {
        if (!mounted)
            return;
        if (!notificationRef.current)
            return;
        const notificationNode = notificationRef.current;
        const originalHeight = notificationNode.style.height;
        notificationNode.style.height = 'auto';
        const newHeight = notificationNode.getBoundingClientRect().height;
        notificationNode.style.height = originalHeight;
        setInitialHeight(newHeight);
        setHeights(heights => {
            const alreadyExists = heights.find(height => height.notificationKey === notification.key);
            if (!alreadyExists) {
                return [
                    { notificationKey: notification.key, height: newHeight },
                    ...heights,
                ];
            }
            else {
                return heights.map(height => height.notificationKey === notification.key
                    ? { ...height, height: newHeight }
                    : height);
            }
        });
    }, [notification.title, notification.key, mounted, setHeights]);
    const typeStyle = typeColorMap[notification.type][notification.theme || 'dark'];
    const onClickRemove = useCallback(() => {
        // Save the offset for the exit swipe animation
        setRemoved(true);
        setOffsetBeforeRemove(offset.current);
        setHeights(h => h.filter(height => height.notificationKey !== notification.key));
        window.setTimeout(() => {
            if (!notification.key) {
                return;
            }
            removeNotification(notification.key);
        }, 200);
    }, [setHeights, notification.key, removeNotification, offset]);
    useEffect(() => {
        if (timerIdRef.current) {
            clearTimeout(timerIdRef.current);
        }
        if (!expand) {
            timerIdRef.current = window.setTimeout(() => {
                onClickRemove();
            }, duration);
        }
        return () => {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current);
            }
        };
    }, [duration, expand, onClickRemove]);
    const onClickAction = useCallback(() => {
        if (notification.action) {
            notification.action().catch(err => {
                console.error(err);
            });
        }
        return void 0;
    }, [notification]);
    useEffect(() => {
        const notificationNode = notificationRef.current;
        if (notificationNode) {
            const height = notificationNode.getBoundingClientRect().height;
            // Add toast height tot heights array after the toast is mounted
            setInitialHeight(height);
            setHeights(h => [{ notificationKey: notification.key, height }, ...h]);
            return () => setHeights(h => h.filter(height => height.notificationKey !== notification.key));
        }
        return;
    }, [notification.key, setHeights]);
    return (_jsx(Toast.Root, { className: clsx(styles.notificationStyle, {
            [styles.lightCollapseStyle[index === 1 ? 'secondary' : 'tertiary']]: !isFront && !expand && notification.theme === 'light',
            [styles.darkCollapseStyle[index === 1 ? 'secondary' : 'tertiary']]: !isFront && !expand && notification.theme === 'dark',
            [styles.defaultCollapseStyle[index === 1 ? 'secondary' : 'tertiary']]: !isFront && !expand && !notification.theme,
        }), duration: Infinity, "aria-live": "polite", "aria-atomic": "true", role: "status", tabIndex: 0, ref: notificationRef, "data-mounted": mounted, "data-removed": removed, "data-visible": isVisible, "data-index": index, "data-front": isFront, "data-expanded": expand, "data-testid": "affine-notification", onMouseEnter: () => {
            setExpand(true);
        }, onMouseMove: () => {
            setExpand(true);
        }, onMouseLeave: () => {
            setExpand(false);
        }, onSwipeEnd: event => event.preventDefault(), onSwipeMove: event => event.preventDefault(), style: {
            '--index': index,
            '--toasts-before': index,
            '--z-index': notifications.length - index,
            '--offset': `${removed ? offsetBeforeRemove : offset.current}px`,
            '--initial-height': `${initialHeight}px`,
            userSelect: 'auto',
        }, children: _jsxs("div", { className: clsx({
                [typeStyle]: notification.theme !== 'default',
                [styles.hasMediaStyle]: notification.multimedia,
                [styles.notificationContentStyle]: !notification.multimedia,
            }), children: [notification.multimedia ? (_jsxs("div", { className: styles.notificationMultimediaStyle, children: [notification.multimedia, _jsx(IconButton, { className: styles.closeButtonWithMediaStyle, children: _jsx(CloseIcon, { onClick: onClickRemove }) })] })) : null, _jsxs(Toast.Title, { className: clsx(styles.notificationTitleStyle, {
                        [styles.darkColorStyle]: notification.theme !== 'light' &&
                            notification.theme !== 'default',
                    }), children: [_jsx("div", { className: clsx(styles.notificationIconStyle, {
                                [styles.darkColorStyle]: notification.theme !== 'light' &&
                                    notification.theme !== 'default',
                                [styles.lightInfoIconStyle]: notification.theme === 'light',
                            }), children: typeColorMap[notification.type]?.icon ?? (_jsx(InformationFillDuotoneIcon, {})) }), _jsx("div", { className: styles.notificationTitleContactStyle, children: notification.title }), notification.action && (_jsx("div", { className: clsx(styles.undoButtonStyle, {
                                [styles.darkColorStyle]: notification.theme !== 'light' &&
                                    notification.theme !== 'default',
                                [styles.undoButtonWithMediaStyle]: notification.multimedia,
                            }), onClick: onClickAction, children: notification.actionLabel ??
                                t['com.affine.keyboardShortcuts.undo']() })), notification.multimedia ? null : (_jsx(IconButton, { className: clsx(styles.closeButtonStyle, {
                                [styles.closeButtonWithoutUndoStyle]: !notification.action,
                            }), style: {
                                color: notification.theme !== 'light' &&
                                    notification.theme !== 'default'
                                    ? 'var(--affine-pure-white)'
                                    : 'var(--affine-text-primary-color)',
                            }, children: _jsx(CloseIcon, { onClick: onClickRemove }) }))] }), _jsx(Toast.Description, { className: clsx(styles.messageStyle, {
                        [styles.darkColorStyle]: notification.theme !== 'light' &&
                            notification.theme !== 'default',
                    }), children: notification.message }), notification.progressingBar && (_jsx("div", { className: styles.progressBarStyle, children: _jsxs("svg", { width: "100%", height: "4", children: [_jsx("rect", { width: "100%", height: "4", fill: "var(--affine-hover-color)", rx: "2", ry: "2" }), _jsx("rect", { width: "0%", height: "4", fill: "var(--affine-primary-color)", rx: "2", ry: "2", children: _jsx("animate", { ref: animationRef, attributeName: "width", from: "0%", to: "100%", dur: (progressDuration - 200) / 1000, fill: "freeze", onAnimationEnd: resetAnimation }, animationKey) })] }) }))] }) }));
}
/**
 * @deprecated use `import { NotificationCenter } from '@affine/component'` instead
 */
export function NotificationCenter() {
    const notifications = useAtomValue(notificationsAtom);
    const [expand, setExpand] = useAtom(expandNotificationCenterAtom);
    if (notifications.length === 0 && expand) {
        setExpand(false);
    }
    const [heights, setHeights] = useState([]);
    const listRef = useRef(null);
    useEffect(() => {
        // Ensure expanded is always false when no toasts are present / only one left
        if (notifications.length <= 1) {
            setExpand(false);
        }
    }, [notifications, setExpand]);
    if (!notifications.length)
        return null;
    return (_jsxs(Toast.Provider, { swipeDirection: "right", children: [notifications.map((notification, index) => notification.key ? (_jsx(NotificationCard, { notification: notification, index: index, notifications: notifications, heights: heights, setHeights: setHeights }, notification.key)) : null), _jsx(Toast.Viewport, { tabIndex: -1, ref: listRef, style: {
                    '--front-toast-height': `${heights[0]?.height}px`,
                }, className: styles.notificationCenterViewportStyle })] }));
}
//# sourceMappingURL=index.js.map