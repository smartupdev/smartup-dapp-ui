function padStart(s, digit = 2) {
  return `${s}`.padStart(digit, '0')
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getYear = (d) => padStart(d.getFullYear(), 4)
const getMonth = (d) => padStart(d.getMonth() + 1)
const getDate = (d) => padStart(d.getDate())
const getDay = (d, getDayNames = DAYS) => getDayNames[d.getDay()]
const getHour = (d) => padStart(d.getHours())
const getMinute = (d) => padStart(d.getMinutes())
const getSecond = (d) => padStart(d.getSeconds())

const now = () =>  Date.now()

const toDate = (d = now()) => `${getYear(d)}-${getMonth(d)}-${getDate(d)}`
const toDateTime = (d = now()) => `${toDate(d)} ${getHour(d)}:${getMinute(d)}:${getSecond(d)}`
// TODO: addDay, addMonth, addYear
// TODO: subDay, subMonth, subYear
export {
  getYear, getMonth, getDate, getDay, getHour, getMinute, getSecond, now, toDate, toDateTime
}