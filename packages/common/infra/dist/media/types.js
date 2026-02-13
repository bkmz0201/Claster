export const attachmentBlockAudioMediaKey = (media) => {
    return `${media.workspaceId}/${media.docId}/${media.blockId}/${media.blobId}`;
};
export const parseAudioMediaKey = (key) => {
    const [workspaceId, docId, blockId, blobId] = key.split('/');
    return {
        workspaceId,
        docId,
        blockId,
        blobId,
    };
};
//# sourceMappingURL=types.js.map