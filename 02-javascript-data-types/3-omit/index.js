/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  let trueEntry;
  const newArr = [];
  const objArr = Object.entries(obj); 

  for (const arr of objArr) {
    for (const str of fields) {
      arr.filter(() => {
        if (str == arr[0]) {
          trueEntry = true;
        }
      });
    }
    if (!trueEntry) {
      newArr.push(arr);
    }
    trueEntry = false;
  }

  return Object.fromEntries(newArr);
};
