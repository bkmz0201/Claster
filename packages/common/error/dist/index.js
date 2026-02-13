import { GraphQLError as BaseGraphQLError } from 'graphql';
function UnknownError(message) {
    return new UserFriendlyError({
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        type: 'INTERNAL_SERVER_ERROR',
        name: 'INTERNAL_SERVER_ERROR',
        message,
    });
}
export class GraphQLError extends BaseGraphQLError {
}
export class UserFriendlyError extends Error {
    static fromAny(anything) {
        if (anything instanceof UserFriendlyError) {
            return anything;
        }
        switch (typeof anything) {
            case 'string':
                return UnknownError(anything);
            case 'object': {
                if (anything) {
                    if (anything instanceof GraphQLError) {
                        return new UserFriendlyError(anything.extensions);
                    }
                    else if (anything.type && anything.name && anything.message) {
                        return new UserFriendlyError(anything);
                    }
                    else if (anything.message) {
                        return UnknownError(anything.message);
                    }
                }
            }
        }
        return UnknownError('Unhandled error raised. Please contact us for help.');
    }
    constructor(response) {
        super(response.message);
        this.response = response;
        this.status = this.response.status;
        this.code = this.response.code;
        this.type = this.response.type;
        this.name = this.response.name;
        this.message = this.response.message;
        this.data = this.response.data;
        this.stacktrace = this.response.stacktrace;
    }
    is(name) {
        return this.name === name;
    }
    isStatus(status) {
        return this.status === status;
    }
    static isNetworkError(error) {
        return error.name === 'NETWORK_ERROR';
    }
    static notNetworkError(error) {
        return !UserFriendlyError.isNetworkError(error);
    }
    isNetworkError() {
        return UserFriendlyError.isNetworkError(this);
    }
    notNetworkError() {
        return UserFriendlyError.notNetworkError(this);
    }
}
//# sourceMappingURL=index.js.map