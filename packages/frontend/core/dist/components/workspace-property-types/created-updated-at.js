import { jsx as _jsx } from "react/jsx-runtime";
import { PropertyValue, Tooltip } from '@affine/component';
import { DocService } from '@affine/core/modules/doc';
import { i18nTime, useI18n } from '@affine/i18n';
import { useLiveData, useServices } from '@toeverything/infra';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import * as styles from './created-updated-at.css';
const toRelativeDate = (time) => {
    return i18nTime(time, {
        relative: {
            max: [1, 'day'],
            accuracy: 'day',
        },
        absolute: {
            accuracy: 'day',
        },
    });
};
const MetaDateValueFactory = ({ type, }) => function ReadonlyDateValue() {
    const { docService } = useServices({
        DocService,
    });
    const docMeta = useLiveData(docService.doc.meta$);
    const value = docMeta?.[type];
    const relativeDate = value ? toRelativeDate(value) : null;
    const date = value ? i18nTime(value) : null;
    return (_jsx(Tooltip, { content: date, side: "top", align: "end", children: _jsx(PropertyValue, { className: relativeDate ? '' : styles.empty, isEmpty: !relativeDate, children: relativeDate }) }));
};
export const CreateAtValue = MetaDateValueFactory({
    type: 'createDate',
});
export const UpdatedAtValue = MetaDateValueFactory({
    type: 'updatedDate',
});
export const CreatedAtGroupHeader = ({ groupId, docCount, }) => {
    const date = groupId ? toRelativeDate(groupId) : 'No Date';
    return (_jsx(PlainTextDocGroupHeader, { style: { textTransform: 'capitalize' }, groupId: groupId, docCount: docCount, children: date }));
};
export const UpdatedAtGroupHeader = ({ groupId, docCount, }) => {
    const t = useI18n();
    const date = groupId
        ? toRelativeDate(groupId)
        : t['com.affine.all-docs.group.updated-at.never-updated']();
    return (_jsx(PlainTextDocGroupHeader, { style: { textTransform: 'capitalize' }, groupId: groupId, docCount: docCount, children: date }));
};
export const CreateAtDocListProperty = ({ doc }) => {
    const t = useI18n();
    const docMeta = useLiveData(doc.meta$);
    const createDate = docMeta?.createDate;
    if (!createDate)
        return null;
    return (_jsx(Tooltip, { content: _jsx("span", { className: styles.tooltip, children: t.t('created at', { time: i18nTime(createDate) }) }), children: _jsx("div", { className: styles.dateDocListInlineProperty, children: i18nTime(createDate, { relative: true }) }) }));
};
export const UpdatedAtDocListProperty = ({ doc }) => {
    const t = useI18n();
    const docMeta = useLiveData(doc.meta$);
    const updatedDate = docMeta?.updatedDate;
    if (!updatedDate)
        return null;
    return (_jsx(Tooltip, { content: _jsx("span", { className: styles.tooltip, children: t.t('updated at', { time: i18nTime(updatedDate) }) }), children: _jsx("div", { className: styles.dateDocListInlineProperty, children: i18nTime(updatedDate, { relative: true }) }) }));
};
export { DateFilterValue as CreatedAtFilterValue } from './date';
export { DateFilterValue as UpdatedAtFilterValue } from './date';
//# sourceMappingURL=created-updated-at.js.map