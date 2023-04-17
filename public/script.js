
let defaultEl = document.getElementById('departs-input')

const defaultDate = new Date()
defaultDate.setFullYear(defaultDate.getFullYear() + 1)
const defaultDateExport = defaultDate.toISOString().slice(0,-8)
console.log(defaultDateExport)
defaultEl.value = defaultDateExport