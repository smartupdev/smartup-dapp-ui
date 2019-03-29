import {  
  getYear, getMonth, getDate, getDay, getHour, getMinute, getSecond, now, 
  toDate, toDateTime
} from './datatime'

const dataString = '2018-11-12 01:02:03'
const d = new Date(dataString)

describe('Date Get', () => {
  it('getYear', () => {
    expect(getYear(d)).toBe('2018');
  });
  it('getMonth', () => {
    expect(getMonth(d)).toBe('11');
  });
  it('getDate', () => {
    expect(getDate(d)).toBe('12');
  });
  it('getDay', () => {
    expect(getDay(d)).toBe('Mon');
  });
  it('getDay Chi', () => {
    expect(getDay(d, ['日','一','二','三','四','五','六'])).toBe('一');
  });
  it('getHour', () => {
    expect(getHour(d)).toBe('01');
  });
  it('getMinute', () => {
    expect(getMinute(d)).toBe('02');
  });
  it('getSecond', () => {
    expect(getSecond(d)).toBe('03');
  });
  
})
describe('Date Format', () => {
  it('toDate', () => {
    expect(toDate(d)).toBe('2018-11-12');
  });

  it('toDateTime', () => {
    expect(toDateTime(d)).toBe('2018-11-12 01:02:03');
  });
})