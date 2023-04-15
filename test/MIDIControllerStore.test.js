import { expect } from 'chai';
import { describe, it } from 'mocha';
import { MIDIControllerStore } from '#src/lib/MIDIControllerStore';

describe('MIDIControllerStore', () => {
  it('should return the same instance when calling getInstance multiple times', () => {
    const instance1 = MIDIControllerStore.getInstance();
    const instance2 = MIDIControllerStore.getInstance();
    expect(instance1).to.equal(instance2);
  });

  it('should set and get the correct value for a given controller and channel', () => {
    const state = MIDIControllerStore.getInstance();
    state.set({ controller: 1, channel: 2, value: 3 });
    expect(state.getValue({ controller: 1, channel: 2 })).to.equal(3);
  });

  it('should return 0 for default values', () => {
    const state = MIDIControllerStore.getInstance();
    state.reset();
    expect(state.getValue({ controller: 1, channel: 1 })).to.equal(0);
    expect(state.getValue({ controller: 2, channel: 1 })).to.equal(0);
    expect(state.getValue({ controller: 1, channel: 2 })).to.equal(0);
    expect(state.getValue({ controller: 2, channel: 2 })).to.equal(0);
  });
});
