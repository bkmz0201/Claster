import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { buttonVariants } from '@affine/admin/components/ui/button';
import { Separator } from '@affine/admin/components/ui/separator';
import { cn } from '@affine/admin/utils';
import { AlbumIcon, ChevronRightIcon, GithubIcon, MailWarningIcon, UploadCloudIcon, } from 'lucide-react';
const appNames = {
    stable: 'AFFiNE',
    canary: 'AFFiNE Canary',
    beta: 'AFFiNE Beta',
    internal: 'AFFiNE Internal',
};
const appName = appNames[BUILD_CONFIG.appBuildType];
const links = [
    {
        href: BUILD_CONFIG.githubUrl,
        icon: _jsx(GithubIcon, { size: 20 }),
        label: 'Star AFFiNE on GitHub',
    },
    {
        href: BUILD_CONFIG.githubUrl,
        icon: _jsx(MailWarningIcon, { size: 20 }),
        label: 'Report an Issue',
    },
    {
        href: 'https://docs.affine.pro/docs/self-host-affine',
        icon: _jsx(AlbumIcon, { size: 20 }),
        label: 'Self-host Document',
    },
    {
        href: 'https://affine.pro/pricing/?type=selfhost#table',
        icon: _jsx(UploadCloudIcon, { size: 20 }),
        label: 'Upgrade to Team',
    },
];
export function AboutAFFiNE() {
    return (_jsxs("div", { className: "flex flex-col h-full gap-3 py-5 px-6 w-full", children: [_jsx("div", { className: "flex items-center", children: _jsx("span", { className: "text-xl font-semibold", children: "About AFFiNE" }) }), _jsx("div", { className: "overflow-y-auto space-y-[10px]", children: _jsx("div", { className: "flex flex-col rounded-md border", children: links.map(({ href, icon, label }, index) => (_jsxs("div", { children: [_jsxs("a", { className: cn(buttonVariants({ variant: 'ghost' }), 'justify-between cursor-pointer w-full'), href: href, target: "_blank", rel: "noreferrer", children: [_jsxs("div", { className: "flex items-center gap-3", children: [icon, _jsx("span", { children: label })] }), _jsx("div", { children: _jsx(ChevronRightIcon, { size: 20 }) })] }), index < links.length - 1 && _jsx(Separator, {})] }, label + index))) }) }), _jsxs("div", { className: "space-y-3 text-sm font-normal text-gray-500", children: [_jsx("div", { children: `App Version: ${appName} ${BUILD_CONFIG.appVersion}` }), _jsx("div", { children: `Editor Version: ${BUILD_CONFIG.editorVersion}` })] })] }));
}
//# sourceMappingURL=about.js.map