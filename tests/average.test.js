const { average } = require('../utils/forTesting')
// para agupar se usa describe
describe('average', () => {
  test('of one value is itself', () => {
    expect(average([1])).toBe(1)
  })
  test('of many is calculated correctly', () => {
    expect(average([1, 2, 5, 8, 9])).toBe(5)
  })
  test('of empty array', () => {
    expect(average([])).toBe(0)
  })
  test('of undefined array', () => {
    expect(average()).toBe(undefined)
  })
})
