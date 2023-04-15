/* eslint-disable no-sequences */
let instance;

class MidiCCState {
  #state = [];

  static getInstance() {
    if (!instance) instance = new MidiCCState();
    return instance;
  }

  get() { return this.#state; }

  getValue({ controller, channel }) {
    return this.#state[channel || 0, controller] || 0;
  }

  reset() {
    this.#state = [];
    return this;
  }

  set({ controller, channel, value }) {
    this.#state[channel || 0, controller] = value;
    return this;
  }
}

export default MidiCCState;
export { MidiCCState };
