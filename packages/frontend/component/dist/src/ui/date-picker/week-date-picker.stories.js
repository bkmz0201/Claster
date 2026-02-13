import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import dayjs from 'dayjs';
import { useState } from 'react';
import { ResizePanel } from '../resize-panel/resize-panel';
import { WeekDatePicker } from './week-date-picker';
export default {
    title: 'UI/Date Picker/Week Date Picker',
};
const _format = 'YYYY-MM-DD';
const Template = args => {
    const [date, setDate] = useState(dayjs().format(_format));
    return (_jsxs("div", { style: { paddingBottom: 100 }, children: [_jsxs("div", { style: { marginBottom: 20 }, children: ["Selected Date: ", date] }), _jsx(ResizePanel, { width: 600, height: 56, minHeight: 56, minWidth: 100, maxWidth: 1400, horizontal: true, vertical: false, style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'stretch',
                }, children: _jsx(WeekDatePicker, { style: { width: '100%' }, value: date, ...args, onChange: e => {
                        setDate(dayjs(e, _format).format(_format));
                    } }) })] }));
};
export const Basic = Template.bind(undefined);
Basic.args = {};
//# sourceMappingURL=week-date-picker.stories.js.map