import { fileTypeFromBuffer } from 'file-type';
export async function resourceUrlToBlob(url) {
    const buffer = await fetch(url).then(response => response.arrayBuffer());
    if (!buffer) {
        console.warn('Could not get blob');
        return;
    }
    try {
        const type = await fileTypeFromBuffer(buffer);
        if (!type) {
            return;
        }
        const blob = new Blob([buffer], { type: type.mime });
        return blob;
    }
    catch (error) {
        console.error('Error converting resource to blob', error);
    }
    return;
}
export async function downloadBlob(blob, filename) {
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
}
export function downloadFile(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    a.click();
}
export async function downloadResourceWithUrl(url, filename) {
    // given input url may not have correct mime type
    const blob = await resourceUrlToBlob(url);
    if (!blob)
        return;
    await downloadBlob(blob, filename);
}
//# sourceMappingURL=resource.js.map