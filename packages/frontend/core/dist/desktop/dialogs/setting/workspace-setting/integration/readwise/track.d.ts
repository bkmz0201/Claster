/**
 * Wrap the track function to add default properties to the first argument
 */
export declare const readwiseTrack: {
    connectIntegration: (args?: (Partial<{
        type: string;
        control: "Readwise Card" | "Readwise settings" | "Readwise import list" | "Calendar Setting";
    } & {
        result: "success" | "failed";
    }> & {
        page?: keyof import("@affine/track").Events;
        segment?: string;
        module?: string;
        control?: string;
    }) | undefined) => void;
    disconnectIntegration: (args?: (Partial<{
        type: string;
        control: "Readwise Card" | "Readwise settings" | "Readwise import list" | "Calendar Setting";
    } & {
        method: "keep" | "delete";
    }> & {
        page?: keyof import("@affine/track").Events;
        segment?: string;
        module?: string;
        control?: string;
    }) | undefined) => void;
    modifyIntegrationSettings: (args?: (Partial<{
        type: string;
        control: "Readwise Card" | "Readwise settings" | "Readwise import list" | "Calendar Setting";
    } & {
        item: string;
        option: any;
        method: any;
    }> & {
        page?: keyof import("@affine/track").Events;
        segment?: string;
        module?: string;
        control?: string;
    }) | undefined) => void;
    startIntegrationImport: (args?: (Partial<{
        type: string;
        control: "Readwise Card" | "Readwise settings" | "Readwise import list" | "Calendar Setting";
    } & {
        method: "new" | "withtimestamp" | "cleartimestamp";
    }> & {
        page?: keyof import("@affine/track").Events;
        segment?: string;
        module?: string;
        control?: string;
    }) | undefined) => void;
    selectIntegrationImport: (args?: (Partial<{
        type: string;
        control: "Readwise Card" | "Readwise settings" | "Readwise import list" | "Calendar Setting";
    } & {
        method: "single" | "all";
        option: "on" | "off";
    }> & {
        page?: keyof import("@affine/track").Events;
        segment?: string;
        module?: string;
        control?: string;
    }) | undefined) => void;
    confirmIntegrationImport: (args?: (Partial<{
        type: string;
        control: "Readwise Card" | "Readwise settings" | "Readwise import list" | "Calendar Setting";
    } & {
        method: "new" | "withtimestamp";
    }> & {
        page?: keyof import("@affine/track").Events;
        segment?: string;
        module?: string;
        control?: string;
    }) | undefined) => void;
    abortIntegrationImport: (args?: (Partial<{
        type: string;
        control: "Readwise Card" | "Readwise settings" | "Readwise import list" | "Calendar Setting";
    } & {
        time: number;
        done: number;
        total: number;
    }> & {
        page?: keyof import("@affine/track").Events;
        segment?: string;
        module?: string;
        control?: string;
    }) | undefined) => void;
    completeIntegrationImport: (args?: (Partial<{
        type: string;
        control: "Readwise Card" | "Readwise settings" | "Readwise import list" | "Calendar Setting";
    } & {
        time: number;
        done: number;
        total: number;
    }> & {
        page?: keyof import("@affine/track").Events;
        segment?: string;
        module?: string;
        control?: string;
    }) | undefined) => void;
};
//# sourceMappingURL=track.d.ts.map