import arg from 'arg';

const { log } = console;

const help = () => {
  log('');
  log('');
  log('CMD', '[options]');
  log('');
  log('     Required options:');
  log('');
  log('   -m    --mode                -- [server\\client]');
  log('   -i    --id                  -- midi interface id (needed on server mode)');
  log('   -h    --host                -- host');
  log('   -p    --port                -- port');
  log('');
  log('     Extra options:');
  log('');
  log('   --list     -l               -- show available midi interface');
  log('   --help                      -- show help');
  process.exit(0);
};

class Params {
  constructor() {
    this.args = arg({
      '--id': Number,
      '--mode': String,
      '--host': String,
      '--port': Number,
      '--list': Boolean,
      '--help': Boolean,

      // Aliases
      '-i': '--id',
      '-l': '--list',
      '-h': '--host',
      '-p': '--port',
      '-m': '--mode',
    });
  }

  get mode() { return this.args['--mode']; }

  get host() { return this.args['--host']; }

  get port() { return this.args['--port']; }

  get id() { return this.args['--id']; }

  get list() { return this.args['--list']; }

  get help() { return this.args['--help']; }
}

const params = new Params();

export default params;
export { params };
export { help };
