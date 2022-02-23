import arg from 'arg';

const { log } = console;

class Params {
  constructor() {
    this.args = arg({
      '--id': Number,
      '--list': Boolean,

      // Aliases
      '-i': '--id',
      '-l': '--list',
    });

    if (process.argv.length <= 1) Params.help();
  }

  static help() {
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
  }

  get id() {
    return this.args['--id'];
  }

  get list() {
    return this.args['--list'];
  }
}

export default new Params();