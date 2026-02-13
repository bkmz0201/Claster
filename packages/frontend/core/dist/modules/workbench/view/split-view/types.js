export const allowedSplitViewEntityTypes = new Set(['doc', 'collection', 'tag']);
export const inferToFromEntity = (entity) => {
    if (entity.type === 'doc') {
        return `/${entity.id}`;
    }
    else if (entity.type === 'collection') {
        return `/collection/${entity.id}`;
    }
    else if (entity.type === 'tag') {
        return `/tag/${entity.id}`;
    }
    return null;
};
//# sourceMappingURL=types.js.map