import appRootPath from 'app-root-path';
import { readFileSync, existsSync } from 'fs';
import { parse } from 'yaml';
import { log } from '#src/lib/log';

const { resolve } = appRootPath;

const getConfig = (file) => {
  if (existsSync(file)) {
    const config = readFileSync(file, 'utf8');
    log.info('config file found :', file);
    log.debug('');
    return parse(config);
  }
  log.error(file, 'not found');
  return false;
};

export default (file) => {
  log.title('load config file');
  if (existsSync(file)) return getConfig(file);
  log.info(file, 'not found... try to find a available config');

  if (existsSync(resolve('dist/mcc.yaml'))) return getConfig(resolve('dist/mcc.yaml'));
  if (existsSync(resolve('src/model/mcc-1/config/default-fr.yaml'))) return getConfig(resolve('src/model/mcc-1/config/default-fr.yaml'));
  throw new Error('config was not found');
};
