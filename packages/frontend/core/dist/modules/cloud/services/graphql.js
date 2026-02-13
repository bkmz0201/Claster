import { UserFriendlyError } from '@affine/error';
import { gqlFetcherFactory, } from '@affine/graphql';
import { fromPromise, Service } from '@toeverything/infra';
import { AuthService } from './auth';
export class GraphQLService extends Service {
    constructor(fetcher) {
        super();
        this.fetcher = fetcher;
        this.rawGql = gqlFetcherFactory('/graphql', this.fetcher.fetch);
        this.rxGql = (options) => {
            return fromPromise(signal => {
                return this.gql({
                    ...options,
                    context: {
                        signal,
                        ...options.context,
                    },
                });
            });
        };
        this.gql = async (options) => {
            try {
                return await this.rawGql(options);
            }
            catch (anyError) {
                const error = UserFriendlyError.fromAny(anyError);
                if (error.isStatus(401)) {
                    this.framework.get(AuthService).session.revalidate();
                }
                throw error;
            }
        };
    }
}
//# sourceMappingURL=graphql.js.map