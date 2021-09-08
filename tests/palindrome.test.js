const { palindrome } = require('../utils/forTesting')
// existen varios metodos : buscar doc. oficial
test('palindrome of brenda', () => {
  const result = palindrome('brenda')
  expect(result).toBe('adnerb')
})

test('palindrome of undefined ', () => {
  const result = palindrome()
  expect(result).toBeUndefined()
})
