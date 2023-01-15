import { readFileSync, existsSync } from 'fs';
import YAML from 'yaml';

const { log } = console;

export default (file) => {
  let configFile = file;
  if (!existsSync(file) || file === undefined) {
    log('no config provided, try to load a fallback config mcc.yaml');
    configFile = 'mcc.yaml';
  }
  const config = readFileSync(configFile, 'utf8');
  return YAML.parse(config);
};
