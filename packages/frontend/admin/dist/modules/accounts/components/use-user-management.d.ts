import { type ImportUsersInput, type ImportUsersMutation } from '@affine/graphql';
import type { UserInput, UserType } from '../schema';
export interface ExportField {
    id: string;
    label: string;
    checked: boolean;
}
export type UserImportReturnType = ImportUsersMutation['importUsers'];
export declare const useCreateUser: () => {
    creating: boolean;
    create: (args_0: UserInput) => void;
};
export declare const useUpdateUser: () => {
    updating: boolean;
    update: (args_0: UserInput & {
        userId: string;
    }) => void;
};
export declare const useResetUserPassword: () => {
    resetPasswordLink: string;
    onResetPassword: (id: string, callback?: () => void) => Promise<void>;
};
export declare const useDeleteUser: () => (id: string, callback?: (() => void) | undefined) => void;
export declare const useEnableUser: () => (id: string, callback?: (() => void) | undefined) => void;
export declare const useDisableUser: () => (id: string, callback?: (() => void) | undefined) => void;
export declare const useImportUsers: () => (input: ImportUsersInput, callback?: (importUsers: UserImportReturnType) => void) => Promise<void>;
export declare const useExportUsers: () => {
    exportCSV: (users: UserType[], fields: ExportField[], callback?: () => void) => Promise<void>;
    copyToClipboard: (users: UserType[], fields: ExportField[], callback?: () => void) => Promise<void>;
};
//# sourceMappingURL=use-user-management.d.ts.map