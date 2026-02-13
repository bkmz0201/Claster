export function uint8ArrayToBase64(array) {
    return new Promise(resolve => {
        // Create a blob from the Uint8Array
        const blob = new Blob([array]);
        const reader = new FileReader();
        reader.onload = function () {
            const dataUrl = reader.result;
            if (!dataUrl) {
                resolve('');
                return;
            }
            // The result includes the `data:` URL prefix and the MIME type. We only want the Base64 data
            const base64 = dataUrl.split(',')[1];
            resolve(base64);
        };
        reader.readAsDataURL(blob);
    });
}
export function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const binaryArray = [...binaryString].map(function (char) {
        return char.charCodeAt(0);
    });
    return new Uint8Array(binaryArray);
}
//# sourceMappingURL=base64.js.map