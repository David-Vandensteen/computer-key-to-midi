/* eslint-disable no-param-reassign */
const CONTROL_CHANGE = 176;

export default {
  default: {
    cc: {
      value: 64,
      max: 128,
      min: 0,
    },
    key: {
      onPress: ({ midiSender, key, cc }) => {
        const { id } = cc;
        const { increment } = key;
        cc.value += increment;
        const message = [CONTROL_CHANGE, id, cc.value];
        midiSender(message);
      },
      onRelease: () => {},
    },
  },
  keys: [
    {
      key: '&',
      increment: 1,
      cc: 0,
    },
    {
      key: 'a',
      increment: -1,
      cc: 0,
    },
    {
      key: 'é',
      increment: 1,
      cc: 1,
    },
    {
      key: 'z',
      increment: -1,
      cc: 1,
    },
    {
      key: '"',
      increment: 1,
      cc: 2,
    },
    {
      key: 'e',
      increment: -1,
      cc: 2,
    },
  ],
  /* you can overide default cc values here
  ccs: {
    1: {
      id: 1,
      value: 1,
      max: 3,
      min: 1,
    },
  },
  */
};
