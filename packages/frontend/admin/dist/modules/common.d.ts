import type { GetCurrentUserFeaturesQuery } from '@affine/graphql';
import { FeatureType } from '@affine/graphql';
export declare const useServerConfig: () => {
    __typename?: "ServerConfigType";
    version: string;
    baseUrl: string;
    name: string;
    features: Array<import("@affine/graphql").ServerFeature>;
    type: import("@affine/graphql").ServerDeploymentType;
    initialized: boolean;
    availableUserFeatures: Array<FeatureType>;
    credentialsRequirement: {
        __typename?: "CredentialsRequirementType";
        password: {
            __typename?: "PasswordLimitsType";
            minLength: number;
            maxLength: number;
        };
    };
    availableUpgrade: {
        __typename?: "ReleaseVersionType";
        changelog: string;
        version: string;
        publishedAt: string;
        url: string;
    } | null;
};
export declare const useRevalidateServerConfig: () => () => Promise<any[]>;
export declare const useRevalidateCurrentUser: () => () => Promise<any[]>;
export declare const useCurrentUser: () => {
    __typename?: "UserType";
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    avatarUrl: string | null;
    features: Array<FeatureType>;
} | null;
export declare function isAdmin(user: NonNullable<GetCurrentUserFeaturesQuery['currentUser']>): boolean;
export declare function useMediaQuery(query: string): boolean;
//# sourceMappingURL=common.d.ts.map