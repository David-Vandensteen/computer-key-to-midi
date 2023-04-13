import { ConfigReader } from '#src/lib/configReader';

export default class ApplicationConfigService {
  static get(appConfigFiles) {
    return {
      defaultApplicationConfigFiles: appConfigFiles,
      ...ConfigReader.get(appConfigFiles),
    };
  }
}

export { ApplicationConfigService };
