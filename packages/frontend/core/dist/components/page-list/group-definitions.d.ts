import type { DateKey, ItemGroupDefinition, ListItem } from './types';
export declare const useDateGroupDefinitions: <T extends ListItem>(key: DateKey) => ItemGroupDefinition<T>[];
export declare const useTagGroupDefinitions: () => ItemGroupDefinition<ListItem>[];
export declare const useFavoriteGroupDefinitions: <T extends ListItem>() => ItemGroupDefinition<T>[];
export declare const usePageItemGroupDefinitions: () => ItemGroupDefinition<ListItem>[] | undefined;
//# sourceMappingURL=group-definitions.d.ts.map