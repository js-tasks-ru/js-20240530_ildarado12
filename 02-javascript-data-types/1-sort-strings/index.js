/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let sortArr = [];

  if (param == `desc`) {
    sortArr = arr.slice().sort((b, a) => a.localeCompare(b, [`ru`, `en`], {sensitivity: 'case', caseFirst: 'upper'}));
  } else {
    sortArr = arr.slice().sort((a, b) => a.localeCompare(b, [`ru`, `en`], {sensitivity: 'case', caseFirst: 'upper'}));
  }

  return sortArr;
}