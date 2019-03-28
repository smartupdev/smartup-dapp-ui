const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
function toPrice(number, decimal = 2) {
  return formatter.format(number).slice(0, decimal === 0 ? -3 : decimal === 1 ? -1 : undefined)
}

export {toPrice}