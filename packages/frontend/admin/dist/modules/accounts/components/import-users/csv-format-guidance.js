import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WarningIcon } from '@blocksuite/icons/rc';
import { cssVar } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
/**
 * Component that displays CSV format guidelines
 */
export const CsvFormatGuidance = ({ passwordLimits, }) => {
    return (_jsxs("div", { className: "flex p-1.5 gap-1 rounded-[6px]", style: {
            fontSize: cssVar('fontXs'),
            color: cssVarV2('text/secondary'),
            backgroundColor: cssVarV2('layer/background/secondary'),
        }, children: [_jsx("div", { className: "flex justify-center py-0.5", children: _jsx(WarningIcon, { fontSize: 16, color: cssVarV2('icon/primary') }) }), _jsxs("div", { children: [_jsx("p", { children: "CSV file includes username, email, and password." }), _jsx("ul", { children: [
                            `Username (optional): any text.`,
                            `Email (required): e.g., user@example.com.`,
                            `Password (optional): ${passwordLimits.minLength}–${passwordLimits.maxLength} characters.`,
                        ].map((text, index) => (_jsxs("li", { className: "relative pl-2 leading-normal", children: [_jsx("span", { className: "absolute left-0 top-2 w-1 h-1 rounded-full bg-current" }), text] }, `guidance-${index}`))) })] })] }));
};
//# sourceMappingURL=csv-format-guidance.js.map