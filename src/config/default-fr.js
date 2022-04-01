/* eslint-disable no-param-reassign */
const { log } = console;
const CONTROL_CHANGE = 176;

export default {
  default: {
    cc: {
      value: 64,
      max: 127,
      min: 0,
      onCreate: ({ key }) => { log('onCreate : key ', key.name, ' is created'); },
      onUpdate: ({ key, cc }) => { log('onUpdate : cc ', key.cc, ' is updated with the value ', cc.value); },
    },
    key: {
      onPress: ({ midiSender, key, cc }) => {
        const { increment } = key;
        cc.value += increment;
        midiSender([CONTROL_CHANGE, key.cc, cc.value]);
        log('onPress : ', key.name, ' is pressed');
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
    {
      name: '\'',
      increment: 1,
      cc: 3,
    },
    {
      name: 'r',
      increment: -1,
      cc: 3,
    },
    {
      name: '(',
      increment: 1,
      cc: 4,
    },
    {
      name: 't',
      increment: -1,
      cc: 4,
    },
    {
      name: '-',
      increment: 1,
      cc: 5,
    },
    {
      name: 'y',
      increment: -1,
      cc: 5,
    },
    {
      name: 'è',
      increment: 1,
      cc: 6,
    },
    {
      name: 'u',
      increment: -1,
      cc: 6,
    },
    {
      name: '_',
      increment: 1,
      cc: 7,
    },
    {
      name: 'i',
      increment: -1,
      cc: 7,
    },
    {
      name: 'ç',
      increment: 1,
      cc: 8,
    },
    {
      name: 'o',
      increment: -1,
      cc: 8,
    },
    {
      name: 'à',
      increment: 1,
      cc: 9,
    },
    {
      name: 'p',
      increment: -1,
      cc: 9,
    },
    {
      name: 'q',
      increment: 1,
      cc: 10,
    },
    {
      name: 'w',
      increment: -1,
      cc: 10,
    },
    {
      name: 's',
      increment: 1,
      cc: 11,
    },
    {
      name: 'x',
      increment: -1,
      cc: 11,
    },
    {
      name: 'd',
      increment: 1,
      cc: 12,
    },
    {
      name: 'c',
      increment: -1,
      cc: 12,
    },
    {
      name: 'f',
      increment: 1,
      cc: 13,
    },
    {
      name: 'v',
      increment: -1,
      cc: 13,
    },
    {
      name: 'g',
      increment: 1,
      cc: 14,
    },
    {
      name: 'b',
      increment: -1,
      cc: 14,
    },
    {
      name: 'h',
      increment: 1,
      cc: 15,
    },
    {
      name: 'n',
      increment: -1,
      cc: 15,
    },
    {
      name: 'j',
      increment: 1,
      cc: 16,
    },
    {
      name: ',',
      increment: -1,
      cc: 16,
    },
    {
      name: 'k',
      increment: 1,
      cc: 17,
    },
    {
      name: ';',
      increment: -1,
      cc: 17,
    },
    {
      name: 'l',
      increment: 1,
      cc: 18,
    },
    {
      name: ':',
      increment: -1,
      cc: 18,
    },
    {
      name: 'm',
      increment: 1,
      cc: 19,
    },
    {
      name: '!',
      increment: -1,
      cc: 19,
    },
  ],
  /* you can overide default cc values here */
  /*
  ccs: [
    {
      id: 2,
      max: 20,
      onCreate: () => { console.log('custom create'); },
    },
  ],
  */
};
