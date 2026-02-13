import { execSync, spawn as RawSpawn, } from 'node:child_process';
import { Logger } from './logger';
const children = new Set();
export function spawn(tag, cmd, options = {}) {
    cmd = typeof cmd === 'string' ? cmd.split(' ') : cmd;
    const isYarnSpawn = cmd[0] === 'yarn';
    const spawnOptions = {
        stdio: isYarnSpawn
            ? ['inherit', 'inherit', 'inherit']
            : ['inherit', 'pipe', 'pipe'],
        shell: true,
        ...options,
        env: { ...process.env, ...options.env },
    };
    const logger = new Logger(tag);
    logger.info(cmd.join(' '));
    const childProcess = RawSpawn(cmd[0], cmd.slice(1), spawnOptions);
    children.add(childProcess);
    const drain = (_code, signal) => {
        children.delete(childProcess);
        // don't run repeatedly if this is the error event
        if (signal === undefined) {
            childProcess.removeListener('exit', drain);
        }
    };
    childProcess.stdout?.on('data', chunk => {
        logger.log(chunk);
    });
    childProcess.stderr?.on('data', chunk => {
        logger.error(chunk);
    });
    childProcess.once('error', e => {
        logger.error(e.toString());
        children.delete(childProcess);
    });
    childProcess.once('exit', (code, signal) => {
        if (code !== 0) {
            logger.error('Finished with non-zero exit code.');
        }
        drain(code, signal);
    });
    return childProcess;
}
export function execAsync(tag, cmd, options) {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(tag, cmd, options);
        childProcess.once('error', e => {
            reject(e);
        });
        childProcess.once('exit', code => {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error(`Child process exits with non-zero code ${code}`));
            }
        });
    });
}
export function exec(tag, cmd, { silent } = { silent: false }) {
    const logger = new Logger(tag);
    !silent && logger.info(cmd);
    const result = execSync(cmd, { encoding: 'utf8' }).trim();
    !silent && logger.log(result);
    return result;
}
//# sourceMappingURL=process.js.map