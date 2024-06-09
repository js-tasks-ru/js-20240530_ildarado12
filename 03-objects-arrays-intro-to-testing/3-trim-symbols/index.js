/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size == undefined) {
    return string;
  }

  let newStr = ``;

  if (size == 0 || string == ``) {
    return newStr;
  }

  let counter = 0;
  newStr += string[0];

  for (let i = 1; i < string.length; i++) {
    if (string[i - 1] == string[i]) {
      counter++;
    } else {
      counter = 0;
    }
    if (counter < size) {
      newStr += string[i];
    }
  }
  return newStr;    
}