export const  empty=(obj:Record<any,any>) =>{
  if (!obj) {
    return true
  }
  if (typeof obj === 'string' || isNumeric(obj)) {
    // zero is empty? yes
    if (obj) {
      return false
    }
  }
  // check object
  let flag = Object.keys(obj).length === 0 && obj.constructor === Object
  if (Array.isArray(obj) && obj.length === 0) {
    flag = true
  }
  return flag
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
