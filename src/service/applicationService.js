import { MasterRunnerService } from '#src/service/masterRunnerService';
import { SlaveRunnerService } from '#src/service/slaveRunnerService';
import { Config } from '#src/lib/config';

export default class ApplicationService {
  static run(config) {
    if (!config?.mode ?? !config) throw new Error('invalid configuration');
    const { host, port } = config;

    if (config.mode === 'master') {
      const { midiOutputDeviceName, midiInputDeviceName } = config;
      const master = new MasterRunnerService({
        host,
        port,
        midiInputDeviceName,
        midiOutputDeviceName,
      });
      master.start();
    }

    if (config.mode === 'slave') {
      const { keyMappingConfigFile } = config;
      const keyMappingConfig = Config.get(keyMappingConfigFile);
      const slave = new SlaveRunnerService({
        host,
        port,
        keyMappingConfig,
      });
      slave.start();
    }

    if (config.mode === 'local') {
      const { keyMappingConfigFile } = config;
      const keyMappingConfig = Config.get(keyMappingConfigFile);
      const local =
    }

  }
}

export { ApplicationService };
