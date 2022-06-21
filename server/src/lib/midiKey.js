/* eslint-disable lines-between-class-members */
import easymidi from 'easymidi';

const { getInputs, getOutputs } = easymidi;

const { log } = console;

export default class MidiKey {
  #keyConfig;
  #input;
  #output;

  register({ inputName, outputName, keyConfig }) {
    log('register input :', inputName);
    log('register output :', outputName);

    this.#input = new easymidi.Input(inputName);
    this.#output = new easymidi.Output(outputName);
    this.#keyConfig = keyConfig;

    this.#input.on('cc', () => {
      log('cc is incoming');
    });
  }

  stop() {
    this.#input.close();
    this.#output.close();
  }
}

const midiKey = new MidiKey();
export { midiKey };
export { getInputs };
export { getOutputs };
