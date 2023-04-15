import YAMLReader from '#src/lib/YAMLReader';

export default class ApplicationConfigService {
  static get(appConfigFiles) {
    return {
      defaultApplicationConfigFiles: appConfigFiles,
      ...YAMLReader(appConfigFiles[0], { fallBack: appConfigFiles }),
    };
  }
}

export { ApplicationConfigService };
