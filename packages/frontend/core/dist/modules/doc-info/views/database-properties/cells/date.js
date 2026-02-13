import { jsx as _jsx } from "react/jsx-runtime";
import { DateValue } from '@affine/core/components/workspace-property-types/date';
import { useLiveData } from '@toeverything/infra';
import dayjs from 'dayjs';
const toInternalDateString = (date) => {
    if (typeof date !== 'string' && typeof date !== 'number') {
        return '';
    }
    return dayjs(date).format('YYYY-MM-DD');
};
const fromInternalDateString = (date) => {
    return dayjs(date).toDate().getTime();
};
export const DateCell = ({ cell, rowId, dataSource, onChange, }) => {
    const value = useLiveData(cell.value$);
    const date = value ? toInternalDateString(value) : '';
    return (_jsx(DateValue, { value: date, onChange: v => {
            dataSource.cellValueChange(rowId, cell.property.id, fromInternalDateString(v));
            onChange?.(fromInternalDateString(v));
        } }));
};
//# sourceMappingURL=date.js.map