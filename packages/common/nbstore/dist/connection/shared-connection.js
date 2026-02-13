const CONNECTIONS = new Map();
export function share(conn) {
    if (!conn.shareId) {
        throw new Error(`Connection ${conn.constructor.name} is not shareable.\nIf you want to make it shareable, please override [shareId].`);
    }
    const existing = CONNECTIONS.get(conn.shareId);
    if (existing) {
        return existing;
    }
    CONNECTIONS.set(conn.shareId, conn);
    return conn;
}
//# sourceMappingURL=shared-connection.js.map