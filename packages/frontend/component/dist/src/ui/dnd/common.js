export const isExternalDrag = (args) => {
    return !args.source['data'];
};
export const getAdaptedEventArgs = (args, fromExternalData, isDropEvent = false) => {
    const data = isExternalDrag(args) && fromExternalData
        ? fromExternalData(
        // @ts-expect-error hack for external data adapter (source has no data field)
        args, isDropEvent)
        : args.source['data'];
    return {
        ...args,
        source: {
            ...args.source,
            data,
        },
    };
};
//# sourceMappingURL=common.js.map