// merge, clone, isEqual, unified

const isObject = v => typeof v === 'object' && v
const isDate = v => v instanceof Date
const isArray = v => v instanceof Array

/**
 * Callback for mapping object.
 *
 * @callback mapCallback
 * @param {{key: string, value: any}} currentValue
 * @param {number} [index]
 * @param {object} [object] - origin object
 */

/**
 * Support JSON object and Array only
 * @param {JSON | Array} obj
 * @param {mapCallback} callback
 */
const map = (obj, callback) => {
  const r =  isArray(obj) ? [] : {}
  let i = 0
  for(const key in obj) {
    let value = obj[key]
    r[key] = callback({key, value}, i++, obj)
  }
  return r
}

/**
 * Support JSON object, Array and Date only
 * @param {JSON | Array | Date} obj 
 */
const clone = (obj) => {
  if (!isObject(obj)) return obj;
  if(isDate(obj)) return new Date(+obj)
  return map(obj, ({value}) => isObject(value) ? clone(value) : value )
}

const merge = (obj1, obj2) => {
  const r = clone(obj1)
  const r2 = clone(obj2)
  map(r2, ({key, value}) =>  
    r[key] = isObject(value) && r[key] ?
      isArray(value) ? 
        [...r[key], ...value] : 
        merge(r[key], value)
    : 
      value
  )
  return r
}

const reverse = (array, condition = true) => condition ? [...array].reverse() : array

export { clone, merge, map, reverse }