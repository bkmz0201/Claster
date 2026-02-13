export type { Member } from './entities/members';
export { DocGrantedUsersService, type GrantedUser, } from './services/doc-granted-users';
export { GuardService } from './services/guard';
export { MemberSearchService } from './services/member-search';
export { WorkspaceMembersService } from './services/members';
export { WorkspacePermissionService } from './services/permission';
export { type DocPermissionActions, type WorkspacePermissionActions, } from './stores/guard';
import { type Framework } from '@toeverything/infra';
export declare function configurePermissionsModule(framework: Framework): void;
//# sourceMappingURL=index.d.ts.map