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

export default class ConfigReader {
  static getAvailableFile(configPaths) {
    const processedConfigPaths = Array.isArray(configPaths) ? configPaths : [configPaths];
    processedConfigPaths.map((configPath) => {
      processedConfigPaths.push(resolve(configPath));
      return configPath;
    });
    const foundPath = processedConfigPaths.find((path) => existsSync(path) === true);
    return foundPath;
  }

  static get(configPaths) {
    log.title('Loading config file...');
    const foundPath = ConfigReader.getAvailableFile(configPaths);
    if (foundPath) return getFromFile(foundPath);

    throw new Error('No config file found');
  }
}

export { ConfigReader };
