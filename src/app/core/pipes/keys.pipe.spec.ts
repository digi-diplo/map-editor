import { KeysPipe } from './keys.pipe';

enum StringEnum {
  A = 'a',
  B = 'b'
}

enum NumberEnum {
  One = 1,
  Two = 2
}

describe('KeysPipe', () => {
  const pipe = new KeysPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('map objects to a key value array', () => {
    expect(pipe.transform({ n: 1 })).toEqual([{ key: 'n', value: 1 }]);
  });
  it('works with enum', () => {
    expect(pipe.transform(StringEnum)).toEqual([{ key: 'A', value: 'a' }, { key: 'B', value: 'b' }]);
  });
  it('works with number enum', () => {
    expect(pipe.transform(NumberEnum)).toEqual([{ key: 'One', value: 1 }, { key: 'Two', value: 2 }]);
  });
});
