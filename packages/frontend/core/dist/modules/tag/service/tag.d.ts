import { Service } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { TagList } from '../entities/tag-list';
type TagColorHelper<T> = T extends `paletteLine${infer Color}` ? Color : never;
export type TagColorName = TagColorHelper<Parameters<typeof cssVar>[0]>;
export declare class TagService extends Service {
    tagList: TagList;
    tagColors: (readonly [TagColorName, string])[];
    randomTagColor(): string;
}
export {};
//# sourceMappingURL=tag.d.ts.map