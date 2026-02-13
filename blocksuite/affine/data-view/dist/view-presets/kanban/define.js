import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { defaultGroupBy, getGroupByService, t } from '../../core/index.js';
import { viewType } from '../../core/view/data-view.js';
import { KanbanSingleView } from './kanban-view-manager.js';
export const kanbanViewType = viewType('kanban');
export const kanbanViewModel = kanbanViewType.createModel({
    defaultName: 'Kanban View',
    dataViewManager: KanbanSingleView,
    defaultData: viewManager => {
        const groupByService = getGroupByService(viewManager.dataSource);
        const columns = viewManager.dataSource.properties$.value;
        const allowList = columns.filter(columnId => {
            const dataType = viewManager.dataSource.propertyDataTypeGet(columnId);
            return dataType && !!groupByService?.matcher.match(dataType);
        });
        const getWeight = (columnId) => {
            const dataType = viewManager.dataSource.propertyDataTypeGet(columnId);
            if (!dataType || t.string.is(dataType) || t.richText.is(dataType)) {
                return 0;
            }
            if (t.tag.is(dataType)) {
                return 3;
            }
            if (t.array.is(dataType)) {
                return 2;
            }
            return 1;
        };
        const columnId = allowList.sort((a, b) => getWeight(b) - getWeight(a))[0];
        if (!columnId) {
            throw new BlockSuiteError(ErrorCode.DatabaseBlockError, 'no groupable column found');
        }
        const type = viewManager.dataSource.propertyTypeGet(columnId);
        const meta = type && viewManager.dataSource.propertyMetaGet(type);
        const data = viewManager.dataSource.propertyDataGet(columnId);
        if (!columnId || !meta || !data) {
            throw new BlockSuiteError(ErrorCode.DatabaseBlockError, 'not implement yet');
        }
        return {
            columns: columns.map(id => ({
                id: id,
            })),
            filter: {
                type: 'group',
                op: 'and',
                conditions: [],
            },
            groupBy: defaultGroupBy(viewManager.dataSource, meta, columnId, data),
            header: {
                titleColumn: viewManager.dataSource.properties$.value.find(id => viewManager.dataSource.propertyTypeGet(id) === 'title'),
                iconColumn: 'type',
            },
            groupProperties: [],
        };
    },
});
//# sourceMappingURL=define.js.map