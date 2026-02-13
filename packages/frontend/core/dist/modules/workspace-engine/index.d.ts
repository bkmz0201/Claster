import { type Framework } from '@toeverything/infra';
export { base64ToUint8Array, uint8ArrayToBase64 } from './utils/base64';
export declare function configureBrowserWorkspaceFlavours(framework: Framework): void;
/**
 * a hack for directly add local workspace to workspace list
 * Used after copying sqlite database file to appdata folder
 */
export declare function _addLocalWorkspace(id: string): void;
//# sourceMappingURL=index.d.ts.map