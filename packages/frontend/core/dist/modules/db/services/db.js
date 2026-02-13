import { createORMClient, LiveData, ObjectPool, Service, YjsDBAdapter, } from '@toeverything/infra';
import { Doc as YDoc } from 'yjs';
import { AuthService } from '../../cloud/services/auth';
import { WorkspaceDB } from '../entities/db';
import { AFFiNE_WORKSPACE_DB_SCHEMA, AFFiNE_WORKSPACE_USERDATA_DB_SCHEMA, } from '../schema';
const WorkspaceDBClient = createORMClient(AFFiNE_WORKSPACE_DB_SCHEMA);
const WorkspaceUserdataDBClient = createORMClient(AFFiNE_WORKSPACE_USERDATA_DB_SCHEMA);
export class WorkspaceDBService extends Service {
    constructor(workspaceService, workspaceServerService) {
        super();
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
        this.userdataDBPool = new ObjectPool({
            onDangling() {
                return false; // never release
            },
        });
        this.authService = this.workspaceServerService.server?.scope.get(AuthService);
        this.db = this.framework.createEntity((WorkspaceDB), {
            db: new WorkspaceDBClient(new YjsDBAdapter(AFFiNE_WORKSPACE_DB_SCHEMA, {
                getDoc: guid => {
                    const ydoc = new YDoc({
                        // guid format: db${guid}
                        guid: `db$${guid}`,
                    });
                    this.workspaceService.workspace.engine.doc.connectDoc(ydoc);
                    this.workspaceService.workspace.engine.doc.addPriority(ydoc.guid, 50);
                    return ydoc;
                },
            })),
            schema: AFFiNE_WORKSPACE_DB_SCHEMA,
            storageDocId: tableName => `db$${tableName}`,
        });
    }
    userdataDB(userId) {
        // __local__ for local workspace
        const userdataDb = this.userdataDBPool.get(userId);
        if (userdataDb) {
            return userdataDb.obj;
        }
        const newDB = this.framework.createEntity((WorkspaceDB), {
            db: new WorkspaceUserdataDBClient(new YjsDBAdapter(AFFiNE_WORKSPACE_USERDATA_DB_SCHEMA, {
                getDoc: guid => {
                    const ydoc = new YDoc({
                        // guid format: userdata${userId}${guid}
                        guid: `userdata$${userId}$${guid}`,
                    });
                    this.workspaceService.workspace.engine.doc.connectDoc(ydoc);
                    this.workspaceService.workspace.engine.doc.addPriority(ydoc.guid, 50);
                    return ydoc;
                },
            })),
            schema: AFFiNE_WORKSPACE_USERDATA_DB_SCHEMA,
            storageDocId: tableName => `userdata$${userId}$${tableName}`,
        });
        this.userdataDBPool.put(userId, newDB);
        return newDB;
    }
    get userdataDB$() {
        // if is local workspace or no account, use __local__ userdata
        // sometimes we may have cloud workspace but no account for a short time, we also use __local__ userdata
        if (this.workspaceService.workspace.meta.flavour === 'local' ||
            !this.authService) {
            return new LiveData(this.userdataDB('__local__'));
        }
        else {
            return this.authService.session.account$.map(account => {
                if (!account) {
                    return this.userdataDB('__local__');
                }
                return this.userdataDB(account.id);
            });
        }
    }
    static isDBDocId(docId) {
        return docId.startsWith('db$') || docId.startsWith('userdata$');
    }
}
//# sourceMappingURL=db.js.map