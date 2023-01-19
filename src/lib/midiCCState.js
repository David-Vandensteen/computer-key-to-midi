/* eslint-disable no-sequences */
class MidiCCState {
  #state = [];

  static getInstance() {
    if (!this.instance) {
      this.instance = new MidiCCState();
    }
    return this.instance;
  }

  get() { return this.#state; }

  getValue({ controller, channel }) {
    return this.#state[channel || 0, controller] || 0;
  }

  set({ controller, channel, value }) {
    this.#state[channel || 0, controller] = value;
    return this;
  }
}

export default MidiCCState;
export { MidiCCState };
