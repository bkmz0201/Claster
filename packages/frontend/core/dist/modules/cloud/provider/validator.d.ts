export interface ValidatorProvider {
    /**
     * Calculate a token based on the server's challenge and resource to pass the
     * challenge validation.
     */
    validate: (challenge: string, resource: string) => Promise<string>;
}
export declare const ValidatorProvider: import("@toeverything/infra").Identifier<ValidatorProvider> & ((variant: string) => import("@toeverything/infra").Identifier<ValidatorProvider>);
//# sourceMappingURL=validator.d.ts.map