import { readFileSync, existsSync } from 'fs';
import { parse } from 'yaml';
import { log } from '#src/lib/log';
import appRootPath from 'app-root-path';

const { resolve } = appRootPath;

const getFromFile = (file) => {
  if (existsSync(file)) {
    const config = parse(readFileSync(file, 'utf8'));
    log.info('config file found :', file);
    return config;
  }
  log.error(file, 'not found');
  return undefined;
};

export default class Config {
  static get(configPaths) {
    log.title('Loading config file...');

    const processedConfigPaths = Array.isArray(configPaths) ? configPaths : [configPaths];

    const foundPath = processedConfigPaths.find((path) => {
      if (existsSync(path)) return true;
      if (existsSync(resolve(path))) return true;
      return false;
    });

    if (foundPath) return getFromFile(foundPath);

    throw new Error('No config file found');
  }
}

export { Config };
