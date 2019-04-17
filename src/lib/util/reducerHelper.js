// Create a class helper
export function to(state, updateObj) {
  return {
    ...state,
    ...updateObj
  }
}