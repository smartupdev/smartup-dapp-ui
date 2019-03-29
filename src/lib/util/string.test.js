import { upper, upperAll, upperEach, plural } from './string'

describe('String function', () => {
  const txt = 'this is a teSt'
  it('upper', () => {
    expect(upper(txt)).toBe('This is a test');
  });
  it('upperAll', () => {
    expect(upperAll(txt)).toBe('THIS IS A TEST');
  });
  it('upperEach', () => {
    expect(upperEach(txt)).toBe('This Is A Test');
  });
  it('upperEach chinese', () => {
    expect(upperEach('我是測試，哈哈')).toBe('我是測試，哈哈');
  });
  it('plural', () => {
    expect(plural(3, 'test')).toBe('3 tests');
  });
  it('plural', () => {
    expect(plural(1, 'test')).toBe('1 test');
  });
  it('plural', () => {
    expect(plural(0, 'test', 'no test')).toBe('no test');
  });
  it('plural', () => {
    expect(plural(3, 'test', 'no test', 'testes')).toBe('3 testes');
  });
})