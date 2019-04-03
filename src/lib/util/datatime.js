function padStart(s, digit = 2) {
  return `${s}`.padStart(digit, '0')
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MIN = 1000 * 60
const HOUR = MIN * 60
const DAY = HOUR * 24

const toDateObject = d => typeof d === 'number' ? new Date(d) : d

const getYear = (d) => padStart(toDateObject(d).getFullYear(), 4)
const getMonth = (d) => padStart(toDateObject(d).getMonth() + 1)
const getDate = (d) => padStart(toDateObject(d).getDate())
const getDay = (d, getDayNames = DAYS) => getDayNames[toDateObject(d).getDay()]
const getHour = (d) => padStart(toDateObject(d).getHours())
const getMinute = (d) => padStart(toDateObject(d).getMinutes())
const getSecond = (d) => padStart(toDateObject(d).getSeconds())

const now = () =>  Date.now()

const toDate = (d = now()) => `${getYear(d)}-${getMonth(d)}-${getDate(d)}`
const toDateTime = (d = now()) => `${toDate(d)} ${getHour(d)}:${getMinute(d)}:${getSecond(d)}`

// d is a number
const toAgo = (date, nowText = 'now', minText = 'm ago', hourText = 'h ago', dayText = 'd ago') => {
  const timeAgo = Date.now() - date
  return timeAgo < MIN ? nowText :
    timeAgo < HOUR ? ~~(timeAgo/MIN) + minText :
    timeAgo < DAY ? ~~(timeAgo/HOUR) + hourText :
    ~~(timeAgo/DAY) + dayText
}

// TODO: addDay, addMonth, addYear
// TODO: subDay, subMonth, subYear
export {
  getYear, getMonth, getDate, getDay, getHour, getMinute, getSecond, now, toDate, toDateTime, toAgo
}