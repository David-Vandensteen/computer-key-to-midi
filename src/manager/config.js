import { argService } from '#src/service/arg';
import { ApplicationConfigService } from '#src/service/applicationConfig';
import YAMLLoader from '#src/lib/YAMLLoader';

export default class ConfigManager {
  static get(applicationConfigFiles) {
    if (!applicationConfigFiles) throw new Error('missing application config file');
    argService.checkArgumentsAndHelp();

    const applicationConfig = ApplicationConfigService.get(applicationConfigFiles);
    const cliConfig = argService.getConfig();

    const config = { ...applicationConfig, ...cliConfig };
    const { keyMappingConfigFile, defaultKeyMappingFiles } = config;

    if (config.mode === 'slave') {
      config.keyMappingConfig = (keyMappingConfigFile)
        ? YAMLLoader(keyMappingConfigFile)
        : YAMLLoader('', { fallBack: defaultKeyMappingFiles });
    }

    console.log('config', config);
    return config;
  }
}

export { ConfigManager };
