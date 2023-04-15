import { expect } from 'chai';
import { describe, it } from 'mocha';
import YAMLLoader from '#src/lib/YAMLLoader';

describe('YAMLLoader', () => {
  it('load a single yaml file', () => {
    const loadTest1 = YAMLLoader('./test/fixture/test1.yaml');
    const shouldBe = [
      '/tmp/prop1/test1.log',
      '/tmp/prop2/test1.log',
      '/tmp/prop3/test1.log',
    ];
    expect(loadTest1.test1).to.deep.equal(shouldBe);
  });

  it('load a yaml file with a single fallBack file', () => {
    const loadTest1 = YAMLLoader('./tmp/qsjdk', { fallBack: ['./test/fixture/test1.yaml'] });
    const shouldBe = [
      '/tmp/prop1/test1.log',
      '/tmp/prop2/test1.log',
      '/tmp/prop3/test1.log',
    ];
    expect(loadTest1.test1).to.deep.equal(shouldBe);
  });

  it('load a yaml file with multiple fallBack files', () => {
    const loadTest2 = YAMLLoader('./tmp/qsjdk', { fallBack: ['./tmp/djsk', './tmp/qsdkla', './test/fixture/test2.yaml'] });
    const shouldBe = [
      '/tmp/prop1/test2.log',
      '/tmp/prop2/test2.log',
      '/tmp/prop3/test2.log',
    ];
    expect(loadTest2.test2).to.deep.equal(shouldBe);
  });
});
