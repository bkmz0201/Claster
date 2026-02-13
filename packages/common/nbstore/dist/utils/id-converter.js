import { applyUpdate, Doc as YDoc, } from 'yjs';
export async function getIdConverter(storage, spaceId) {
    const oldIdToNewId = { [spaceId]: spaceId };
    const newIdToOldId = { [spaceId]: spaceId };
    const rootDocBuffer = await storage.getDocBuffer(spaceId);
    if (rootDocBuffer) {
        const ydoc = new YDoc({
            guid: spaceId,
        });
        applyUpdate(ydoc, rootDocBuffer);
        // get all ids from rootDoc.meta.pages.[*].id, trust this id as normalized id
        const normalizedDocIds = ydoc.getMap('meta')?.get('pages')
            ?.map(i => i.get('id'))
            .filter(i => !!i);
        const spaces = ydoc.getMap('spaces');
        for (const pageId of normalizedDocIds ?? []) {
            const subdoc = spaces?.get(pageId);
            if (subdoc && subdoc instanceof YDoc) {
                oldIdToNewId[subdoc.guid] = pageId;
                newIdToOldId[pageId] = subdoc.guid;
            }
        }
    }
    return {
        newIdToOldId(newId) {
            if (newId.startsWith(`db$`)) {
                // db$docId -> db$${spaceId}$docId
                return newId.replace(`db$`, `db$${spaceId}$`);
            }
            if (newId.startsWith(`userdata$`)) {
                // userdata$userId$docId -> userdata$userId$spaceId$docId
                return newId.replace(new RegExp(`^(userdata\\$[\\w-]+)\\$([^\\$]+)`), (_, p1, p2) => `${p1}$${spaceId}$${p2}`);
            }
            return newIdToOldId[newId] ?? newId;
        },
        oldIdToNewId(oldId) {
            // db$${spaceId}$docId -> db$docId
            if (oldId.startsWith(`db$${spaceId}$`)) {
                return oldId.replace(`db$${spaceId}$`, `db$`);
            }
            // userdata$userId$spaceId$docId -> userdata$userId$docId
            if (oldId.match(new RegExp(`^userdata\\$[\\w-]+\\$${spaceId}\\$`))) {
                return oldId.replace(`$${spaceId}$`, '$');
            }
            return oldIdToNewId[oldId] ?? oldId;
        },
    };
}
//# sourceMappingURL=id-converter.js.map