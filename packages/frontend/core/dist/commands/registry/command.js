// TODO(@Peng): need better way for composing different precondition strategies
export var PreconditionStrategy;
(function (PreconditionStrategy) {
    PreconditionStrategy[PreconditionStrategy["Always"] = 0] = "Always";
    PreconditionStrategy[PreconditionStrategy["InPaperOrEdgeless"] = 1] = "InPaperOrEdgeless";
    PreconditionStrategy[PreconditionStrategy["InPaper"] = 2] = "InPaper";
    PreconditionStrategy[PreconditionStrategy["InEdgeless"] = 3] = "InEdgeless";
    PreconditionStrategy[PreconditionStrategy["InEdgelessPresentationMode"] = 4] = "InEdgelessPresentationMode";
    PreconditionStrategy[PreconditionStrategy["NoSearchResult"] = 5] = "NoSearchResult";
    PreconditionStrategy[PreconditionStrategy["Never"] = 6] = "Never";
})(PreconditionStrategy || (PreconditionStrategy = {}));
export function createAffineCommand(options) {
    return {
        id: options.id,
        run: options.run,
        icon: options.icon,
        preconditionStrategy: options.preconditionStrategy ?? PreconditionStrategy.Always,
        category: options.category ?? 'affine:general',
        get label() {
            let label = options.label;
            label = typeof label === 'function' ? label?.() : label;
            label =
                typeof label === 'string'
                    ? {
                        title: label,
                    }
                    : label;
            return label;
        },
        keyBinding: typeof options.keyBinding === 'string'
            ? { binding: options.keyBinding }
            : options.keyBinding,
    };
}
//# sourceMappingURL=command.js.map