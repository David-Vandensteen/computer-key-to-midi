import menu from '#src/lib/menu';
import MidiKey from '#src/lib/midikeyout';
import config from '#src/config/default-fr';

const midiKey = new MidiKey();

// midiKey.register({ config }).start();

/*
menu(midiKey.getAvailableInterfacesName())
  .then((response) => {
    console.log('response : ', response);
    midiKey
      .register({ portName: response.portName, config })
      .start();
  });
  */

const test = () => {
  setTimeout(() => {
    console.log('hello promise !');
  })
}