/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arrPath = path.split(`.`);

  return (obj) => {
    let curr = obj;
    
    arrPath.forEach((elemArr) => {
      if (elemArr in curr) {
        curr = curr[elemArr];
      } else {
        return curr = undefined;
      }
    });

    return curr;
  };
}