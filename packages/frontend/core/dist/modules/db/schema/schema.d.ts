import type { IconData } from '@affine/component';
import { type FieldSchemaBuilder, type ORMEntity } from '@toeverything/infra';
import type { WorkspacePropertyType } from '../../workspace-property';
export declare const AFFiNE_WORKSPACE_DB_SCHEMA: {
    readonly folders: {
        readonly id: FieldSchemaBuilder<string, true, true>;
        readonly parentId: FieldSchemaBuilder<string, true, false>;
        readonly data: FieldSchemaBuilder<string, false, false>;
        readonly type: FieldSchemaBuilder<string, false, false>;
        readonly index: FieldSchemaBuilder<string, false, false>;
    };
    readonly docProperties: {
        id: FieldSchemaBuilder<string, false, true>;
        primaryMode: FieldSchemaBuilder<string, true, false>;
        edgelessColorTheme: FieldSchemaBuilder<string, true, false>;
        journal: FieldSchemaBuilder<string, true, false>;
        pageWidth: FieldSchemaBuilder<string, true, false>;
        isTemplate: FieldSchemaBuilder<boolean, true, false>;
        integrationType: FieldSchemaBuilder<"readwise", true, false>;
        createdBy: FieldSchemaBuilder<string, true, false>;
        updatedBy: FieldSchemaBuilder<string, true, false>;
    } & {
        __document: FieldSchemaBuilder<boolean, true, false>;
    };
    readonly docCustomPropertyInfo: {
        readonly id: FieldSchemaBuilder<string, true, true>;
        readonly name: FieldSchemaBuilder<string, true, false>;
        readonly type: FieldSchemaBuilder<WorkspacePropertyType, false, false>;
        readonly show: FieldSchemaBuilder<"always-show" | "always-hide" | "hide-when-empty", true, false>;
        readonly index: FieldSchemaBuilder<string, true, false>;
        readonly icon: FieldSchemaBuilder<string, true, false>;
        readonly additionalData: FieldSchemaBuilder<any, true, false>;
        readonly isDeleted: FieldSchemaBuilder<boolean, true, false>;
    };
    readonly pinnedCollections: {
        readonly collectionId: FieldSchemaBuilder<string, false, true>;
        readonly index: FieldSchemaBuilder<string, false, false>;
    };
    readonly explorerIcon: {
        /**
         * ${doc|collection|folder|tag}:${id}
         */
        readonly id: FieldSchemaBuilder<string, false, true>;
        readonly icon: FieldSchemaBuilder<IconData, false, false>;
    };
};
export type AFFiNEWorkspaceDbSchema = typeof AFFiNE_WORKSPACE_DB_SCHEMA;
export type DocProperties = ORMEntity<AFFiNEWorkspaceDbSchema['docProperties']>;
export type DocCustomPropertyInfo = ORMEntity<AFFiNEWorkspaceDbSchema['docCustomPropertyInfo']>;
export declare const AFFiNE_WORKSPACE_USERDATA_DB_SCHEMA: {
    readonly favorite: {
        readonly key: FieldSchemaBuilder<string, false, true>;
        readonly index: FieldSchemaBuilder<string, false, false>;
    };
    readonly settings: {
        readonly key: FieldSchemaBuilder<string, false, true>;
        readonly value: FieldSchemaBuilder<any, false, false>;
    };
    readonly docIntegrationRef: {
        readonly id: FieldSchemaBuilder<string, false, true>;
        readonly type: FieldSchemaBuilder<"readwise", false, false>;
        /**
         * Identify **affine user** and **integration type** and **integration account**
         * Used to quickly find user's all integrations
         */
        readonly integrationId: FieldSchemaBuilder<string, false, false>;
        readonly refMeta: FieldSchemaBuilder<any, false, false>;
    };
};
export type AFFiNEWorkspaceUserdataDbSchema = typeof AFFiNE_WORKSPACE_USERDATA_DB_SCHEMA;
export type DocIntegrationRef = ORMEntity<AFFiNEWorkspaceUserdataDbSchema['docIntegrationRef']>;
//# sourceMappingURL=schema.d.ts.map