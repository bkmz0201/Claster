export class Match {
    constructor() {
        this.scores = new Map();
        /**
         * nid -> field -> index(multi value field) -> [start, end][]
         */
        this.highlighters = new Map();
    }
    size() {
        return this.scores.size;
    }
    getScore(id) {
        return this.scores.get(id) ?? 0;
    }
    addScore(id, score) {
        const currentScore = this.scores.get(id) || 0;
        this.scores.set(id, currentScore + score);
    }
    getHighlighters(id, field) {
        return this.highlighters.get(id)?.get(field);
    }
    addHighlighter(id, field, index, newRanges) {
        const fields = this.highlighters.get(id) ||
            new Map();
        const values = fields.get(field) || new Map();
        const ranges = values.get(index) || [];
        ranges.push(...newRanges);
        values.set(index, ranges);
        fields.set(field, values);
        this.highlighters.set(id, fields);
    }
    and(other) {
        const newWeight = new Match();
        for (const [id, score] of this.scores) {
            if (other.scores.has(id)) {
                newWeight.addScore(id, score + (other.scores.get(id) ?? 0));
                newWeight.copyExtData(this, id);
                newWeight.copyExtData(other, id);
            }
        }
        return newWeight;
    }
    or(other) {
        const newWeight = new Match();
        for (const [id, score] of this.scores) {
            newWeight.addScore(id, score);
            newWeight.copyExtData(this, id);
        }
        for (const [id, score] of other.scores) {
            newWeight.addScore(id, score);
            newWeight.copyExtData(other, id);
        }
        return newWeight;
    }
    exclude(other) {
        const newWeight = new Match();
        for (const [id, score] of this.scores) {
            if (!other.scores.has(id)) {
                newWeight.addScore(id, score);
                newWeight.copyExtData(this, id);
            }
        }
        return newWeight;
    }
    boost(boost) {
        const newWeight = new Match();
        for (const [id, score] of this.scores) {
            newWeight.addScore(id, score * boost);
            newWeight.copyExtData(this, id);
        }
        return newWeight;
    }
    toArray() {
        return Array.from(this.scores.entries())
            .sort((a, b) => b[1] - a[1])
            .map(e => e[0]);
    }
    copyExtData(from, id) {
        for (const [field, values] of from.highlighters.get(id) ?? []) {
            for (const [index, ranges] of values) {
                this.addHighlighter(id, field, index, ranges);
            }
        }
    }
}
//# sourceMappingURL=match.js.map