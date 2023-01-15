import arg from 'arg';

const { log } = console;

const help = () => {
  log('');
  log('');
  log('mcc', '[options]');
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
  log('mcc -m master -i mcc-in -o mcc-out -h 0.0.0.0 -p 7070');
  log('');
  log('slave example :');
  log('mcc -m slave -h 192.168.0.1 -p 7070');
  process.exit(0);
};

class ParamService {
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
}

const paramService = new ParamService();

export default paramService;
export { paramService };
export { help };
