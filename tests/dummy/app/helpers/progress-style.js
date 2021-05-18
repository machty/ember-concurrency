import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function progressStyleHelper([percent, id, colors]/*, hash*/) {
  let color = colors[id % colors.length];
  return new htmlSafe(`width: ${percent}%; background-color: ${color};`);
}

export default helper(progressStyleHelper);
