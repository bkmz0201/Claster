import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloudWorkspaceIcon } from '@blocksuite/icons/rc';
import { ServerSelector } from '../../server-selector';
import * as styles from './enable-cloud.css';
export const CustomServerEnableCloud = ({ serverList, selectedServer, setSelectedServer, title, description, }) => {
    return (_jsxs("div", { className: styles.root, children: [_jsx(CloudWorkspaceIcon, { width: '36px', height: '36px' }), _jsxs("div", { className: styles.textContainer, children: [title ? _jsx("div", { className: styles.title, children: title }) : null, description ? (_jsx("div", { className: styles.description, children: description })) : null] }), _jsx("div", { className: styles.serverSelector, children: _jsx(ServerSelector, { servers: serverList, selectedSeverName: `${selectedServer.config$.value.serverName} (${selectedServer.baseUrl})`, onSelect: setSelectedServer }) })] }));
};
//# sourceMappingURL=enable-cloud.js.map