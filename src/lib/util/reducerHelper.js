// Create a class helper
// export function to(state, updateObj) {
//   return {
//     ...state,
//     ...updateObj
//   }
// }

export function changeArrayById( array, id, modifier, key = 'id') {
  const index = array.findIndex(e => e[key] === id)
  if(index < 0) return array
  return [
    ...array.slice(0, index),
    {
      ...array[index],
      ...modifier(array[index])
    },
    ...array.slice(index + 1)
  ]
}