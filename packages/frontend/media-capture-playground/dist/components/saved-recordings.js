import { jsx as _jsx } from "react/jsx-runtime";
import useSWRSubscription from 'swr/subscription';
import { socket } from '../utils';
import { SavedRecordingItem } from './saved-recording-item';
export function SavedRecordings() {
    const { data: recordings = [] } = useSWRSubscription('saved-recordings', (_key, { next }) => {
        // Subscribe to saved recordings updates
        socket.on('apps:saved', (data) => {
            next(null, data.recordings);
        });
        fetch('/api/apps/saved')
            .then(res => res.json())
            .then(data => next(null, data.recordings))
            .catch(err => next(err));
        return () => {
            socket.off('apps:saved');
        };
    });
    if (recordings.length === 0) {
        return _jsx("p", { className: "text-gray-500 italic text-sm", children: "No saved recordings" });
    }
    return (_jsx("div", { className: "space-y-1", children: recordings.map(recording => (_jsx(SavedRecordingItem, { recording: recording }, recording.wav))) }));
}
//# sourceMappingURL=saved-recordings.js.map