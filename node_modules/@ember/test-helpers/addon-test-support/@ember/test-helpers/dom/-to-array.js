/**
  @private
  @param {NodeList} nodelist the nodelist to convert to an array
  @returns {Array} an array
*/
export default function toArray(nodelist) {
    let array = new Array(nodelist.length);
    for (let i = 0; i < nodelist.length; i++) {
        array[i] = nodelist[i];
    }
    return array;
}
