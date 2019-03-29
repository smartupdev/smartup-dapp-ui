import { merge, clone, map } from './object'

const createObj = (z) => ({
  x: 1,
  y: '2',
  z
})

const obj1 = {
  name: 'i am obj 1',
  date: new Date(),
  age: 33,
  fun: () => console.log(1),
  obj: { ...createObj(1), n: 99 },
  arr: [createObj('a1'), createObj('a2')]
}

const obj2 = {
  name: 'i am obj 2',
  date: new Date(),
  age: 44,
  obj: createObj(2),
  arr: [createObj('b1'), createObj('b2')]
}

describe('object', () => {
  it('map', () => {
    const obj = createObj(3)
    const newObj = map(obj, ({ value }) => 'new ' + value)
    expect('new ' + obj.x).toBe(newObj.x);
  });

  it('merge', () => {
    const mergeObj = merge(obj1, obj2)
    expect(mergeObj.arr).toHaveLength(4);
    expect(mergeObj.obj.n).toBe(99);
    expect(mergeObj.obj.z).toBe(2);
  });

  it('clone', () => {
    const newObj = clone(obj1);
    newObj.name = '3'
    newObj.arr[0].x = 99
    expect(newObj.name).not.toEqual(obj1.name);
    expect(newObj.date instanceof Date).toEqual(true);
    expect(newObj.arr[0].x).toEqual(99);
    expect(obj1.arr[0].x).not.toEqual(99);
  });
})