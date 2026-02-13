import { DebugLogger } from '@affine/debug';
import { catchErrorInto, effect, Entity, LiveData, mapInto, } from '@toeverything/infra';
import { filter, map, switchMap } from 'rxjs';
const logger = new DebugLogger('affine:pdf:page:render');
export class PDFPage extends Entity {
    constructor() {
        super();
        this.pageNum = this.props.pageNum;
        this.bitmap$ = new LiveData(null);
        this.error$ = new LiveData(null);
        this.render = effect(switchMap((opts) => this.props.pdf.renderer.ob$('render', {
            ...opts,
            pageNum: this.pageNum,
        })), map(data => data?.bitmap), filter(Boolean), mapInto(this.bitmap$), catchErrorInto(this.error$, error => {
            logger.error('Failed to render page', error);
        }));
        this.disposables.push(() => this.render.unsubscribe);
    }
}
//# sourceMappingURL=pdf-page.js.map