import params from '#src/lib/params';
import { midiKey } from '#src/lib/midikeyout';
import config from '#src/config/default-fr';

const { log } = console;

if (params.list) {
  log(midiKey.getAvailableInterfacesName());
  process.exit(0);
} else {
  midiKey.register({ portId: params.id, config })
    .start();
}
