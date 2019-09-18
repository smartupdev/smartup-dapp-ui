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

function length(str) {
  var count = 0;
  for (var i = 0, len = str.length; i < len; i++) {
      count += str.charCodeAt(i) < 256 ? 1 : 2;
  }
  return count;
}

const simpleText = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque libero purus, laoreet vitae massa sit amet, egestas hendrerit dolor. Cras sit amet eros id nisi mollis placerat. Vestibulum in suscipit nisi. Mauris aliquet eros at cursus dignissim. Suspendisse et leo lobortis, vulputate lacus sed, hendrerit nunc. Suspendisse at augue vel orci scelerisque euismod eget ut ligula. Sed condimentum felis efficitur viverra ornare. Sed fringilla luctus tempor. Curabitur eu scelerisque ex. Vivamus tristique massa nisl, eget tempor justo volutpat non.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu vestibulum augue. Etiam eleifend mauris vel dictum accumsan. Vivamus risus leo, venenatis eu nibh non, tincidunt blandit erat. Nullam ut elit at turpis ultricies rhoncus. Sed suscipit nisi in est ornare, eget lobortis nisi dictum. Mauris a tortor et augue vestibulum maximus at quis urna.',
  'Praesent at efficitur augue. Nam sed odio sodales, blandit orci sed, vehicula risus. Curabitur eget urna vestibulum, ullamcorper nibh vel, mattis risus. Quisque vitae iaculis justo, vel luctus leo. Proin ac erat euismod, feugiat velit sit amet, ultricies arcu. Suspendisse at arcu in felis pretium venenatis. Praesent ut lorem metus. Praesent interdum vulputate dictum. Aliquam vehicula ac justo sit amet consectetur. Cras enim erat, sagittis et bibendum id, rhoncus a orci. Sed in semper leo. Pellentesque facilisis erat nec ante feugiat euismod. Morbi libero metus, elementum at pulvinar sit amet, posuere id ex. Nam at neque urna.',
  'Aliquam id ornare mauris. Nam porta dapibus neque, cursus interdum mi condimentum vitae. Ut suscipit eget metus a mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent at congue dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam eu rhoncus purus. Etiam rutrum sapien libero, sed scelerisque nisi auctor eu. Vivamus semper aliquet mi at ultricies. Cras eu nisl tempus, viverra tortor at, faucibus urna. Duis in nisl at lacus rhoncus vehicula. Vestibulum vitae leo mauris. Suspendisse nulla augue, suscipit a laoreet nec, hendrerit eget ex.',
  'Sed non nisi ac dolor placerat vehicula. Donec dapibus vestibulum velit, ac dapibus nisi pharetra vitae. Mauris quam arcu, hendrerit venenatis semper ac, molestie quis diam. In non porta mauris. Sed varius dignissim condimentum. Donec nec ipsum suscipit, lobortis risus eget, imperdiet orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent quis augue in neque facilisis venenatis euismod sit amet metus.`',
]
function getSimpleText(length = 30, paragraph = 5) {
  return simpleText
    .slice(0, paragraph)
    .join('\n')
    .slice(0, length)
} 

export { upper, upperAll, upperEach, plural, shorten, upperOne, length, getSimpleText }