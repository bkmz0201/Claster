import type { IdentifierValue } from './types';
export declare class RecursionLimitError extends Error {
    constructor();
}
export declare class CircularDependencyError extends Error {
    readonly dependencyStack: IdentifierValue[];
    constructor(dependencyStack: IdentifierValue[]);
}
export declare class ComponentNotFoundError extends Error {
    readonly identifier: IdentifierValue;
    constructor(identifier: IdentifierValue);
}
export declare class MissingDependencyError extends Error {
    readonly from: IdentifierValue;
    readonly target: IdentifierValue;
    readonly dependencyStack: IdentifierValue[];
    constructor(from: IdentifierValue, target: IdentifierValue, dependencyStack: IdentifierValue[]);
}
export declare class DuplicateDefinitionError extends Error {
    readonly identifier: IdentifierValue;
    constructor(identifier: IdentifierValue);
}
//# sourceMappingURL=error.d.ts.map