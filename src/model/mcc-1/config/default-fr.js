/* "free" cc
3, 9, 14, 15, 20-31, 35, 41, 46, 47, 52-63, 85-90, 102-119
korg tr use : 20, 21
*/

/* eslint-disable no-param-reassign */
const { log } = console;

export default {
  default: {
    cc: {
      value: 64,
      max: 127, // 127
      min: 0, // 0
      onCreate: ({ key }) => { log('onCreate : key ', key.name, ' is created'); },
      onUpdate: ({ key, cc }) => { log('onUpdate : cc ', key.cc, ' is updated with the value ', cc.value); },
    },
    key: {
      onPress: ({
        midiSender,
        key,
        cc,
        channel,
      }) => {
        const { increment } = key;
        cc.value += increment;
        midiSender('cc', { controller: key.cc, value: cc.value, channel });
        log('onPress : ', key.name, ' is pressed');
      },
    },
  },
  keys: [
    {
      name: '&',
      increment: 1,
      cc: 3,
      channel: 10,
    },
    {
      name: 'a',
      increment: -1,
      cc: 3,
    },
    {
      name: 'é',
      increment: 1,
      cc: 9,
    },
    {
      name: 'z',
      increment: -1,
      cc: 9,
    },
    {
      name: '"',
      increment: 1,
      cc: 14,
    },
    {
      name: 'e',
      increment: -1,
      cc: 14,
    },
    {
      name: '\'',
      increment: 1,
      cc: 15,
    },
    {
      name: 'r',
      increment: -1,
      cc: 15,
    },
    {
      name: '(',
      increment: 1,
      cc: 22,
    },
    {
      name: 't',
      increment: -1,
      cc: 22,
    },
    {
      name: '-',
      increment: 1,
      cc: 23,
    },
    {
      name: 'y',
      increment: -1,
      cc: 23,
    },
    {
      name: 'è',
      increment: 1,
      cc: 24,
    },
    {
      name: 'u',
      increment: -1,
      cc: 24,
    },
    {
      name: '_',
      increment: 1,
      cc: 25,
    },
    {
      name: 'i',
      increment: -1,
      cc: 25,
    },
    {
      name: 'ç',
      increment: 1,
      cc: 26,
    },
    {
      name: 'o',
      increment: -1,
      cc: 26,
    },
    {
      name: 'à',
      increment: 1,
      cc: 27,
    },
    {
      name: 'p',
      increment: -1,
      cc: 27,
    },
    {
      name: 'q',
      increment: 1,
      cc: 28,
    },
    {
      name: 'w',
      increment: -1,
      cc: 28,
    },
    {
      name: 's',
      increment: 1,
      cc: 29,
    },
    {
      name: 'x',
      increment: -1,
      cc: 29,
    },
    {
      name: 'd',
      increment: 1,
      cc: 30,
    },
    {
      name: 'c',
      increment: -1,
      cc: 31,
    },
    {
      name: 'f',
      increment: 1,
      cc: 35,
    },
    {
      name: 'v',
      increment: -1,
      cc: 35,
    },
    {
      name: 'g',
      increment: 1,
      cc: 41,
    },
    {
      name: 'b',
      increment: -1,
      cc: 41,
    },
    {
      name: 'h',
      increment: 1,
      cc: 46,
    },
    {
      name: 'n',
      increment: -1,
      cc: 46,
    },
    {
      name: 'j',
      increment: 1,
      cc: 47,
    },
    {
      name: ',',
      increment: -1,
      cc: 47,
    },
    {
      name: 'k',
      increment: 1,
      cc: 52,
    },
    {
      name: ';',
      increment: -1,
      cc: 52,
    },
    {
      name: 'l',
      increment: 1,
      cc: 53,
    },
    {
      name: ':',
      increment: -1,
      cc: 53,
    },
    {
      name: 'm',
      increment: 1,
      cc: 54,
    },
    {
      name: '!',
      increment: -1,
      cc: 54,
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
