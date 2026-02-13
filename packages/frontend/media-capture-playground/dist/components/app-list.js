import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import useSWRSubscription from 'swr/subscription';
import { socket } from '../utils';
import { AppItem } from './app-item';
export function AppList() {
    const { data: apps = [] } = useSWRSubscription('apps', (_key, { next }) => {
        let apps = [];
        // Initial apps fetch
        fetch('/api/apps')
            .then(res => res.json())
            .then(data => {
            apps = data.apps;
            next(null, apps);
        })
            .catch(err => next(err));
        // Subscribe to app updates
        socket.on('apps:all', data => {
            next(null, data.apps);
            apps = data.apps;
        });
        socket.on('apps:state-changed', data => {
            const index = apps.findIndex(a => a.processId === data.processId);
            console.log('apps:state-changed', data, index);
            if (index !== -1) {
                next(null, apps.toSpliced(index, 1, {
                    ...apps[index],
                    isRunning: data.isRunning,
                }));
            }
        });
        socket.on('connect', () => {
            // Refetch on reconnect
            fetch('/api/apps')
                .then(res => res.json())
                .then(data => next(null, data.apps))
                .catch(err => next(err));
        });
        return () => {
            socket.off('apps:all');
            socket.off('apps:state-changed');
            socket.off('connect');
        };
    });
    const { data: recordings = [] } = useSWRSubscription('recordings', (_key, { next }) => {
        // Subscribe to recording updates
        socket.on('apps:recording', (data) => {
            next(null, data.recordings);
        });
        return () => {
            socket.off('apps:recording');
        };
    });
    const appGroups = React.useMemo(() => {
        const mapping = apps.reduce((acc, app) => {
            if (!acc[app.processGroupId]) {
                acc[app.processGroupId] = {
                    processGroupId: app.processGroupId,
                    apps: [],
                    rootApp: apps.find((a) => a.processId === app.processGroupId) || app,
                };
            }
            acc[app.processGroupId].apps.push(app);
            return acc;
        }, {});
        return Object.values(mapping);
    }, [apps]);
    const runningApps = (appGroups || []).filter(app => app.apps.some(a => a.isRunning));
    const notRunningApps = (appGroups || []).filter(app => !app.apps.some(a => a.isRunning));
    return (_jsxs("div", { className: "h-full flex flex-col divide-y divide-gray-100", children: [_jsxs("div", { className: "p-4 relative", children: [_jsxs("div", { className: "flex items-center justify-between sticky top-0 bg-white z-10 mb-2", children: [_jsx("h2", { className: "text-sm font-semibold text-gray-900", children: "Active Applications" }), _jsxs("span", { className: "text-xs px-2 py-1 bg-blue-50 rounded-full text-blue-600 font-medium", children: [runningApps.length, " listening"] })] }), _jsxs("div", { className: "space-y-2", children: [runningApps.map(app => (_jsx(AppItem, { app: app, recordings: recordings }, app.processGroupId))), runningApps.length === 0 && (_jsx("div", { className: "text-sm text-gray-500 italic bg-gray-50 rounded-xl p-4 text-center", children: "No applications are currently listening" }))] })] }), _jsxs("div", { className: "p-4 flex-1 relative", children: [_jsxs("div", { className: "flex items-center justify-between sticky top-0 bg-white z-10 mb-2", children: [_jsx("h2", { className: "text-sm font-semibold text-gray-900", children: "Other Applications" }), _jsxs("span", { className: "text-xs px-2 py-1 bg-gray-50 rounded-full text-gray-600 font-medium", children: [notRunningApps.length, " available"] })] }), _jsxs("div", { className: "space-y-2", children: [notRunningApps.map(app => (_jsx(AppItem, { app: app, recordings: recordings }, app.processGroupId))), notRunningApps.length === 0 && (_jsx("div", { className: "text-sm text-gray-500 italic bg-gray-50 rounded-xl p-4 text-center", children: "No other applications found" }))] })] })] }));
}
//# sourceMappingURL=app-list.js.map