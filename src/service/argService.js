import arg from 'arg';
import { getInputs, getOutputs } from 'remote-midi';
import { log } from '#src/lib/log';
import {
  name,
  author,
  version,
  license,
} from '#src/lib/package';

const showHelp = () => {
  log('');
  log('');
  log(name, '[options]');
  log('');
  log('     Required options:');
  log('');
  log('   -m    --mode                -- [master\\slave]');
  log('   -o    --interface-out        -- midi out interface name (needed on server mode)');
  log('   -h    --host                -- host');
  log('   -p    --port                -- port');
  log('   -c    --config              -- config yaml file with midi mapping definition');
  log('');
  log('     Extra options:');
  log('');
  log('   -i    --interface-in        -- midi in interface name');
  log('   --list     -l               -- show available midi interfaces');
  log('   --help                      -- show help');
  log('');
  log('master example :');
  log(name, '-m master -i mcc-in -o mcc-out -h 0.0.0.0 -p 7070');
  log('');
  log('slave example :');
  log(name, '-m slave -h 192.168.0.1 -p 7070');
  log('');
  log('version', version, author, license);
  process.exit(0);
};

class ArgService {
  constructor() {
    this.args = arg({
      '--interface-in': String,
      '--interface-out': String,
      '--mode': String,
      '--host': String,
      '--port': Number,
      '--config': String,
      '--list': Boolean,
      '--help': Boolean,

      // Aliases
      '-i': '--interface-in',
      '-o': '--interface-out',
      '-l': '--list',
      '-h': '--host',
      '-p': '--port',
      '-c': '--config',
      '-m': '--mode',
    });
  }

  get mode() { return this.args['--mode']; }

  get host() { return this.args['--host']; }

  get port() { return this.args['--port']; }

  get interfaceIn() { return this.args['--interface-in']; }

  get interfaceOut() { return this.args['--interface-out']; }

  get config() { return this.args['--config']; }

  get list() { return this.args['--list']; }

  get help() { return this.args['--help']; }

  checkArgumentsAndHelp() {
    if (this.list) {
      log.title('show midi device :');
      log.info('midi inputs :', getInputs().toString());
      log.info('midi outputs :', getOutputs().toString());
      process.exit(0);
    }
    if (!this.mode || !this.host || !this.port) showHelp();
    if (this.mode !== 'master' && this.mode !== 'slave') showHelp();
    if (this.mode === 'master' && !this.interfaceOut) showHelp();
  }
}

const argService = new ArgService();

argService.masterConfig = {
  host: argService.host,
  port: argService.port,
  midiOutputDeviceName: argService.interfaceOut,
  midiInputDeviceName: argService.interfaceIn,
};
// TODO : key config
argService.slaveConfig = {
  host: argService.host,
  port: argService.port,
};

export default argService;
export { argService };
