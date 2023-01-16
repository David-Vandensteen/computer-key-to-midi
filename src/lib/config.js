import appRootPath from 'app-root-path';
import { readFileSync, existsSync } from 'fs';
import YAML from 'yaml';

const { log } = console;
const { resolve } = appRootPath;

const getConfig = (file) => {
  if (existsSync(file)) {
    const config = readFileSync(file, 'utf8');
    log('config file found :', file);
    return YAML.parse(config);
  }
  log(file, 'not found');
  return false;
};

export default (file) => {
  if (existsSync(file)) return getConfig(file);
  log(file, 'not found... try to find a available config');

  if (existsSync(resolve('dist/mcc.yaml'))) return getConfig(resolve('dist/mcc.yaml'));
  if (existsSync(resolve('src/model/mcc-1/config/default-fr.yaml'))) return getConfig(resolve('src/model/mcc-1/config/default-fr.yaml'));
  throw new Error('config was not found');
};
