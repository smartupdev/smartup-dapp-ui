const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

// e.g. toShortNumber(10000, 'k', 1000, 'm', 1000000,)
// e.g. toShortNumber(123412345556, '千', 1000, '萬', 10000, '億', 100000000)
function toShortNumber(number, ...wordAndNumbers) {
  if(typeof number !== 'number') return '-'
  const list = wordAndNumbers[0] ? wordAndNumbers : ['k', 1000, 'm', 1000000]
  return list.reduce( (p, c, i, a) => 
    i%2 ? 
      number > c ? (number/c).toFixed(1) + a[i-1] : p
    : p
  , number)
}

function toPercent(number) {
  return number ? 
    (number > 0 ? '+' : '') + (number * 100).toFixed(2) + '%'
  : number === 0 ? '0%' : '-'
}

function toPrice(number, decimal = 2) {
  return [undefined, null, ''].includes(number) 
  ? '-' 
  : formatter.format(number).slice(0, decimal === 0 ? -3 : decimal === 1 ? -1 : undefined).replace('$', '')
}

function toToken(number, decimal = 4) {
  if(number === null || number === undefined) return '-'
  const int = ~~number
  const dec = Math.round((number - int)*Math.pow(10, decimal))
  return (
    formatter.format(int).slice(0, -3) 
    + (dec ? `.${`${dec}`.padStart(decimal, 0).slice(0, decimal)}` : '')
  ).slice(1)
}

export { toPrice, toToken, toPercent, toShortNumber }