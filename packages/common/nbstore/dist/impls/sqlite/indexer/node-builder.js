import {} from '../../../storage';
import { highlighter } from '../../idb/indexer/highlighter';
import {} from '../db';
import { tryParseArrayField } from './utils';
export async function createNode(connection, table, id, score, options, query) {
    const node = { id, score };
    if (options.fields) {
        const fields = {};
        for (const field of options.fields) {
            const text = await connection.apis.ftsGetDocument(`${table}:${field}`, id);
            if (text !== null) {
                const parsed = tryParseArrayField(text);
                if (parsed) {
                    fields[field] = parsed;
                }
                else {
                    fields[field] = text;
                }
            }
            else {
                fields[field] = '';
            }
        }
        node.fields = fields;
    }
    if (options.highlights) {
        const highlights = {};
        const queryStrings = extractQueryStrings(query);
        for (const h of options.highlights) {
            const text = await connection.apis.ftsGetDocument(`${table}:${h.field}`, id);
            if (text) {
                const queryString = Array.from(queryStrings).join(' ');
                const matches = await connection.apis.ftsGetMatches(`${table}:${h.field}`, id, queryString);
                if (matches.length > 0) {
                    const highlighted = highlighter(text, h.before, h.end, matches.map(m => [m.start, m.end]), {
                        maxPrefix: 20,
                        maxLength: 50,
                    });
                    highlights[h.field] = highlighted ? [highlighted] : [];
                }
                else {
                    highlights[h.field] = [];
                }
            }
            else {
                highlights[h.field] = [];
            }
        }
        node.highlights = highlights;
    }
    return node;
}
function extractQueryStrings(query) {
    const terms = new Set();
    if (query.type === 'match') {
        terms.add(query.match);
    }
    else if (query.type === 'boolean') {
        for (const q of query.queries) {
            const subTerms = extractQueryStrings(q);
            for (const term of subTerms) {
                terms.add(term);
            }
        }
    }
    else if (query.type === 'boost') {
        const subTerms = extractQueryStrings(query.query);
        for (const term of subTerms) {
            terms.add(term);
        }
    }
    return terms;
}
//# sourceMappingURL=node-builder.js.map