import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableBodyRow, TableCell, TableHead, TableHeadRow, } from './index';
export default {
    title: 'UI/Table',
    component: Table,
};
const Template = args => (_jsxs(Table, { ...args, children: [_jsx(TableHead, { children: _jsxs(TableHeadRow, { children: [_jsx(TableCell, { children: "Title 1" }), _jsx(TableCell, { children: "Title 2" }), _jsx(TableCell, { children: "Title 3" }), _jsx(TableCell, { children: "Title 4" })] }) }), _jsx(TableBody, { children: Array.from({ length: 10 }).map((_, rowNum) => {
                return (_jsx(TableBodyRow, { children: Array.from({ length: 4 }).map((_, colNum) => {
                        return (_jsxs(TableCell, { children: ["Cell ", rowNum, "-", colNum] }, `${rowNum}-${colNum}`));
                    }) }, `${rowNum}`));
            }) })] }));
export const Default = Template.bind(undefined);
//# sourceMappingURL=table.stories.js.map