import chalk from 'chalk';
import { identity } from 'lodash-es';
export const newLineSeparator = /\r\n|[\n\r\x85\u2028\u2029]/g;
export class Logger {
    constructor(tag = '') {
        this.tag = tag;
        this.log = this.getLineLogger(console.log.bind(console));
        this.info = this.getLineLogger(console.info.bind(console), chalk.blue);
        this.warn = this.getLineLogger(console.warn.bind(console), chalk.bgHex('#322b08').hex('#fadea6'));
        this.error = this.getLineLogger(console.error.bind(console), chalk.bgHex('#250201').hex('#ef8784'));
        this.success = this.getLineLogger(console.log.bind(console), chalk.green);
    }
    getLineLogger(logLine, color = identity) {
        return (...args) => {
            args.forEach(arg => {
                arg
                    .toString()
                    .split(newLineSeparator)
                    .forEach(line => {
                    if (line.length !== 0) {
                        if (this.tag) {
                            logLine(color(`[${this.tag}] ${line}`));
                        }
                        else {
                            logLine(color(line));
                        }
                    }
                });
            });
        };
    }
}
//# sourceMappingURL=logger.js.map