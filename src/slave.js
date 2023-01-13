import { rMidiClient } from 'remote-midi';

const slave = rMidiClient({ host: '127.0.0.1', port: 7070 });
slave
  .start()
  .send('cc', {
    controller: 40,
    value: 64,
  });
