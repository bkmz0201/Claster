import { DatabaseBlockDataSource, ExternalGroupByConfigProvider, } from '@blocksuite/affine/blocks/database';
import { groupByConfigList } from '../../database-block/group-by';
import { propertiesPresets } from '../../database-block/properties';
export function patchDatabaseBlockConfigService() {
    //TODO use service
    DatabaseBlockDataSource.externalProperties.value = propertiesPresets;
    return {
        setup: di => {
            groupByConfigList.forEach(config => {
                di.addValue(ExternalGroupByConfigProvider(config.name), config);
            });
        },
    };
}
//# sourceMappingURL=database-block-config-service.js.map