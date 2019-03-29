function padStart(s, digit = 2) {
  return `${s}`.padStart(digit, '0')
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const toDateObject = d => typeof d === 'number' ? new Date(d) : d

const getYear = (d) => padStart(toDateObject(d).getFullYear(), 4)
const getMonth = (d) => padStart(toDateObject(d).getMonth() + 1)
const getDate = (d) => padStart(toDateObject(d).getDate())
const getDay = (d, getDayNames = DAYS) => getDayNames[toDateObject(d).getDay()]
const getHour = (d) => padStart(toDateObject(d).getHours())
const getMinute = (d) => padStart(toDateObject(d).getMinutes())
const getSecond = (d) => padStart(toDateObject(d).getSeconds())

const now = () =>  Date.now()

const toDate = (d = now()) => (d = toDateObject(d)) && `${getYear(d)}-${getMonth(d)}-${getDate(d)}`
const toDateTime = (d = now()) => (d = toDateObject(d)) && `${toDate(d)} ${getHour(d)}:${getMinute(d)}:${getSecond(d)}`
// TODO: addDay, addMonth, addYear
// TODO: subDay, subMonth, subYear
export {
  getYear, getMonth, getDate, getDay, getHour, getMinute, getSecond, now, toDate, toDateTime
}