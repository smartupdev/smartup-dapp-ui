function toPrice(number, decimal = 2) {
  return `$${number.toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

export {toPrice}