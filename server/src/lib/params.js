import arg from 'arg';

const { log } = console;

const help = () => {
  log('');
  log('');
  log('CMD', '[options]');
  log('');
  log('     Required options:');
  log('');
  log('   -i    --id                  -- midi interface id');
  log('');
  log('     Extra options:');
  log('');
  log('   --list     -l               -- show available midi interface');
  log('   --help     -h               -- show help');
  process.exit(0);
};

class Params {
  constructor() {
    this.args = arg({
      '--id': Number,
      '--list': Boolean,
      '--help': Boolean,

      // Aliases
      '-i': '--id',
      '-l': '--list',
      '-h': '--help',
    });
  }

  get id() {
    return this.args['--id'];
  }

  get list() {
    return this.args['--list'];
  }

  get help() {
    return this.args['--help'];
  }
}

const params = new Params();

export default params;
export { params };
export { help };
