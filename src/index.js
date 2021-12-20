import MidiKey from '#src/lib/midikeyout';
import config from '#src/config/default-fr';

const midiKey = new MidiKey();

midiKey
  .register({ portId: 1, config })
  .start();
  // .test();
