import { type Query } from '../../../storage';
import { type NativeDBConnection } from '../db';
import { Match } from './match';
export declare function queryRaw(connection: NativeDBConnection, table: string, query: Query<any>): Promise<Match>;
export declare function matchAll(connection: NativeDBConnection, table: string): Promise<Match>;
//# sourceMappingURL=query.d.ts.map