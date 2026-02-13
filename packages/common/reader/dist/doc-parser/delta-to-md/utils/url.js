export const encodeLink = (link) => encodeURI(link)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/(\?|&)response-content-disposition=attachment.*$/, '');
//# sourceMappingURL=url.js.map