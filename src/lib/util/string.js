/**
 * "foo bar" to "Foo bar"
 * @param {String} s - input string
 * @param defaultTxt - defaulf null
 */
const upper = (s, defaultTxt) => upperOne(s, defaultTxt)
const upperOne = (s, defaultTxt = null) => s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : defaultTxt

/**
 * "foo bar" to "FOO BAR"
 * @param {String} s - input string
 * @param defaultTxt - defaulf null
 */
const upperAll = (s, defaultTxt = null) => s ? s.toUpperCase() : defaultTxt
/**
 * "foo bar" to "Foo Bar"
 * @param {String} s - input string
 * @param defaultTxt - defaulf null
 */
const upperEach = (s, defaultTxt = null) => s ? s.toLowerCase().replace(/\b(\w)/g, t => t.toUpperCase()) : defaultTxt

/**
 * "foo bar" to "Foo Bar"
 * @param {number} count
 * @param {String} s - input string
 * @param defaultTxt - defaulf null
 * @param plural - (Optional) If null, 's' will be append to string
 */
const plural = (count, s, defaultTxt = null, plural) => count ? `${count} ${count === 1 ? s : plural || s + 's'}` : defaultTxt

const shorten = (s, start = 8, end = 6) => s ? 
  s.length <= start + end + 3 ? s : `${s.slice(0, start)}...${s.slice(-end)}`
: '-'

export { upper, upperAll, upperEach, plural, shorten,upperOne }