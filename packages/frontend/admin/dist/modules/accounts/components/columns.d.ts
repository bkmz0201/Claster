import { FeatureType } from '@affine/graphql';
import type { ColumnDef } from '@tanstack/react-table';
import { type Dispatch, type SetStateAction } from 'react';
export declare const useColumns: ({ setSelectedUserIds, }: {
    setSelectedUserIds: Dispatch<SetStateAction<Set<string>>>;
}) => ColumnDef<{
    __typename?: "UserType";
    id: string;
    name: string;
    email: string;
    disabled: boolean;
    features: Array<FeatureType>;
    hasPassword: boolean | null;
    emailVerified: boolean;
    avatarUrl: string | null;
}>[];
//# sourceMappingURL=columns.d.ts.map