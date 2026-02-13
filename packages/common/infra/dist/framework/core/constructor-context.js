export const CONSTRUCTOR_CONTEXT = { current: {} };
/**
 * @internal
 */
export function withContext(cb, context) {
    const pre = CONSTRUCTOR_CONTEXT.current;
    try {
        CONSTRUCTOR_CONTEXT.current = context;
        return cb();
    }
    finally {
        CONSTRUCTOR_CONTEXT.current = pre;
    }
}
//# sourceMappingURL=constructor-context.js.map