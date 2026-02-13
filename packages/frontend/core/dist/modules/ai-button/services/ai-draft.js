import { Service } from '@toeverything/infra';
const AI_DRAFTS_KEY = 'AIDrafts';
const AI_DRAFT_FILES_PREFIX = 'AIDraftFile:';
const DEFAULT_VALUE = {
    input: '',
    quote: '',
    markdown: '',
    images: [],
};
export class AIDraftService extends Service {
    constructor(globalStateService, cacheStorage) {
        super();
        this.globalStateService = globalStateService;
        this.cacheStorage = cacheStorage;
        this.state = null;
        this.setDraft = async (data) => {
            const state = await this.getState();
            const newState = {
                ...state,
                ...data,
            };
            this.state = newState;
            await this.saveDraft(newState);
        };
        this.getDraft = async () => {
            const state = await this.getState();
            return state;
        };
        this.saveDraft = async (state) => {
            const draft = this.globalStateService.globalState.get(AI_DRAFTS_KEY) ||
                DEFAULT_VALUE;
            const addedImages = state.images.filter(image => {
                return !draft.images.some(cacheImage => {
                    return cacheImage.cacheKey === this.getCacheKey(image);
                });
            });
            const removedImages = draft.images.filter(cacheImage => {
                return !state.images.some(image => {
                    return cacheImage.cacheKey === this.getCacheKey(image);
                });
            });
            const cacheKeys = removedImages.map(image => image.cacheKey);
            await this.removeFilesFromCache(cacheKeys);
            await this.addFilesToCache(addedImages);
            this.globalStateService.globalState.set(AI_DRAFTS_KEY, {
                input: state.input,
                quote: state.quote,
                markdown: state.markdown,
                images: state.images.map(image => {
                    return {
                        name: image.name,
                        size: image.size,
                        type: image.type,
                        cacheKey: this.getCacheKey(image),
                    };
                }),
            });
        };
        this.initState = async () => {
            if (this.state) {
                return;
            }
            const draft = this.globalStateService.globalState.get(AI_DRAFTS_KEY);
            if (draft) {
                const images = await this.restoreFilesFromData(draft.images);
                this.state = {
                    input: draft.input,
                    quote: draft.quote,
                    markdown: draft.markdown,
                    images,
                };
            }
            else {
                this.state = DEFAULT_VALUE;
            }
        };
        this.getState = async () => {
            await this.initState();
            return this.state;
        };
        this.getCacheKey = (file) => {
            return AI_DRAFT_FILES_PREFIX + file.name + file.size;
        };
        this.addFilesToCache = async (files) => {
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const cacheKey = this.getCacheKey(file);
                await this.cacheStorage.set(cacheKey, arrayBuffer);
            }
        };
        this.removeFilesFromCache = async (cacheKeys) => {
            for (const cacheKey of cacheKeys) {
                await this.cacheStorage.del(cacheKey);
            }
        };
        this.restoreFilesFromData = async (cacheFiles) => {
            const files = [];
            for (const cacheFile of cacheFiles) {
                try {
                    const arrayBuffer = await this.cacheStorage.get(cacheFile.cacheKey);
                    if (arrayBuffer) {
                        const file = new File([arrayBuffer], cacheFile.name, {
                            type: cacheFile.type,
                        });
                        files.push(file);
                    }
                }
                catch (error) {
                    console.warn(`Failed to restore file ${cacheFile.name}:`, error);
                }
            }
            return files;
        };
    }
}
//# sourceMappingURL=ai-draft.js.map