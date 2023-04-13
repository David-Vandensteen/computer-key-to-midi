import { argService } from '#src/service/arg';
import { ApplicationConfigService } from '#src/service/applicationConfig';
import { ConfigReader } from '#src/lib/configReader';

export default class ConfigController {
  static get(applicationConfigFiles) {
    if (!applicationConfigFiles) throw new Error('missing application config file');
    argService.checkArgumentsAndHelp();

    const applicationConfig = ApplicationConfigService.get(applicationConfigFiles);

    const cliConfig = argService.getConfig();

    const config = { ...applicationConfig, ...cliConfig };

    if (config.mode === 'slave') {
      config.keyMappingConfig = (config.keyMappingConfigFile)
        ? ConfigReader.get(config.keyMappingConfigFile)
        : ConfigReader.get(config.defaultKeyMappingFiles);
    }

    console.log('config', config);
    return config;
  }
}

export { ConfigController };
