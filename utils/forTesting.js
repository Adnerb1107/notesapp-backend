const palindrome = (cadena) => {
  if (typeof cadena === 'undefined') return
  return cadena.split('').reverse().join('')
}
const average = array => {
  if (!array) return
  if (array.length === 0) return 0
  const sum = (a, b) => a + b
  return (array.reduce(sum, 0)) / array.length
}

module.exports = {
  palindrome,
  average
}
