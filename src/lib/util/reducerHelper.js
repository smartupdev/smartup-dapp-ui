function modifier(r) {
  return r
}
export function changeArrayById(array, id, modifier = modifier, key = 'id') {
  const index = array.findIndex(e => e[key] === id)
  return changeArrayByIndex(array, index, r => ({...r, ...modifier(r)}))
}

export function changeArrayByIndex(array, index, modifier = modifier) {
  if(typeof index !== 'number') return new Error('[changeArrayByIndex] index must be number')
  if(index < 0 || array.length < index + 1) return array
  return [
    ...array.slice(0, index),
    modifier(array[index]),
    ...array.slice(index + 1)
  ]
}

export function addArrayById(array, id, ele, key) {
  return [ ele, ...removeArrayById(array, id, key) ]
}
export function removeArrayById(array, id, key = 'id') {
  return array.filter(a => a[key] !== id)
}