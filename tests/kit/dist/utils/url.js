export function getDocIdFromUrl(url) {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\/workspace\/([^/]+)\/([^/]+)\/?/);
    if (match && match[2]) {
        return match[2];
    }
    throw new Error('Failed to get doc id from url');
}
export function getCurrentDocIdFromUrl(page) {
    return getDocIdFromUrl(page.url());
}
export function getCurrentCollectionIdFromUrl(page) {
    const pathname = new URL(page.url()).pathname;
    const match = pathname.match(/\/workspace\/([^/]+)\/collection\/([^/]+)\/?/);
    if (match && match[2]) {
        return match[2];
    }
    throw new Error('Failed to get collection id from url');
}
//# sourceMappingURL=url.js.map