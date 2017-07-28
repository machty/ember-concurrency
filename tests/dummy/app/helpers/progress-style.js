import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function progressStyleHelper([percent, id, colors]/*, hash*/) {
  let color = colors[id % colors.length];
  return new htmlSafe(`width: ${percent}%; background-color: ${color};`);
}

export default helper(progressStyleHelper);

