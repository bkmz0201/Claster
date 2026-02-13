import { type GraphQLQuery, type QueryOptions, type QueryResponse } from '@affine/graphql';
import { Service } from '@toeverything/infra';
import type { Observable } from 'rxjs';
import type { FetchService } from './fetch';
export declare class GraphQLService extends Service {
    private readonly fetcher;
    constructor(fetcher: FetchService);
    private readonly rawGql;
    rxGql: <Query extends GraphQLQuery>(options: QueryOptions<Query>) => Observable<QueryResponse<Query>>;
    gql: <Query extends GraphQLQuery>(options: QueryOptions<Query>) => Promise<QueryResponse<Query>>;
}
//# sourceMappingURL=graphql.d.ts.map