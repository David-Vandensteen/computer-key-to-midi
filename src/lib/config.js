import fs from 'fs';
import YAML from 'yaml';

export default () => {
  const configFile = fs.readFileSync('src/model/mcc-1/config/default-fr.yaml', 'utf8');
  return YAML.parse(configFile);
};
