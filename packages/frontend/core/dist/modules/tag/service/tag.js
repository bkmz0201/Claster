import { Service } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { TagList } from '../entities/tag-list';
const tagColorIds = [
    'Red',
    'Magenta',
    'Orange',
    'Yellow',
    'Green',
    'Teal',
    'Blue',
    'Purple',
    'Grey',
];
export class TagService extends Service {
    constructor() {
        super(...arguments);
        this.tagList = this.framework.createEntity(TagList);
        this.tagColors = tagColorIds.map(color => [color, cssVar(`paletteLine${color}`)]);
    }
    randomTagColor() {
        const randomIndex = Math.floor(Math.random() * this.tagColors.length);
        return this.tagColors[randomIndex][1];
    }
}
//# sourceMappingURL=tag.js.map