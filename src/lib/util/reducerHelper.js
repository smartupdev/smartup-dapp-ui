// Create a class helper
// export function to(state, updateObj) {
//   return {
//     ...state,
//     ...updateObj
//   }
// }

export function updateLoadMore(currentDatas, newDatas, isloadMore, key = 'id') {
  return isloadMore ? 
  newDatas.reduce((currentArray, newRecord) => {
    // check if the record already exists. If yes, update thd old one. If no, append to the end.
    const existIndex = currentArray.findIndex(a => a[key] === newRecord[key])  
    return existIndex < 0 ? [...currentArray, newRecord] : changeArrayByIndex(currentArray, existIndex, () => newRecord)
  }, currentDatas)
  : newDatas
}

export function changeArrayById(array, id, modifier, key = 'id') {
  const index = array.findIndex(e => e[key] === id)
  return changeArrayByIndex(array, index, r => ({...r, ...modifier(r)}))
}

export function changeArrayByIndex(array, index, modifier = r => r) {
  if(typeof index !== 'number') return new Error('[changeArrayByIndex] index must be number')
  if(index < 0 || array.length < index + 1) return array
  return [
    ...array.slice(0, index),
    modifier(array[index]),
    ...array.slice(index + 1)
  ]
}