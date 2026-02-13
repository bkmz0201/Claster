export declare const dataValidators: {
    PrimaryKeyShouldExist: {
        validate(table: import("..").Table<any>, data: any): void;
    };
    PrimaryKeyShouldNotBeUpdated: {
        validate(table: import("..").Table<any>, data: any): void;
    };
    DataTypeShouldMatch: {
        validate(table: import("..").Table<any>, data: any): void;
    };
    DataTypeShouldExactlyMatch: {
        validate(table: import("..").Table<any>, data: any): void;
    };
};
export declare const createEntityDataValidators: Pick<{
    PrimaryKeyShouldExist: {
        validate(table: import("..").Table<any>, data: any): void;
    };
    PrimaryKeyShouldNotBeUpdated: {
        validate(table: import("..").Table<any>, data: any): void;
    };
    DataTypeShouldMatch: {
        validate(table: import("..").Table<any>, data: any): void;
    };
    DataTypeShouldExactlyMatch: {
        validate(table: import("..").Table<any>, data: any): void;
    };
}, "PrimaryKeyShouldExist" | "PrimaryKeyShouldNotBeUpdated" | "DataTypeShouldMatch" | "DataTypeShouldExactlyMatch">;
export declare const updateEntityDataValidators: Pick<{
    PrimaryKeyShouldExist: {
        validate(table: import("..").Table<any>, data: any): void;
    };
    PrimaryKeyShouldNotBeUpdated: {
        validate(table: import("..").Table<any>, data: any): void;
    };
    DataTypeShouldMatch: {
        validate(table: import("..").Table<any>, data: any): void;
    };
    DataTypeShouldExactlyMatch: {
        validate(table: import("..").Table<any>, data: any): void;
    };
}, "PrimaryKeyShouldExist" | "PrimaryKeyShouldNotBeUpdated" | "DataTypeShouldMatch" | "DataTypeShouldExactlyMatch">;
//# sourceMappingURL=data.d.ts.map