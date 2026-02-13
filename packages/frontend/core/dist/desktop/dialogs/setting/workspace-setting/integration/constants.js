import { jsx as _jsx } from "react/jsx-runtime";
import { IntegrationTypeIcon } from '@affine/core/modules/integration';
import { Logo1Icon, TodayIcon } from '@blocksuite/icons/rc';
import { CalendarSettingPanel } from './calendar/setting-panel';
import MCPIcon from './mcp-server/MCP.inline.svg';
import { McpServerSettingPanel } from './mcp-server/setting-panel';
import { ReadwiseSettingPanel } from './readwise/setting-panel';
const INTEGRATION_LIST = [
    {
        id: 'readwise',
        name: 'com.affine.integration.readwise.name',
        desc: 'com.affine.integration.readwise.desc',
        icon: _jsx(IntegrationTypeIcon, { type: "readwise" }),
        setting: _jsx(ReadwiseSettingPanel, {}),
    },
    BUILD_CONFIG.isElectron && {
        id: 'calendar',
        name: 'com.affine.integration.calendar.name',
        desc: 'com.affine.integration.calendar.desc',
        icon: _jsx(TodayIcon, {}),
        setting: _jsx(CalendarSettingPanel, {}),
    },
    {
        id: 'mcp-server',
        name: 'com.affine.integration.mcp-server.name',
        desc: 'com.affine.integration.mcp-server.desc',
        icon: _jsx("img", { src: MCPIcon }),
        setting: _jsx(McpServerSettingPanel, {}),
        cloud: true,
    },
    {
        id: 'web-clipper',
        name: 'com.affine.integration.web-clipper.name',
        desc: 'com.affine.integration.web-clipper.desc',
        icon: _jsx(Logo1Icon, {}),
        link: 'https://chromewebstore.google.com/detail/affine-web-clipper/mpbbkmbdpleomiogkbkkpfoljjpahmoi',
    },
];
export function getAllowedIntegrationList(isCloudWorkspace) {
    return INTEGRATION_LIST.filter(item => {
        if (!item)
            return false;
        const requiredCloud = 'cloud' in item && item.cloud;
        if (requiredCloud && !isCloudWorkspace)
            return false;
        return true;
    });
}
//# sourceMappingURL=constants.js.map