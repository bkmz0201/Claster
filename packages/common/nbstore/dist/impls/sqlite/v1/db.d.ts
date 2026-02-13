import type { SpaceType } from '../../../utils/universal-id';
interface NativeDBV1Apis {
    getBlob: (spaceType: SpaceType, workspaceId: string, key: string) => Promise<Buffer | null>;
    getBlobKeys: (spaceType: SpaceType, workspaceId: string) => Promise<string[]>;
    getDocAsUpdates: (spaceType: SpaceType, workspaceId: string, subdocId: string) => Promise<Uint8Array>;
    getDocTimestamps: (spaceType: SpaceType, workspaceId: string) => Promise<{
        docId?: string;
        timestamp: Date;
    }[]>;
}
export declare let apis: NativeDBV1Apis | null;
export declare function bindNativeDBV1Apis(a: NativeDBV1Apis): void;
export {};
//# sourceMappingURL=db.d.ts.map