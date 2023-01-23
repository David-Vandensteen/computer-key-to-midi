import { Config } from '#src/lib/config';

export default class ApplicationConfigService {
  static get({ applicationConfigFile, argService }) {
    argService.checkArgumentsAndHelp();
    const applicationConfig = Config.get(applicationConfigFile);

    const cliConfig = (argService.mode === 'master')
      ? argService.masterConfig
      : argService.slaveConfig;

    // if no key mapping config is provided from cli, fallback to a default config
    if (argService.mode === 'slave' && !argService.config) {
      const keyMappingConfigFile = Config.getAvailableFile(
        applicationConfig.defaultKeyMappingFiles,
      );
      if (!cliConfig.keyMappingConfigFile) cliConfig.keyMappingConfigFile = keyMappingConfigFile;
    }

    const config = {
      mode: argService.mode,
      ...cliConfig,
      ...applicationConfig,
    };
    return config;
  }
}

export { ApplicationConfigService };
