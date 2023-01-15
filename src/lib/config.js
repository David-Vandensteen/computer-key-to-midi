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
  if (getConfig(file)) return getConfig(file);
  if (getConfig(resolve('dist/mcc.yaml'))) return getConfig(resolve('dist/mcc.yaml'));
  if (getConfig(resolve('src/model/mcc-1/config/default-fr.yaml'))) return getConfig(resolve('src/model/mcc-1/config/default-fr.yaml'));
  return new Error('config was not found');
  /*
  let configFile = file;

  if (!existsSync(configFile) || configFile === undefined) {
    log('config file not exist or is undefined', configFile);
  } else {
    const config = readFileSync(configFile, 'utf8');
    return YAML.parse(config);
  }

  configFile = resolve('dist/mcc.yaml');

  if (!existsSync(configFile) || configFile === undefined) {
    log('config file not exist or is undefined', configFile);
  } else {
    const config = readFileSync(configFile, 'utf8');
    return YAML.parse(config);
  }

  configFile = resolve('src/model/mcc-1/config/default-fr.yaml');

  if (!existsSync(configFile) || configFile === undefined) {
    log('config file not exist or is undefined', configFile);
  } else {
    const config = readFileSync(configFile, 'utf8');
    return YAML.parse(config);
  }
  return new Error('config not found');
  */
};
