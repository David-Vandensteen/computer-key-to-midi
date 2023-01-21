import { Config } from '#src/lib/config';

export default class ApplicationConfigService {
  static get({ applicationConfigFile, argService }) {
    argService.checkArgumentsAndHelp();
    const applicationConfig = Config.get(applicationConfigFile);
    const cliConfig = (argService.mode === 'master')
      ? argService.masterConfig
      : argService.slaveConfig;

    const config = {
      mode: argService.mode,
      ...cliConfig,
      ...applicationConfig,
    };
    return config;
  }
}

export { ApplicationConfigService };
