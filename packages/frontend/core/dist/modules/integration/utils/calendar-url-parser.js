export const parseCalendarUrl = (_url) => {
    let url = _url;
    try {
        const urlObj = new URL(url);
        if (urlObj.protocol === 'webcal:') {
            urlObj.protocol = 'https';
        }
        url = urlObj.toString();
        return url;
    }
    catch (err) {
        console.error(err);
        throw new Error(`Invalid URL: "${url}"`);
    }
};
//# sourceMappingURL=calendar-url-parser.js.map