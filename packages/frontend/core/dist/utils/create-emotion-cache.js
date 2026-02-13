import createCache from '@emotion/cache';
export default function createEmotionCache() {
    const emotionInsertionPoint = document.querySelector('meta[name="emotion-insertion-point"]');
    const insertionPoint = emotionInsertionPoint ?? undefined;
    return createCache({ key: 'affine', insertionPoint });
}
//# sourceMappingURL=create-emotion-cache.js.map