import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function colorString([color]/*, hash*/) {
  return new htmlSafe(`color: ${color};`);
}

export default helper(colorString);

