/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const objArr = Object.entries(obj); 

  for (let str of fields) {
    objArr.map(item => {
      if (item[0] == str) {
        objArr.splice(item, 1);
      }
    });
  }  
  
  const newObj = Object.fromEntries(objArr);
  
  return newObj;
};
