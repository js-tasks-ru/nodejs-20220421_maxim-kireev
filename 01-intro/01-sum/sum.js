function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number')
  {throw new TypeError('Each parametr should be a number type')}
  return a + b}
module.exports = sum;
 