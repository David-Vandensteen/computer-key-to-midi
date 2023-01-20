import { MasterRunnerService } from '#src/service/masterRunnerService';
import { SlaveRunnerService } from '#src/service/slaveRunnerService';
import getConfig from '#src/lib/config'; // TODO : rename getKeyConfig ?
// TODO : handle arg configKeyFile

export default class ApplicationService {
  static run(argService) {
    argService.checkArgumentsAndHelp();
    if (argService.mode === 'master') ApplicationService.runMaster(argService.masterConfig);
    if (argService.mode === 'slave') ApplicationService.runSlave(argService.slaveConfig);
  }

  static runSlave({ host, port }) {
    const keyConfig = getConfig(['src/model/mcc-1/config/default-fr.yaml', 'dist/mcc.yaml']);
    const slave = new SlaveRunnerService({ host, port, keyConfig });
    slave.start();
  }

  static runMaster({
    host, port, midiOutputDeviceName, midiInputDeviceName,
  }) {
    const master = new MasterRunnerService({
      host,
      port,
      midiOutputDeviceName,
      midiInputDeviceName,
    });
    master.start();
  }
}

export { ApplicationService };
