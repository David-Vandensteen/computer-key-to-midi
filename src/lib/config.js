import fs from 'fs';
import YAML from 'yaml';

export default (file) => {
  const configFile = fs.readFileSync(file, 'utf8');
  return YAML.parse(configFile);
};
