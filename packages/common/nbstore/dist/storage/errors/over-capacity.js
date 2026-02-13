export class OverCapacityError extends Error {
    constructor(originError) {
        super('Storage over capacity.');
        this.originError = originError;
    }
}
//# sourceMappingURL=over-capacity.js.map