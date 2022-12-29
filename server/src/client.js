import { rMidiClient } from 'remote-midi';

const client = rMidiClient({ host: '127.0.0.1', port: 7070 });
client
  .start()
  .send('cc', {
    controller: 40,
    value: 64,
  });
