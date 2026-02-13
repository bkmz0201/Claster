/**
 * Custom fetch utility with AFFiNE version header
 * Automatically adds the x-affine-version header to all fetch requests
 */
/**
 * Wrapper around fetch that automatically adds the x-affine-version header
 * @param input Request URL
 * @param init Request initialization options
 * @returns Promise with the fetch Response
 */
export declare const affineFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
//# sourceMappingURL=fetch-utils.d.ts.map