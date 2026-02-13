import { DebugLogger } from '@affine/debug';
import { GraphQLError } from '@affine/error';
import { isNil, isObject, merge } from 'lodash-es';
function filterEmptyValue(vars) {
    const newVars = {};
    Object.entries(vars).forEach(([key, value]) => {
        if (isNil(value)) {
            return;
        }
        if (isObject(value) && !(value instanceof File)) {
            newVars[key] = filterEmptyValue(value);
            return;
        }
        newVars[key] = value;
    });
    return newVars;
}
export function transformToForm(body) {
    const form = new FormData();
    const gqlBody = {
        query: body.query,
        variables: body.variables,
        map: {},
    };
    if (body.operationName) {
        gqlBody.name = body.operationName;
    }
    const map = {};
    const files = [];
    if (body.variables) {
        let i = 0;
        const buildMap = (key, value) => {
            if (value instanceof File) {
                map['' + i] = [key];
                files[i] = value;
                i++;
            }
            else if (Array.isArray(value)) {
                value.forEach((v, index) => {
                    buildMap(`${key}.${index}`, v);
                });
            }
            else if (isObject(value)) {
                Object.entries(value).forEach(([k, v]) => {
                    buildMap(`${key}.${k}`, v);
                });
            }
        };
        buildMap('variables', body.variables);
    }
    form.set('operations', JSON.stringify(gqlBody));
    form.set('map', JSON.stringify(map));
    for (const [i, file] of files.entries()) {
        form.set(`${i}`, file);
    }
    return form;
}
function formatRequestBody({ query, variables, keepNilVariables, }) {
    const body = {
        query: query.query,
        variables: (keepNilVariables ?? true) ? variables : filterEmptyValue(variables),
    };
    if (query.op) {
        body.operationName = query.op;
    }
    if (query.file) {
        return transformToForm(body);
    }
    return body;
}
export const gqlFetcherFactory = (endpoint, fetcher = fetch) => {
    const logger = new DebugLogger('GraphQL');
    const gqlFetch = async (options) => {
        if (BUILD_CONFIG.appBuildType === 'canary' &&
            options.query.deprecations?.length) {
            options.query.deprecations.forEach(deprecation => {
                logger.warn(deprecation);
            });
        }
        const body = formatRequestBody(options);
        const isFormData = body instanceof FormData;
        const headers = {
            'x-operation-name': options.query.op,
        };
        if (!isFormData) {
            headers['content-type'] = 'application/json';
        }
        const ret = fetcher(endpoint, merge(options.context, {
            method: 'POST',
            headers,
            body: isFormData ? body : JSON.stringify(body),
            timeout: options.timeout,
            signal: options.signal,
        })).then(async (res) => {
            if (res.headers.get('content-type')?.startsWith('application/json')) {
                const result = (await res.json());
                if (res.status >= 400 || result.errors) {
                    if (result.errors && result.errors.length > 0) {
                        // throw the first error is enough
                        const firstError = result.errors[0];
                        throw new GraphQLError(firstError.message, firstError);
                    }
                    else {
                        throw new GraphQLError('Empty GraphQL error body');
                    }
                }
                else if (result.data) {
                    // we have to cast here because the type of result.data is a union type
                    return result.data;
                }
            }
            throw new GraphQLError('GraphQL query responds unexpected result, query ' + options.query.op);
        });
        return ret;
    };
    return gqlFetch;
};
//# sourceMappingURL=fetcher.js.map