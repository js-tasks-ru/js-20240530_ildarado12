/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let newArr = [];
  Object.entries(obj).filter(item => {
    for (let str of fields) {
      if (str == item[0]) {
        newArr.push([item[0], item[1]]);
      }
    }
  });

  let newObj = Object.fromEntries(newArr);

  return newObj;
};
