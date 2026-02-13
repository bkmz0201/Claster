import { readFileSync } from 'node:fs';
import { once } from 'lodash-es';
import { format } from 'prettier';
import { ProjectRoot } from './path';
const readConfig = once(() => {
    const path = ProjectRoot.join('.prettierrc').value;
    const config = JSON.parse(readFileSync(path, 'utf-8'));
    return config;
});
export function prettier(content, parser) {
    const config = readConfig();
    return format(content, { parser, ...config });
}
//# sourceMappingURL=format.js.map