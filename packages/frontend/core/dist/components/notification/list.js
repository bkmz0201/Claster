import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Button, IconButton, Menu, MenuItem, notify, observeIntersection, Scrollable, Skeleton, } from '@affine/component';
import { InvitationService } from '@affine/core/modules/cloud';
import { NotificationListService, NotificationType, } from '@affine/core/modules/notification';
import { WorkspacesService } from '@affine/core/modules/workspace';
import { extractEmojiIcon } from '@affine/core/utils';
import { UserFriendlyError } from '@affine/error';
import { i18nTime, Trans, useI18n } from '@affine/i18n';
import track from '@affine/track';
import { CollaborationIcon, DeleteIcon, EdgelessIcon, MoreHorizontalIcon, NotificationIcon, PageIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import { useNavigateHelper } from '../hooks/use-navigate-helper';
import * as styles from './list.style.css';
export const NotificationList = () => {
    const t = useI18n();
    const notificationListService = useService(NotificationListService);
    const notifications = useLiveData(notificationListService.notifications$);
    const isLoading = useLiveData(notificationListService.isLoading$);
    const error = useLiveData(notificationListService.error$);
    const hasMore = useLiveData(notificationListService.hasMore$);
    const loadMoreIndicatorRef = useRef(null);
    const userFriendlyError = useMemo(() => {
        return error && UserFriendlyError.fromAny(error);
    }, [error]);
    useLayoutEffect(() => {
        // reset the notification list when the component is mounted
        notificationListService.reset();
        notificationListService.loadMore();
    }, [notificationListService]);
    useEffect(() => {
        if (loadMoreIndicatorRef.current) {
            let previousIsIntersecting = false;
            return observeIntersection(loadMoreIndicatorRef.current, entity => {
                if (entity.isIntersecting && !previousIsIntersecting && hasMore) {
                    notificationListService.loadMore();
                }
                previousIsIntersecting = entity.isIntersecting;
            });
        }
        return;
    }, [hasMore, notificationListService]);
    const handleDeleteAll = useCallback(() => {
        notificationListService.readAllNotifications().catch(err => {
            notify.error(UserFriendlyError.fromAny(err));
        });
    }, [notificationListService]);
    return (_jsxs("div", { className: styles.container, "data-mobile": BUILD_CONFIG.isMobileEdition ? '' : undefined, children: [_jsxs("div", { className: styles.header, children: [_jsx("span", { children: t['com.affine.rootAppSidebar.notifications']() }), notifications.length > 0 && (_jsx(Menu, { items: _jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), onClick: handleDeleteAll, children: _jsx("span", { children: t['com.affine.notification.delete-all']() }) }), children: _jsx(IconButton, { icon: _jsx(MoreHorizontalIcon, {}) }) }))] }), _jsxs(Scrollable.Root, { className: styles.scrollRoot, children: [_jsxs(Scrollable.Viewport, { className: styles.scrollViewport, children: [notifications.length > 0 ? (_jsxs("ul", { className: styles.itemList, children: [notifications.map(notification => (_jsx("li", { children: _jsx(NotificationItem, { notification: notification }) }, notification.id))), userFriendlyError && (_jsx("div", { className: styles.error, children: userFriendlyError.message }))] })) : isLoading ? (_jsx(NotificationItemSkeleton, {})) : userFriendlyError ? (_jsx("div", { className: styles.error, children: userFriendlyError.message })) : (_jsx(NotificationListEmpty, {})), _jsx("div", { ref: loadMoreIndicatorRef, className: hasMore ? styles.loadMoreIndicator : '', children: hasMore ? t['com.affine.notification.loading-more']() : null })] }), _jsx(Scrollable.Scrollbar, {})] })] }));
};
const NotificationListEmpty = () => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.listEmpty, children: [_jsx("div", { className: styles.listEmptyIconContainer, children: _jsx(NotificationIcon, { width: 24, height: 24 }) }), _jsx("div", { className: styles.listEmptyTitle, children: t['com.affine.notification.empty']() }), _jsx("div", { className: styles.listEmptyDescription, children: t['com.affine.notification.empty.description']() })] }));
};
const NotificationItemSkeleton = () => {
    return Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: clsx(styles.itemContainer, styles.itemSkeletonContainer), "data-disabled": "true", children: [_jsx(Skeleton, { variant: "circular", width: 22, height: 22 }), _jsxs("div", { className: styles.itemMain, children: [_jsx(Skeleton, { variant: "text", width: 150 }), _jsx("div", { className: styles.itemDate, children: _jsx(Skeleton, { variant: "text", width: 100 }) })] })] }, i)));
};
const NotificationItem = ({ notification }) => {
    const t = useI18n();
    const type = notification.type;
    return type === NotificationType.Mention ? (_jsx(MentionNotificationItem, { notification: notification })) : type === NotificationType.Comment ? (_jsx(CommentNotificationItem, { notification: notification })) : type === NotificationType.CommentMention ? (_jsx(CommentMentionNotificationItem, { notification: notification })) : type === NotificationType.InvitationAccepted ? (_jsx(InvitationAcceptedNotificationItem, { notification: notification })) : type === NotificationType.Invitation ? (_jsx(InvitationNotificationItem, { notification: notification })) : type === NotificationType.InvitationBlocked ? (_jsx(InvitationBlockedNotificationItem, { notification: notification })) : type === NotificationType.InvitationReviewRequest ? (_jsx(InvitationReviewRequestNotificationItem, { notification: notification })) : type === NotificationType.InvitationReviewDeclined ? (_jsx(InvitationReviewDeclinedNotificationItem, { notification: notification })) : type === NotificationType.InvitationReviewApproved ? (_jsx(InvitationReviewApprovedNotificationItem, { notification: notification })) : (_jsxs("div", { className: styles.itemContainer, children: [_jsx(Avatar, { size: 22 }), _jsxs("div", { className: styles.itemNotSupported, children: [t['com.affine.notification.unsupported'](), " (", type, ")"] }), _jsx(DeleteButton, { notification: notification })] }));
};
const MentionNotificationItem = ({ notification, }) => {
    const notificationListService = useService(NotificationListService);
    const { jumpToPageBlock } = useNavigateHelper();
    const t = useI18n();
    const body = notification.body;
    const memberInactived = !body.createdByUser;
    const handleClick = useCallback(() => {
        track.$.sidebar.notifications.clickNotification({
            type: notification.type,
            item: 'read',
        });
        if (!body.workspace?.id) {
            return;
        }
        notificationListService.readNotification(notification.id).catch(err => {
            console.error(err);
        });
        jumpToPageBlock(body.workspace.id, body.doc.id, body.doc.mode, body.doc.blockId ? [body.doc.blockId] : undefined, body.doc.elementId ? [body.doc.elementId] : undefined);
    }, [body, jumpToPageBlock, notificationListService, notification]);
    return (_jsxs("div", { className: styles.itemContainer, onClick: handleClick, children: [_jsx(Avatar, { size: 22, name: body.createdByUser?.name, url: body.createdByUser?.avatarUrl }), _jsxs("div", { className: styles.itemMain, children: [_jsx("span", { children: _jsx(Trans, { i18nKey: 'com.affine.notification.mention', components: {
                                1: (_jsx("b", { className: styles.itemNameLabel, "data-inactived": memberInactived })),
                                2: _jsx(DocNameWithIcon, { mode: body.doc.mode }),
                            }, values: {
                                username: body.createdByUser?.name ?? t['com.affine.inactive-member'](),
                                docTitle: body.doc.title || t['Untitled'](),
                            } }) }), _jsx("div", { className: styles.itemDate, children: i18nTime(notification.createdAt, {
                            relative: true,
                        }) })] }), _jsx(DeleteButton, { notification: notification })] }));
};
const InvitationReviewRequestNotificationItem = ({ notification, }) => {
    const notificationListService = useService(NotificationListService);
    const { jumpToWorkspaceSettings } = useNavigateHelper();
    const t = useI18n();
    const body = notification.body;
    const memberInactived = !body.createdByUser;
    const workspaceInactived = !body.workspace;
    const handleClick = useCallback(() => {
        track.$.sidebar.notifications.clickNotification({
            type: notification.type,
            item: 'read',
        });
        notificationListService.readNotification(notification.id).catch(err => {
            console.error(err);
        });
        if (!body.workspace?.id) {
            return;
        }
        jumpToWorkspaceSettings(body.workspace.id, 'workspace:members');
    }, [body, jumpToWorkspaceSettings, notification, notificationListService]);
    return (_jsxs("div", { className: styles.itemContainer, onClick: handleClick, children: [_jsx(Avatar, { size: 22, name: body.createdByUser?.name, url: body.createdByUser?.avatarUrl }), _jsxs("div", { className: styles.itemMain, children: [_jsx("span", { children: _jsx(Trans, { i18nKey: 'com.affine.notification.invitation-review-request', components: {
                                1: (_jsx("b", { className: styles.itemNameLabel, "data-inactived": memberInactived })),
                                2: _jsx(WorkspaceNameWithIcon, { "data-inactived": workspaceInactived }),
                            }, values: {
                                username: body.createdByUser?.name ?? t['com.affine.inactive-member'](),
                                workspaceName: body.workspace?.name ?? t['com.affine.inactive-workspace'](),
                            } }) }), _jsx("div", { className: styles.itemDate, children: i18nTime(notification.createdAt, {
                            relative: true,
                        }) })] }), _jsx(DeleteButton, { notification: notification })] }));
};
const InvitationReviewDeclinedNotificationItem = ({ notification, }) => {
    const t = useI18n();
    const body = notification.body;
    const memberInactived = !body.createdByUser;
    const workspaceInactived = !body.workspace;
    return (_jsxs("div", { className: styles.itemContainer, children: [_jsx(Avatar, { size: 22, name: body.createdByUser?.name, url: body.createdByUser?.avatarUrl }), _jsxs("div", { className: styles.itemMain, children: [_jsx("span", { children: _jsx(Trans, { i18nKey: 'com.affine.notification.invitation-review-declined', components: {
                                1: (_jsx("b", { className: styles.itemNameLabel, "data-inactived": memberInactived })),
                                2: _jsx(WorkspaceNameWithIcon, { "data-inactived": workspaceInactived }),
                            }, values: {
                                username: body.createdByUser?.name ?? t['com.affine.inactive-member'](),
                                workspaceName: body.workspace?.name ?? t['com.affine.inactive-workspace'](),
                            } }) }), _jsx("div", { className: styles.itemDate, children: i18nTime(notification.createdAt, {
                            relative: true,
                        }) })] }), _jsx(DeleteButton, { notification: notification })] }));
};
const InvitationReviewApprovedNotificationItem = ({ notification, }) => {
    const notificationListService = useService(NotificationListService);
    const { jumpToPage } = useNavigateHelper();
    const t = useI18n();
    const body = notification.body;
    const memberInactived = !body.createdByUser;
    const workspaceInactived = !body.workspace;
    const handleClick = useCallback(() => {
        track.$.sidebar.notifications.clickNotification({
            type: notification.type,
            item: 'button',
            button: 'open',
        });
        notificationListService.readNotification(notification.id).catch(err => {
            console.error(err);
        });
        if (!body.workspace?.id) {
            return;
        }
        jumpToPage(body.workspace.id, 'all');
    }, [body, jumpToPage, notification, notificationListService]);
    return (_jsxs("div", { className: styles.itemContainer, children: [_jsx(Avatar, { size: 22, name: body.createdByUser?.name, url: body.createdByUser?.avatarUrl }), _jsxs("div", { className: styles.itemMain, children: [_jsx("span", { children: _jsx(Trans, { i18nKey: 'com.affine.notification.invitation-review-approved', components: {
                                1: (_jsx("b", { className: styles.itemNameLabel, "data-inactived": memberInactived })),
                                2: _jsx(WorkspaceNameWithIcon, { "data-inactived": workspaceInactived }),
                            }, values: {
                                username: body.createdByUser?.name ?? t['com.affine.inactive-member'](),
                                workspaceName: body.workspace?.name ?? t['com.affine.inactive-workspace'](),
                            } }) }), !workspaceInactived && (_jsx(Button, { variant: "secondary", className: styles.itemActionButton, onClick: handleClick, children: t['com.affine.notification.invitation-review-approved.open-workspace']() })), _jsx("div", { className: styles.itemDate, children: i18nTime(notification.createdAt, {
                            relative: true,
                        }) })] }), _jsx(DeleteButton, { notification: notification })] }));
};
const InvitationAcceptedNotificationItem = ({ notification, }) => {
    const notificationListService = useService(NotificationListService);
    const { jumpToWorkspaceSettings } = useNavigateHelper();
    const t = useI18n();
    const body = notification.body;
    const memberInactived = !body.createdByUser;
    const handleClick = useCallback(() => {
        track.$.sidebar.notifications.clickNotification({
            type: notification.type,
            item: 'read',
        });
        notificationListService.readNotification(notification.id).catch(err => {
            console.error(err);
        });
        if (!body.workspace?.id) {
            return;
        }
        jumpToWorkspaceSettings(body.workspace.id, 'workspace:members');
    }, [body, jumpToWorkspaceSettings, notification, notificationListService]);
    return (_jsxs("div", { className: styles.itemContainer, onClick: handleClick, children: [_jsx(Avatar, { size: 22, name: body.createdByUser?.name, url: body.createdByUser?.avatarUrl }), _jsxs("div", { className: styles.itemMain, children: [_jsx("span", { children: _jsx(Trans, { i18nKey: 'com.affine.notification.invitation-accepted', components: {
                                1: _jsx(WorkspaceNameWithIcon, { "data-inactived": memberInactived }),
                            }, values: {
                                username: body.createdByUser?.name ?? t['com.affine.inactive-member'](),
                            } }) }), _jsx("div", { className: styles.itemDate, children: i18nTime(notification.createdAt, {
                            relative: true,
                        }) })] }), _jsx(DeleteButton, { notification: notification })] }));
};
const InvitationBlockedNotificationItem = ({ notification, }) => {
    const notificationListService = useService(NotificationListService);
    const { jumpToWorkspaceSettings } = useNavigateHelper();
    const t = useI18n();
    const body = notification.body;
    const workspaceInactived = !body.workspace;
    const handleClick = useCallback(() => {
        track.$.sidebar.notifications.clickNotification({
            type: notification.type,
            item: 'read',
        });
        notificationListService.readNotification(notification.id).catch(err => {
            console.error(err);
        });
        if (!body.workspace?.id) {
            return;
        }
        jumpToWorkspaceSettings(body.workspace.id, 'workspace:members');
    }, [body, jumpToWorkspaceSettings, notification, notificationListService]);
    return (_jsxs("div", { className: styles.itemContainer, onClick: handleClick, children: [_jsx(CollaborationIcon, { width: 22, height: 22 }), _jsxs("div", { className: styles.itemMain, children: [_jsx("span", { children: _jsx(Trans, { i18nKey: 'com.affine.notification.invitation-blocked', components: {
                                1: (_jsx("b", { className: styles.itemNameLabel, "data-inactived": workspaceInactived })),
                            }, values: {
                                workspaceName: body.workspace?.name ?? t['com.affine.inactive-workspace'](),
                            } }) }), _jsx("div", { className: styles.itemDate, children: i18nTime(notification.createdAt, {
                            relative: true,
                        }) })] }), _jsx(DeleteButton, { notification: notification })] }));
};
const InvitationNotificationItem = ({ notification, }) => {
    const t = useI18n();
    const body = notification.body;
    const memberInactived = !body.createdByUser;
    const workspaceInactived = !body.workspace;
    const workspacesService = useService(WorkspacesService);
    const invitationService = useService(InvitationService);
    const notificationListService = useService(NotificationListService);
    const inviteId = body.inviteId;
    const [isAccepting, setIsAccepting] = useState(false);
    const { jumpToPage } = useNavigateHelper();
    const handleReadAndOpenWorkspace = useCallback(() => {
        notificationListService.readNotification(notification.id).catch(err => {
            console.error(err);
        });
        if (!body.workspace?.id) {
            return; // should never happen
        }
        jumpToPage(body.workspace.id, 'all');
    }, [body, jumpToPage, notification.id, notificationListService]);
    const handleAcceptInvite = useCallback(() => {
        track.$.sidebar.notifications.clickNotification({
            type: notification.type,
            item: 'button',
            button: 'accept',
        });
        setIsAccepting(true);
        invitationService
            .acceptInvite(inviteId)
            .catch(err => {
            const userFriendlyError = UserFriendlyError.fromAny(err);
            if (userFriendlyError.is('ALREADY_IN_SPACE')) {
                // ignore if the user is already in the workspace
                return true;
            }
            notify.error(userFriendlyError);
            throw err;
        })
            .then(async (value) => {
            if (value === false) {
                // invite is expired
                notify.error({
                    title: t['com.affine.expired.page.title'](),
                    message: t['com.affine.expired.page.new-subtitle'](),
                });
                notificationListService
                    .readNotification(notification.id)
                    .catch(err => {
                    console.error(err);
                });
                return;
            }
            else {
                // invite is accepted
                await workspacesService.list.waitForRevalidation();
                handleReadAndOpenWorkspace();
            }
        })
            .catch(err => {
            const userFriendlyError = UserFriendlyError.fromAny(err);
            notify.error(userFriendlyError);
        })
            .finally(() => {
            setIsAccepting(false);
        });
    }, [
        invitationService,
        handleReadAndOpenWorkspace,
        inviteId,
        notification,
        notificationListService,
        t,
        workspacesService,
    ]);
    return (_jsxs("div", { className: styles.itemContainer, children: [_jsx(Avatar, { size: 22, name: body.createdByUser?.name, url: body.createdByUser?.avatarUrl }), _jsxs("div", { className: styles.itemMain, children: [_jsx("span", { children: _jsx(Trans, { i18nKey: 'com.affine.notification.invitation', components: {
                                1: (_jsx("b", { className: styles.itemNameLabel, "data-inactived": memberInactived })),
                                2: _jsx(WorkspaceNameWithIcon, { "data-inactived": workspaceInactived }),
                            }, values: {
                                username: body.createdByUser?.name ?? t['com.affine.inactive-member'](),
                                workspaceName: body.workspace?.name ?? t['com.affine.inactive-workspace'](),
                            } }) }), !workspaceInactived && (_jsx(Button, { variant: "secondary", className: styles.itemActionButton, onClick: handleAcceptInvite, loading: isAccepting, children: t['com.affine.notification.invitation.accept']() })), _jsx("div", { className: styles.itemDate, children: i18nTime(notification.createdAt, {
                            relative: true,
                        }) })] }), _jsx(DeleteButton, { notification: notification })] }));
};
const DeleteButton = ({ notification, onClick, }) => {
    const notificationListService = useService(NotificationListService);
    const handleDelete = useCallback((e) => {
        e.stopPropagation(); // prevent trigger the click event of the parent element
        track.$.sidebar.notifications.clickNotification({
            type: notification.type,
            item: 'dismiss',
        });
        notificationListService.readNotification(notification.id).catch(err => {
            console.error(err);
        });
        onClick?.();
    }, [notificationListService, notification, onClick]);
    return (_jsx(IconButton, { size: 16, className: styles.itemDeleteButton, icon: _jsx(DeleteIcon, {}), onClick: handleDelete }));
};
const WorkspaceNameWithIcon = ({ children, ...props }) => {
    return (_jsxs("b", { className: styles.itemNameLabel, ...props, children: [_jsx(CollaborationIcon, { className: styles.itemNameLabelIcon, width: 20, height: 20 }), children] }));
};
const DocNameWithIcon = ({ children, mode, ...props }) => {
    const { emoji, rest: titleWithoutEmoji } = useMemo(() => {
        if (typeof children === 'string') {
            return extractEmojiIcon(children);
        }
        if (children instanceof Array &&
            children.length === 1 &&
            typeof children[0] === 'string') {
            return extractEmojiIcon(children[0]);
        }
        return { rest: children, emoji: null };
    }, [children]);
    return (_jsxs("b", { className: styles.itemNameLabel, ...props, children: [emoji ? (_jsx("span", { className: styles.itemNameLabelIcon, children: emoji })) : mode === 'page' ? (_jsx(PageIcon, { className: styles.itemNameLabelIcon, width: 20, height: 20 })) : (_jsx(EdgelessIcon, { className: styles.itemNameLabelIcon, width: 20, height: 20 })), titleWithoutEmoji] }));
};
const CommentNotificationItem = ({ notification, }) => {
    const notificationListService = useService(NotificationListService);
    const { jumpToPageComment } = useNavigateHelper();
    const t = useI18n();
    const body = notification.body;
    const memberInactived = !body.createdByUser;
    const handleClick = useCallback(() => {
        track.$.sidebar.notifications.clickNotification({
            type: notification.type,
            item: 'read',
        });
        if (!body.workspaceId || !body.doc?.id) {
            return;
        }
        notificationListService.readNotification(notification.id).catch(err => {
            console.error(err);
        });
        jumpToPageComment(body.workspaceId, body.doc.id, body.commentId, body.doc.mode);
    }, [body, jumpToPageComment, notificationListService, notification]);
    return (_jsxs("div", { className: styles.itemContainer, onClick: handleClick, children: [_jsx(Avatar, { size: 22, name: body.createdByUser?.name, url: body.createdByUser?.avatarUrl }), _jsxs("div", { className: styles.itemMain, children: [_jsx("span", { children: _jsx(Trans, { i18nKey: 'com.affine.notification.comment', components: {
                                1: (_jsx("b", { className: styles.itemNameLabel, "data-inactived": memberInactived })),
                                2: _jsx(DocNameWithIcon, { mode: body.doc?.mode || 'page' }),
                            }, values: {
                                username: body.createdByUser?.name ?? t['com.affine.inactive-member'](),
                                docTitle: body.doc?.title || t['Untitled'](),
                            } }) }), _jsx("div", { className: styles.itemDate, children: i18nTime(notification.createdAt, {
                            relative: true,
                        }) })] }), _jsx(DeleteButton, { notification: notification })] }));
};
const CommentMentionNotificationItem = ({ notification, }) => {
    const notificationListService = useService(NotificationListService);
    const { jumpToPageComment } = useNavigateHelper();
    const t = useI18n();
    const body = notification.body;
    const memberInactived = !body.createdByUser;
    const handleClick = useCallback(() => {
        track.$.sidebar.notifications.clickNotification({
            type: notification.type,
            item: 'read',
        });
        if (!body.workspaceId || !body.doc?.id) {
            return;
        }
        notificationListService.readNotification(notification.id).catch(err => {
            console.error(err);
        });
        jumpToPageComment(body.workspaceId, body.doc.id, body.commentId, body.doc.mode);
    }, [body, jumpToPageComment, notificationListService, notification]);
    return (_jsxs("div", { className: styles.itemContainer, onClick: handleClick, children: [_jsx(Avatar, { size: 22, name: body.createdByUser?.name, url: body.createdByUser?.avatarUrl }), _jsxs("div", { className: styles.itemMain, children: [_jsx("span", { children: _jsx(Trans, { i18nKey: 'com.affine.notification.comment-mention', components: {
                                1: (_jsx("b", { className: styles.itemNameLabel, "data-inactived": memberInactived })),
                                2: _jsx(DocNameWithIcon, { mode: body.doc?.mode || 'page' }),
                            }, values: {
                                username: body.createdByUser?.name ?? t['com.affine.inactive-member'](),
                                docTitle: body.doc?.title || t['Untitled'](),
                            } }) }), _jsx("div", { className: styles.itemDate, children: i18nTime(notification.createdAt, {
                            relative: true,
                        }) })] }), _jsx(DeleteButton, { notification: notification })] }));
};
//# sourceMappingURL=list.js.map