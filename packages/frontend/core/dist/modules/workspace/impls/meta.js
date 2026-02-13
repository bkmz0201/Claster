import { createYProxy, } from '@blocksuite/affine/store';
import { Subject } from 'rxjs';
export class WorkspaceMetaImpl {
    get avatar() {
        return this._proxy.avatar;
    }
    setAvatar(avatar) {
        this._doc.transact(() => {
            this._proxy.avatar = avatar;
        }, this._doc.clientID);
    }
    get name() {
        return this._proxy.name;
    }
    setName(name) {
        this._doc.transact(() => {
            this._proxy.name = name;
        }, this._doc.clientID);
    }
    get properties() {
        const meta = this._proxy.properties;
        if (!meta) {
            return {
                tags: {
                    options: [],
                },
            };
        }
        return meta;
    }
    setProperties(meta) {
        this._proxy.properties = meta;
        this.docMetaUpdated.next();
    }
    get docMetas() {
        if (!this._proxy.pages) {
            return [];
        }
        return this._proxy.pages;
    }
    get docs() {
        return this._proxy.pages;
    }
    get yDocs() {
        return this._yMap.get('pages');
    }
    constructor(doc) {
        /* eslint-disable rxjs/finnish */
        this.commonFieldsUpdated = new Subject();
        this.docMetaAdded = new Subject();
        this.docMetaRemoved = new Subject();
        this.docMetaUpdated = new Subject();
        /* eslint-enable rxjs/finnish */
        this._handleDocCollectionMetaEvents = (events) => {
            events.forEach(e => {
                const hasKey = (k) => e.target === this._yMap && e.changes.keys.has(k);
                if (e.target === this.yDocs ||
                    e.target.parent === this.yDocs ||
                    hasKey('pages')) {
                    this._handleDocMetaEvent();
                }
                if (hasKey('name') || hasKey('avatar')) {
                    this._handleCommonFieldsEvent();
                }
            });
        };
        this._id = 'meta';
        this._prevDocs = new Set();
        this._doc = doc;
        const map = doc.getMap(this._id);
        this._yMap = map;
        this._proxy = createYProxy(map);
        this._yMap.observeDeep(this._handleDocCollectionMetaEvents);
    }
    _handleCommonFieldsEvent() {
        this.commonFieldsUpdated.next();
    }
    _handleDocMetaEvent() {
        const { docMetas, _prevDocs } = this;
        const newDocs = new Set();
        docMetas.forEach(docMeta => {
            if (!_prevDocs.has(docMeta.id)) {
                this.docMetaAdded.next(docMeta.id);
            }
            newDocs.add(docMeta.id);
        });
        _prevDocs.forEach(prevDocId => {
            const isRemoved = newDocs.has(prevDocId) === false;
            if (isRemoved) {
                this.docMetaRemoved.next(prevDocId);
            }
        });
        this._prevDocs = newDocs;
        this.docMetaUpdated.next();
    }
    addDocMeta(doc, index) {
        this._doc.transact(() => {
            if (!this.docs) {
                return;
            }
            const docs = this.docs;
            if (index === undefined) {
                docs.push(doc);
            }
            else {
                docs.splice(index, 0, doc);
            }
        }, this._doc.clientID);
    }
    getDocMeta(id) {
        return this.docMetas.find(doc => doc.id === id);
    }
    initialize() {
        if (!this._proxy.pages) {
            this._proxy.pages = [];
        }
    }
    removeDocMeta(id) {
        // you cannot delete a doc if there's no doc
        if (!this.docs) {
            return;
        }
        const docMeta = this.docMetas;
        const index = docMeta.findIndex((doc) => id === doc.id);
        if (index === -1) {
            return;
        }
        this._doc.transact(() => {
            if (!this.docs) {
                return;
            }
            this.docs.splice(index, 1);
        }, this._doc.clientID);
    }
    setDocMeta(id, props) {
        const docs = this.docs ?? [];
        const index = docs.findIndex((doc) => id === doc.id);
        this._doc.transact(() => {
            if (!this.docs) {
                return;
            }
            if (index === -1)
                return;
            const doc = this.docs[index];
            Object.entries(props).forEach(([key, value]) => {
                doc[key] = value;
            });
        }, this._doc.clientID);
    }
}
//# sourceMappingURL=meta.js.map