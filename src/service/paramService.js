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
  log('');
  log('     Extra options:');
  log('');
  log('   -i    --interface-in        -- midi in interface name');
  log('   --list     -l               -- show available midi interfaces');
  log('   --help                      -- show help');
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
      '--list': Boolean,
      '--help': Boolean,

      // Aliases
      '-i': '--interface-in',
      '-o': '--interface-out',
      '-l': '--list',
      '-h': '--host',
      '-p': '--port',
      '-m': '--mode',
    });
  }

  get mode() { return this.args['--mode']; }

  get host() { return this.args['--host']; }

  get port() { return this.args['--port']; }

  get interfaceIn() { return this.args['--interface-in']; }

  get interfaceOut() { return this.args['--interface-out']; }

  get list() { return this.args['--list']; }

  get help() { return this.args['--help']; }
}

const paramService = new ParamService();

export default paramService;
export { paramService };
export { help };
