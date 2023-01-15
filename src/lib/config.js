import { readFileSync, existsSync } from 'fs';
import YAML from 'yaml';

const { log } = console;

export default (file) => {
  let configFile = file;
  if (!existsSync(file) || file === undefined) {
    log('no config provided, try to load a fallback config mcc.yaml');
    configFile = 'mcc.yaml';
    if (!existsSync(configFile)) {
      configFile = 'src/model/mcc-1/config/default-fr.yaml';
      log('mcc.yaml config was not found, try to load', configFile);
    }
  }
  if (!existsSync(configFile)) throw new Error(configFile, 'not found');
  const config = readFileSync(configFile, 'utf8');
  return YAML.parse(config);
};
