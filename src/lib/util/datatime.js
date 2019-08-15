function padStart(s, digit = 2) {
  return `${s}`.padStart(digit, '0')
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MIN = 1000 * 60
const HOUR = MIN * 60
const DAY = HOUR * 24
const MONTH = DAY * 30
const YEAR = 365

const toDateObject = d => d instanceof Date ? d : new Date(d)

const getYear = (d) => padStart(toDateObject(d).getFullYear(), 4)
const getMonth = (d) => padStart(toDateObject(d).getMonth() + 1)
const getMonthString = (d, getMonthNames = MONTHS) => getMonthNames[toDateObject(d).getMonth()]
const getDate = (d) => padStart(toDateObject(d).getDate())
const getDay = (d, getDayNames = DAYS) => getDayNames[toDateObject(d).getDay()]
const getHour = (d) => padStart(toDateObject(d).getHours())
const getMinute = (d) => padStart(toDateObject(d).getMinutes())
const getSecond = (d) => padStart(toDateObject(d).getSeconds())

const now = () =>  Date.now()

const toDate = (d = now()) => `${getYear(d)}-${getMonth(d)}-${getDate(d)}`
const toDateTime = (d = now()) => `${toDate(d)} ${getHour(d)}:${getMinute(d)}:${getSecond(d)}`
const toFullDate = (d = now(), dayText, monthText) => d ? `${getDay(d, dayText)}, ${getMonthString(d, monthText)} ${getDate(d)}, ${getHour(d)}:${getMinute(d)}` : '-'

// d is a number
const toAgo = (date, nowText = 'now', minText = 'm ago', hourText = 'h ago', dayText = 'd ago') => {
  const timeAgo = Date.now() - new Date(date).getTime()
  return timeAgo < MIN ? nowText :
    timeAgo < HOUR ? ~~(timeAgo/MIN) + minText :
    timeAgo < DAY ? ~~(timeAgo/HOUR) + hourText :
    ~~(timeAgo/DAY) + dayText
}

// TODO: addDay, addMonth, addYear
const hourAfter = (hours, date = now()) => date + HOUR * hours
const dayAfter = (days, date = now()) => date + DAY * days
const monthAfter = (months, date = now()) => date + MONTH * months
const yearAfter = (years, date = now()) => date + YEAR * years
// TODO: subDay, subMonth, subYear
export {
  MIN, HOUR, DAY, MONTH, YEAR,
  getYear, getMonth, getDate, getDay, getHour, getMinute, getSecond, now, toDate, toDateTime, toAgo, toFullDate,
  hourAfter, dayAfter, monthAfter, yearAfter
}