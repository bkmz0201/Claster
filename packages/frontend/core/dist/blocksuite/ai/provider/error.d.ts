declare abstract class BaseAIError extends Error {
    abstract readonly type: AIErrorType;
}
export declare enum AIErrorType {
    GeneralNetworkError = "GeneralNetworkError",
    PaymentRequired = "PaymentRequired",
    Unauthorized = "Unauthorized",
    RequestTimeout = "RequestTimeout"
}
export declare class UnauthorizedError extends BaseAIError {
    readonly type = AIErrorType.Unauthorized;
    constructor();
}
export declare class PaymentRequiredError extends BaseAIError {
    readonly type = AIErrorType.PaymentRequired;
    constructor();
}
export declare class GeneralNetworkError extends BaseAIError {
    readonly type = AIErrorType.GeneralNetworkError;
    constructor(message?: string);
}
export declare class RequestTimeoutError extends BaseAIError {
    readonly type = AIErrorType.RequestTimeout;
    constructor(message?: string);
}
export type AIError = UnauthorizedError | PaymentRequiredError | GeneralNetworkError | RequestTimeoutError;
export {};
//# sourceMappingURL=error.d.ts.map