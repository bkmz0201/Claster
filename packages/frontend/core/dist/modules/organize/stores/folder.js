import { Store } from '@toeverything/infra';
export class FolderStore extends Store {
    constructor(dbService) {
        super();
        this.dbService = dbService;
    }
    watchNodeInfo(nodeId) {
        return this.dbService.db.folders.get$(nodeId);
    }
    watchNodeChildren(parentId) {
        return this.dbService.db.folders.find$({
            parentId: parentId,
        });
    }
    watchIsLoading() {
        return this.dbService.db.folders.isLoading$;
    }
    isAncestor(childId, ancestorId) {
        if (childId === ancestorId) {
            return false;
        }
        const history = new Set([childId]);
        let current = childId;
        while (current) {
            const info = this.dbService.db.folders.get(current);
            if (info === null || !info.parentId) {
                return false;
            }
            current = info.parentId;
            if (history.has(current)) {
                return false; // loop detected
            }
            history.add(current);
            if (current === ancestorId) {
                return true;
            }
        }
        return false;
    }
    createLink(parentId, type, nodeId, index) {
        const parent = this.dbService.db.folders.get(parentId);
        if (parent === null || parent.type !== 'folder') {
            throw new Error('Parent folder not found');
        }
        this.dbService.db.folders.create({
            parentId,
            type,
            data: nodeId,
            index: index,
        });
    }
    renameNode(nodeId, name) {
        const node = this.dbService.db.folders.get(nodeId);
        if (node === null) {
            throw new Error('Node not found');
        }
        if (node.type !== 'folder') {
            throw new Error('Cannot rename non-folder node');
        }
        this.dbService.db.folders.update(nodeId, {
            data: name,
        });
    }
    createFolder(parentId, name, index) {
        if (parentId) {
            const parent = this.dbService.db.folders.get(parentId);
            if (parent === null || parent.type !== 'folder') {
                throw new Error('Parent folder not found');
            }
        }
        return this.dbService.db.folders.create({
            parentId: parentId,
            type: 'folder',
            data: name,
            index: index,
        }).id;
    }
    removeFolder(folderId) {
        const info = this.dbService.db.folders.get(folderId);
        if (info === null || info.type !== 'folder') {
            throw new Error('Folder not found');
        }
        const stack = [info];
        while (stack.length > 0) {
            const current = stack.pop();
            if (!current) {
                continue;
            }
            if (current.type !== 'folder') {
                this.dbService.db.folders.delete(current.id);
            }
            else {
                const children = this.dbService.db.folders.find({
                    parentId: current.id,
                });
                stack.push(...children);
                this.dbService.db.folders.delete(current.id);
            }
        }
    }
    removeLink(linkId) {
        const link = this.dbService.db.folders.get(linkId);
        if (link === null || link.type === 'folder') {
            throw new Error('Link not found');
        }
        this.dbService.db.folders.delete(linkId);
    }
    moveNode(nodeId, parentId, index) {
        const node = this.dbService.db.folders.get(nodeId);
        if (node === null) {
            throw new Error('Node not found');
        }
        if (parentId) {
            if (nodeId === parentId) {
                throw new Error('Cannot move a node to itself');
            }
            if (this.isAncestor(parentId, nodeId)) {
                throw new Error('Cannot move a node to its descendant');
            }
            const parent = this.dbService.db.folders.get(parentId);
            if (parent === null || parent.type !== 'folder') {
                throw new Error('Parent folder not found');
            }
        }
        else {
            if (node.type !== 'folder') {
                throw new Error('Root node can only have folders');
            }
        }
        this.dbService.db.folders.update(nodeId, {
            parentId,
            index,
        });
    }
}
//# sourceMappingURL=folder.js.map