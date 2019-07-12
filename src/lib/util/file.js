const fs = require('fs')

export function getJson(filename) {
  return JSON.parse(fs.readFileSync(filename).toString())
}