import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable rxjs/finnish */
import { PropertyValue } from '@affine/component';
import { TagsInlineEditor } from '@affine/core/components/tags';
import { TagService } from '@affine/core/modules/tag';
import { affineLabelToDatabaseTagColor, databaseTagColorToV2, } from '@affine/core/modules/tag/entities/utils';
import { MultiSelectIcon, SingleSelectIcon } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { nanoid } from 'nanoid';
import { useCallback, useMemo } from 'react';
import * as styles from './select.css';
const adapter = {
    getSelectedIds$(cell) {
        return cell.value$.map(ids => {
            if (!Array.isArray(ids)) {
                return typeof ids === 'string' ? [ids] : [];
            }
            return ids.filter(id => typeof id === 'string');
        });
    },
    getSelectedTags$(cell) {
        return LiveData.computed(get => {
            const ids = get(adapter.getSelectedIds$(cell));
            const options = get(adapter.getTagOptions$(cell));
            return ids
                .map(id => typeof id === 'string' && options.find(option => option.id === id))
                .filter(option => !!option);
        });
    },
    getTagOptions$(cell) {
        return LiveData.computed(get => {
            const data = get(cell.property.data$);
            return data?.options;
        });
    },
    updateOptions(cell, dataSource, updater) {
        const oldData = dataSource.propertyDataGet(cell.property.id);
        return dataSource.propertyDataSet(cell.property.id, {
            ...oldData,
            options: updater(oldData.options),
        });
    },
    deselectTag(rowId, cell, dataSource, tagId, multiple) {
        const ids = adapter.getSelectedIds$(cell).value;
        dataSource.cellValueChange(rowId, cell.property.id, multiple ? ids.filter(id => id !== tagId) : undefined);
    },
    selectTag(rowId, cell, dataSource, tagId, multiple) {
        const ids = adapter.getSelectedIds$(cell).value;
        dataSource.cellValueChange(rowId, cell.property.id, multiple ? [...ids, tagId] : tagId);
    },
    createTag(cell, dataSource, newTag) {
        adapter.updateOptions(cell, dataSource, options => [
            ...options,
            {
                id: newTag.id,
                value: newTag.name,
                color: newTag.color,
            },
        ]);
    },
    deleteTag(cell, dataSource, tagId) {
        adapter.updateOptions(cell, dataSource, options => options.filter(option => option.id !== tagId));
    },
    updateTag(cell, dataSource, tagId, updater) {
        adapter.updateOptions(cell, dataSource, options => options.map(option => (option.id === tagId ? updater(option) : option)));
    },
};
const BlocksuiteDatabaseSelector = ({ cell, dataSource, rowId, multiple, onChange, }) => {
    const tagService = useService(TagService);
    const selectCell = cell;
    const selectedIds = useLiveData(adapter.getSelectedIds$(selectCell));
    let tagOptions = useLiveData(adapter.getTagOptions$(selectCell));
    // adapt bs database old tag color to new tag color
    let adaptedTagOptions = useMemo(() => {
        return tagOptions.map(tag => ({
            id: tag.id,
            name: tag.value,
            color: databaseTagColorToV2(tag.color),
        }));
    }, [tagOptions]);
    const onCreateTag = useCallback((name, color) => {
        // bs database uses --affine-tag-xxx colors
        const newTag = {
            id: nanoid(),
            name: name,
            color: color,
        };
        adapter.createTag(selectCell, dataSource, newTag);
        return newTag;
    }, [dataSource, selectCell]);
    const onDeleteTag = useCallback((tagId) => {
        adapter.deleteTag(selectCell, dataSource, tagId);
        onChange?.(selectCell.value$.value);
    }, [dataSource, selectCell, onChange]);
    const onDeselectTag = useCallback((tagId) => {
        adapter.deselectTag(rowId, selectCell, dataSource, tagId, multiple);
        onChange?.(selectCell.value$.value);
    }, [rowId, selectCell, dataSource, multiple, onChange]);
    const onSelectTag = useCallback((tagId) => {
        adapter.selectTag(rowId, selectCell, dataSource, tagId, multiple);
        onChange?.(selectCell.value$.value);
    }, [rowId, selectCell, dataSource, multiple, onChange]);
    const tagColors = useMemo(() => {
        return tagService.tagColors.map(([name, color]) => ({
            id: name,
            value: affineLabelToDatabaseTagColor(color),
            name,
        }));
    }, [tagService.tagColors]);
    const onTagChange = useCallback((tagId, property, value) => {
        adapter.updateTag(selectCell, dataSource, tagId, old => {
            if (property === 'color') {
                value = affineLabelToDatabaseTagColor(value);
            }
            return {
                ...old,
                [property]: value,
            };
        });
    }, [dataSource, selectCell]);
    const propertyName = useLiveData(cell.property.name$);
    return (_jsx(TagsInlineEditor, { tagMode: "db-label", className: styles.tagInlineEditor, tags: adaptedTagOptions, selectedTags: selectedIds, onCreateTag: onCreateTag, onDeleteTag: onDeleteTag, onDeselectTag: onDeselectTag, onSelectTag: onSelectTag, tagColors: tagColors, onTagChange: onTagChange, title: _jsxs(_Fragment, { children: [multiple ? _jsx(MultiSelectIcon, {}) : _jsx(SingleSelectIcon, {}), propertyName] }) }));
};
export const SelectCell = ({ cell, dataSource, rowId, onChange, }) => {
    const isEmpty = useLiveData(cell.value$.map(value => Array.isArray(value) && value.length === 0));
    return (_jsx(PropertyValue, { isEmpty: isEmpty, className: styles.container, children: _jsx(BlocksuiteDatabaseSelector, { cell: cell, dataSource: dataSource, rowId: rowId, multiple: false, onChange: onChange }) }));
};
export const MultiSelectCell = ({ cell, dataSource, rowId, onChange, }) => {
    const isEmpty = useLiveData(cell.value$.map(value => Array.isArray(value) && value.length === 0));
    return (_jsx(PropertyValue, { isEmpty: isEmpty, className: styles.container, children: _jsx(BlocksuiteDatabaseSelector, { cell: cell, dataSource: dataSource, rowId: rowId, multiple: true, onChange: onChange }) }));
};
//# sourceMappingURL=select.js.map