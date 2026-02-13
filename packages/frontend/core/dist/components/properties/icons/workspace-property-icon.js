import { jsx as _jsx } from "react/jsx-runtime";
import * as icons from '@blocksuite/icons/rc';
import { isSupportedWorkspacePropertyType, WorkspacePropertyTypes, } from '../../workspace-property-types';
import { WorkspacePropertyIconNames, } from './constant';
export const iconNameToComponent = (name) => {
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const IconComponent = icons[`${capitalize(name)}Icon`];
    if (!IconComponent) {
        throw new Error(`Icon ${name} not found`);
    }
    return IconComponent;
};
export const WorkspacePropertyIcon = ({ propertyInfo, ...props }) => {
    const Icon = propertyInfo.icon &&
        WorkspacePropertyIconNames.includes(propertyInfo.icon)
        ? iconNameToComponent(propertyInfo.icon)
        : isSupportedWorkspacePropertyType(propertyInfo.type)
            ? WorkspacePropertyTypes[propertyInfo.type].icon
            : WorkspacePropertyTypes.text.icon;
    return _jsx(Icon, { ...props });
};
//# sourceMappingURL=workspace-property-icon.js.map