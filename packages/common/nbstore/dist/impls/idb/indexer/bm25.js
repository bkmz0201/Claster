const defaultBM25params = { k: 1.2, b: 0.7, d: 0.5 };
export const bm25 = (termFreq, matchingCount, totalCount, fieldLength, avgFieldLength, bm25params = defaultBM25params) => {
    const { k, b, d } = bm25params;
    const invDocFreq = Math.log(1 + (totalCount - matchingCount + 0.5) / (matchingCount + 0.5));
    return (invDocFreq *
        (d +
            (termFreq * (k + 1)) /
                (termFreq + k * (1 - b + b * (fieldLength / avgFieldLength)))));
};
//# sourceMappingURL=bm25.js.map