const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

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

export { toPrice, toToken, toPercent }