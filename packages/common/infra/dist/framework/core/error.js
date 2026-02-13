import { DEFAULT_VARIANT } from './consts';
export class RecursionLimitError extends Error {
    constructor() {
        super('Dynamic resolve recursion limit reached');
    }
}
export class CircularDependencyError extends Error {
    constructor(dependencyStack) {
        super(`A circular dependency was detected.\n` +
            stringifyDependencyStack(dependencyStack));
        this.dependencyStack = dependencyStack;
    }
}
export class ComponentNotFoundError extends Error {
    constructor(identifier) {
        super(`Component ${stringifyIdentifier(identifier)} not found in container`);
        this.identifier = identifier;
    }
}
export class MissingDependencyError extends Error {
    constructor(from, target, dependencyStack) {
        super(`Missing dependency ${stringifyIdentifier(target)} in creating ${stringifyIdentifier(from)}.\n${stringifyDependencyStack(dependencyStack)}`);
        this.from = from;
        this.target = target;
        this.dependencyStack = dependencyStack;
    }
}
export class DuplicateDefinitionError extends Error {
    constructor(identifier) {
        super(`${stringifyIdentifier(identifier)} already exists`);
        this.identifier = identifier;
    }
}
function stringifyIdentifier(identifier) {
    return `[${identifier.identifierName}]${identifier.variant !== DEFAULT_VARIANT ? `(${identifier.variant})` : ''}`;
}
function stringifyDependencyStack(dependencyStack) {
    return dependencyStack
        .map(identifier => `${stringifyIdentifier(identifier)}`)
        .join(' -> ');
}
//# sourceMappingURL=error.js.map