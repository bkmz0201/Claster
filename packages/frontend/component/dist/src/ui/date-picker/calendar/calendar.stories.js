import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResizePanel } from '../../resize-panel/resize-panel';
import { DatePicker } from '.';
export default {
    title: 'UI/Date Picker/Date Picker',
};
const _format = 'YYYY-MM-DD';
const Template = args => {
    const [date, setDate] = useState(dayjs().format(_format));
    return (_jsxs("div", { style: { minHeight: 400, maxWidth: 600, margin: '0 auto' }, children: [_jsxs("div", { style: { marginBottom: 20 }, children: ["Selected Date: ", date] }), _jsx(ResizePanel, { horizontal: true, vertical: false, width: 256, minWidth: 256 + 8 * 2, maxWidth: 1200, children: _jsx(DatePicker, { value: date, onChange: setDate, ...args }) })] }));
};
export const Basic = Template.bind(undefined);
Basic.args = {
    format: 'YYYYMMDD',
    gapX: 8,
    gapY: 8,
    monthNames: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
    weekDays: 'Su,Mo,Tu,We,Th,Fr,Sa',
};
//# sourceMappingURL=calendar.stories.js.map