/* eslint-disable no-param-reassign */
const { log } = console;
const CONTROL_CHANGE = 176;

export default {
  default: {
    cc: {
      value: 64,
      max: 127, // 127
      min: 0, // 0
      onCreate: ({ key }) => { log('onCreate : key ', key.name, ' was created'); },
      onUpdate: ({ key, cc }) => { log('onUpdate : cc ', key.cc, ' was updated with the value ', cc.value); },
    },
    key: {
      onPress: ({ midiSender, key, cc }) => {
        const { increment } = key;
        cc.value += increment;
        const message = [CONTROL_CHANGE, key.cc, cc.value];
        midiSender(message);
        log('onPress : ', key.name, ' was pressed');
      },
    },
  },
  keys: [
    {
      name: '&',
      increment: 1,
      cc: 0,
    },
    {
      name: 'a',
      increment: -1,
      cc: 0,
    },
    {
      name: 'é',
      increment: 1,
      cc: 1,
    },
    {
      name: 'z',
      increment: -1,
      cc: 1,
    },
    {
      name: '"',
      increment: 1,
      cc: 2,
    },
    {
      name: 'e',
      increment: -1,
      cc: 2,
    },
  ],
  // TODO : struct change
  /* you can overide default cc values here
  ccs: {
    1: {
      value: 1,
      max: 3,
      min: 1,
    },
  },
  */
};
