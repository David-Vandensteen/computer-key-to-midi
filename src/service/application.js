import { MasterRunnerService } from '#src/service/masterRunner';
import { SlaveRunnerService } from '#src/service/slaveRunner';

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
      const { keyMappingConfig } = config;
      const slave = new SlaveRunnerService({
        host,
        port,
        keyMappingConfig,
      });
      slave.start();
    }
  }
}

export { ApplicationService };
