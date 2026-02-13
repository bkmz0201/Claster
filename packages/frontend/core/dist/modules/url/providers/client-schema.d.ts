export interface ClientSchemeProvider {
    /**
     * Get the client schema in the current environment, used for the user to complete the authentication process in the browser and redirect back to the app.
     */
    getClientScheme(): string | undefined;
}
export declare const ClientSchemeProvider: import("@toeverything/infra").Identifier<ClientSchemeProvider> & ((variant: string) => import("@toeverything/infra").Identifier<ClientSchemeProvider>);
//# sourceMappingURL=client-schema.d.ts.map