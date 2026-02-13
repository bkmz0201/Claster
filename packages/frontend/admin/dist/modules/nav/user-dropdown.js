import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from '@affine/admin/components/ui/avatar';
import { Button } from '@affine/admin/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@affine/admin/components/ui/dropdown-menu';
import { MoreVerticalIcon } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { CircleUser } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { affineFetch } from '../../fetch-utils';
import { useCurrentUser, useRevalidateCurrentUser } from '../common';
const UserInfo = ({ name, email, avatarUrl, }) => {
    return (_jsxs(_Fragment, { children: [_jsxs(Avatar, { className: "w-8 h-8", children: [_jsx(AvatarImage, { src: avatarUrl ?? undefined }), _jsx(AvatarFallback, { children: _jsx(CircleUser, { size: 32 }) })] }), _jsxs("div", { className: "flex flex-col font-medium gap-1", children: [name ?? email.split('@')[0], _jsx("span", { className: "w-fit rounded px-2 py-0.5 text-xs h-5 border text-center inline-flex items-center font-normal", style: {
                            borderRadius: '4px',
                            backgroundColor: cssVarV2('chip/label/blue'),
                            borderColor: cssVarV2('layer/insideBorder/border'),
                        }, children: "Admin" })] })] }));
};
export function UserDropdown({ isCollapsed }) {
    const currentUser = useCurrentUser();
    const relative = useRevalidateCurrentUser();
    const handleLogout = useCallback(() => {
        affineFetch('/api/auth/sign-out')
            .then(() => {
            toast.success('Logged out successfully');
            return relative();
        })
            .catch(err => {
            toast.error(`Failed to logout: ${err.message}`);
        });
    }, [relative]);
    if (isCollapsed) {
        return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "w-10 h-10", size: "icon", children: _jsxs(Avatar, { className: "w-5 h-5", children: [_jsx(AvatarImage, { src: currentUser?.avatarUrl ?? undefined }), _jsx(AvatarFallback, { children: _jsx(CircleUser, { size: 24 }) })] }) }) }), _jsxs(DropdownMenuContent, { align: "end", side: "right", children: [_jsx(DropdownMenuLabel, { className: "flex items-center gap-2", children: currentUser ? (_jsx(UserInfo, { email: currentUser.email, name: currentUser.name, avatarUrl: currentUser.avatarUrl })) : null }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onSelect: handleLogout, children: "Logout" })] })] }));
    }
    return (_jsxs("div", { className: `flex flex-none items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-1 py-3 flex-nowrap`, children: [_jsxs("div", { className: "flex items-center gap-2 font-medium text-ellipsis break-words overflow-hidden", children: [_jsxs(Avatar, { className: "w-5 h-5", children: [_jsx(AvatarImage, { src: currentUser?.avatarUrl ?? undefined }), _jsx(AvatarFallback, { children: _jsx(CircleUser, { size: 24 }) })] }), currentUser?.name ? (_jsx("span", { className: "text-sm text-nowrap text-ellipsis break-words overflow-hidden", title: currentUser?.name, children: currentUser?.name })) : (
                    // Fallback to email prefix if name is not available
                    _jsx("span", { className: "text-sm", title: currentUser?.email.split('@')[0], children: currentUser?.email.split('@')[0] })), _jsx("span", { className: "ml-2 rounded px-2 py-0.5 text-xs h-5 border text-center inline-flex items-center font-normal", style: {
                            borderRadius: '4px',
                            backgroundColor: cssVarV2('chip/label/blue'),
                            borderColor: cssVarV2('layer/insideBorder/border'),
                        }, children: "Admin" })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "ml-2 p-1 h-6", children: _jsx(MoreVerticalIcon, { fontSize: 20 }) }) }), _jsxs(DropdownMenuContent, { align: "end", side: "right", children: [_jsx(DropdownMenuLabel, { className: "flex items-center gap-2", children: currentUser ? (_jsx(UserInfo, { email: currentUser.email, name: currentUser.name, avatarUrl: currentUser.avatarUrl })) : null }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onSelect: handleLogout, children: "Logout" })] })] })] }));
}
//# sourceMappingURL=user-dropdown.js.map