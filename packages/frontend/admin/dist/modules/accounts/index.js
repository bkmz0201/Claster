import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Header } from '../header';
import { useColumns } from './components/columns';
import { DataTable } from './components/data-table';
import { useUserList } from './use-user-list';
export function AccountPage() {
    const { users, pagination, setPagination, usersCount } = useUserList();
    // Remember the user temporarily, because userList is paginated on the server side,can't get all users at once.
    const [memoUsers, setMemoUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState(new Set());
    const columns = useColumns({ setSelectedUserIds });
    useEffect(() => {
        setMemoUsers(prev => [...new Set([...prev, ...users])]);
    }, [users]);
    const selectedUsers = useMemo(() => {
        return memoUsers.filter(user => selectedUserIds.has(user.id));
    }, [selectedUserIds, memoUsers]);
    return (_jsxs("div", { className: " h-screen flex-1 flex-col flex", children: [_jsx(Header, { title: "Accounts" }), _jsx(DataTable, { data: users, columns: columns, pagination: pagination, usersCount: usersCount, onPaginationChange: setPagination, selectedUsers: selectedUsers, setMemoUsers: setMemoUsers })] }));
}
export { AccountPage as Component };
//# sourceMappingURL=index.js.map