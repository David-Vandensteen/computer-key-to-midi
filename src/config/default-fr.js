export default {
  default: {
    value: 64,
    max: 128,
    min: 0,
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
  /*
  ccs: {
    1: {
      value: 64,
      max: 100,
      min: 5,
    },
  },
  */
};
