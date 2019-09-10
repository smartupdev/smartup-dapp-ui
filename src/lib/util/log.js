function logColor(color, messages) {
  messages.forEach( msg => 
    typeof msg == "object" 
  ? console.log(msg) 
  : console.log("%c" + msg, `color: ${color};`))
}

const log = {
  casual: (...messages) => null && logColor('gray', messages),
  info: (...messages) => logColor('black', messages),
  success: (...messages) => logColor('green', messages),
  warning: (...messages) => logColor('orange', messages),
  error: (...messages) => logColor('red', messages),
  critical: (...messages) => logColor('DeepPink', messages),
  table: (table) => console.table(table)
}

window.log = log

export { log }