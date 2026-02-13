import type { ErrorDataUnion, ErrorNames } from '@affine/graphql';
import { GraphQLError as BaseGraphQLError } from 'graphql';
export type ErrorName = keyof typeof ErrorNames | 'NETWORK_ERROR' | 'CONTENT_TOO_LARGE';
export interface UserFriendlyErrorResponse {
    status: number;
    code: string;
    type: string;
    name: ErrorName;
    message: string;
    data?: any;
    stacktrace?: string;
}
type ToPascalCase<S extends string> = S extends `${infer A}_${infer B}` ? `${Capitalize<Lowercase<A>>}${ToPascalCase<B>}` : Capitalize<Lowercase<S>>;
export type ErrorData = {
    [K in ErrorNames]: Extract<ErrorDataUnion, {
        __typename?: `${ToPascalCase<K>}DataType`;
    }>;
};
export declare class GraphQLError extends BaseGraphQLError {
    extensions: UserFriendlyErrorResponse;
}
export declare class UserFriendlyError extends Error implements UserFriendlyErrorResponse {
    private readonly response;
    readonly status: number;
    readonly code: string;
    readonly type: string;
    readonly name: ErrorName;
    readonly message: string;
    readonly data: any;
    readonly stacktrace: string | undefined;
    static fromAny(anything: any): UserFriendlyError;
    constructor(response: UserFriendlyErrorResponse);
    is(name: ErrorName): boolean;
    isStatus(status: number): boolean;
    static isNetworkError(error: UserFriendlyError): boolean;
    static notNetworkError(error: UserFriendlyError): boolean;
    isNetworkError(): boolean;
    notNetworkError(): boolean;
}
export {};
//# sourceMappingURL=index.d.ts.map