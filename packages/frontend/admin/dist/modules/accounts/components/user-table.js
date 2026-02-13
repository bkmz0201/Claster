import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ImportStatus } from '../utils/csv-utils';
/**
 * Displays a table of users with their import status
 */
export const UserTable = ({ users }) => {
    return (_jsx("div", { className: "max-h-[300px] overflow-y-auto border rounded-md", children: _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { className: "bg-white sticky top-0", children: _jsxs("tr", { children: [_jsx("th", { className: "py-2 px-4 border-b text-left text-xs font-medium text-gray-500 tracking-wider ", children: "Name" }), _jsx("th", { className: "py-2 px-4 border-b text-left text-xs font-medium text-gray-500 tracking-wider", children: "Email" }), _jsx("th", { className: "py-2 px-4 border-b text-left text-xs font-medium text-gray-500 tracking-wider", children: "Password" }), _jsx("th", { className: "py-2 px-4 border-b text-left text-xs font-medium text-gray-500 tracking-wider", children: "Status" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-200", children: users.map((user, index) => (_jsxs("tr", { className: `${user.valid === false ? 'bg-red-50' : ''}
                ${user.importStatus === ImportStatus.Failed ? 'bg-red-50' : ''}
                ${user.importStatus === ImportStatus.Success ? 'bg-green-50' : ''}
                ${user.importStatus === ImportStatus.Processing ? 'bg-yellow-50' : ''}`, children: [_jsx("td", { className: "py-2 px-4 text-sm text-gray-900 truncate max-w-[150px]", children: user.name || '-' }), _jsx("td", { className: `py-2 px-4 text-sm truncate max-w-[200px] ${user.valid === false &&
                                    (user.error?.toLowerCase().includes('email') ||
                                        !user.error?.toLowerCase().includes('password'))
                                    ? 'text-red-500'
                                    : 'text-gray-900'}`, children: user.email }), _jsx("td", { className: `py-2 px-4 text-sm truncate max-w-[150px] ${user.valid === false &&
                                    user.error?.toLowerCase().includes('password')
                                    ? 'text-red-500'
                                    : 'text-gray-900'}`, children: user.password || '-' }), _jsx("td", { className: "py-2 px-4 text-sm", children: user.importStatus === ImportStatus.Success ? (_jsxs("span", { className: "text-gray-900", children: [_jsx("span", { className: "h-2 w-2 bg-gray-900 rounded-full inline-block mr-2" }), "Success"] })) : user.importStatus === ImportStatus.Failed ? (_jsxs("span", { className: "text-red-500", title: user.importError, children: [_jsx("span", { className: "h-2 w-2 bg-red-500 rounded-full inline-block mr-2" }), "Failed (", user.importError, ")"] })) : user.importStatus === ImportStatus.Processing ? (_jsxs("span", { className: "text-yellow-500", children: [_jsx("span", { className: "h-2 w-2 bg-yellow-500 rounded-full inline-block mr-2" }), "Processing..."] })) : user.valid === false ? (_jsxs("span", { className: "text-red-500", title: user.error, children: [_jsx("span", { className: "h-2 w-2 bg-red-500 rounded-full inline-block mr-2" }), "Invalid (", user.error, ")"] })) : (_jsxs("span", { className: "text-gray-900", children: [_jsx("span", { className: "h-2 w-2 bg-gray-900 rounded-full inline-block mr-2" }), "Valid"] })) })] }, `${user.email}-${index}`))) })] }) }));
};
//# sourceMappingURL=user-table.js.map