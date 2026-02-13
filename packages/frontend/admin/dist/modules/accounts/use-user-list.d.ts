export declare const useUserList: () => {
    users: {
        __typename?: "UserType";
        id: string;
        name: string;
        email: string;
        disabled: boolean;
        features: Array<import("@affine/graphql").FeatureType>;
        hasPassword: boolean | null;
        emailVerified: boolean;
        avatarUrl: string | null;
    }[];
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
    setPagination: import("react").Dispatch<import("react").SetStateAction<{
        pageIndex: number;
        pageSize: number;
    }>>;
    usersCount: number;
};
//# sourceMappingURL=use-user-list.d.ts.map