import { expect } from 'chai';
import { describe, it } from 'mocha';
import { MidiCCState } from '#src/lib/midiCCState';

describe('MidiCCState', () => {
  it('should return the same instance when calling getInstance multiple times', () => {
    const instance1 = MidiCCState.getInstance();
    const instance2 = MidiCCState.getInstance();
    expect(instance1).to.equal(instance2);
  });

  it('should set and get the correct value for a given controller and channel', () => {
    const state = MidiCCState.getInstance();
    state.set({ controller: 1, channel: 2, value: 3 });
    expect(state.getValue({ controller: 1, channel: 2 })).to.equal(3);
  });

  it('should return 0 for default values', () => {
    const state = MidiCCState.getInstance().reset();
    expect(state.getValue({ controller: 1, channel: 1 })).to.equal(0);
    expect(state.getValue({ controller: 2, channel: 1 })).to.equal(0);
    expect(state.getValue({ controller: 1, channel: 2 })).to.equal(0);
    expect(state.getValue({ controller: 2, channel: 2 })).to.equal(0);
  });
});
