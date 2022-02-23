import params from '#src/lib/params';
import MidiKey from '#src/lib/midikeyout';
import config from '#src/config/default-fr';

const { log } = console;

const midiKey = new MidiKey();

if (params.list) {
  log(midiKey.getAvailableInterfacesName());
  process.exit(0);
} else {
  midiKey.register({ portId: params.id, config }).start();
}
