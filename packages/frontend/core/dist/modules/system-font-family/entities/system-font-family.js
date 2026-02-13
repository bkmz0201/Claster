import { effect, Entity, fromPromise, LiveData, mapInto, onComplete, onStart, } from '@toeverything/infra';
import { exhaustMap } from 'rxjs';
export class SystemFontFamily extends Entity {
    constructor() {
        super();
        this.searchText$ = new LiveData(null);
        this.isLoading$ = new LiveData(false);
        this.fontList$ = new LiveData([]);
        this.result$ = LiveData.computed(get => {
            const fontList = get(this.fontList$);
            const searchText = get(this.searchText$);
            if (!searchText) {
                return fontList;
            }
            const filteredFonts = fontList.filter(font => font.fullName.toLowerCase().includes(searchText.toLowerCase()));
            return filteredFonts;
        }).throttleTime(500);
        this.loadFontList = effect(exhaustMap(() => {
            return fromPromise(async () => {
                if (!window.queryLocalFonts) {
                    return [];
                }
                const fonts = await window.queryLocalFonts();
                return fonts;
            }).pipe(mapInto(this.fontList$), 
            // TODO: catchErrorInto(this.error$),
            onStart(() => {
                this.isLoading$.next(true);
            }), onComplete(() => {
                this.isLoading$.next(false);
            }));
        }));
    }
    search(searchText) {
        this.searchText$.next(searchText);
    }
    clearSearch() {
        this.searchText$.next(null);
    }
}
//# sourceMappingURL=system-font-family.js.map