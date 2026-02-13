import type { I18nString } from '@affine/i18n';
import type { ReactNode } from 'react';
type IntegrationCard = {
    id: string;
    name: I18nString;
    desc: I18nString;
    icon: ReactNode;
    cloud?: boolean;
} & ({
    setting: ReactNode;
} | {
    link: string;
});
declare const INTEGRATION_LIST: (false | {
    id: "readwise";
    name: string;
    desc: string;
    icon: import("react/jsx-runtime").JSX.Element;
    setting: import("react/jsx-runtime").JSX.Element;
    cloud?: undefined;
    link?: undefined;
} | {
    id: "calendar";
    name: string;
    desc: string;
    icon: import("react/jsx-runtime").JSX.Element;
    setting: import("react/jsx-runtime").JSX.Element;
    cloud?: undefined;
    link?: undefined;
} | {
    id: "mcp-server";
    name: string;
    desc: string;
    icon: import("react/jsx-runtime").JSX.Element;
    setting: import("react/jsx-runtime").JSX.Element;
    cloud: true;
    link?: undefined;
} | {
    id: "web-clipper";
    name: string;
    desc: string;
    icon: import("react/jsx-runtime").JSX.Element;
    link: string;
    setting?: undefined;
    cloud?: undefined;
})[];
type IntegrationId = Exclude<Extract<(typeof INTEGRATION_LIST)[number], {}>, false>['id'];
export type IntegrationItem = Exclude<IntegrationCard, 'id'> & {
    id: IntegrationId;
};
export declare function getAllowedIntegrationList(isCloudWorkspace: boolean): IntegrationItem[];
export {};
//# sourceMappingURL=constants.d.ts.map