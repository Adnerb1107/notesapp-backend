// console.assert es una opcion para validar ciertas condiciones
const suma = (a, b) => a + b
const checks = [
  { a: 1, b: 0, result: 1 },
  { a: 4, b: -4, result: 0 },
  { a: 1, b: 8, result: 9 },
  { a: 11, b: 1, result: 12 }

]
checks.forEach(check => {
  const { a, b, result } = check
  console.assert(
    suma(a, b) === result,
      `suma of ${a} and ${b} should be ${result}`
  )
})
console.log(`tests pass : ${checks.length}...`)
console.assert(
  suma(1, 3) === 4,
  'Sum of 1 and 3 should be 4'
)

console.assert(
  suma(0, 0) === 0,
  'Sum of 0 and 0 should be 0'
)
