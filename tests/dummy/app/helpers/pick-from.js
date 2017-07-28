import { helper } from '@ember/component/helper';

export function pickFrom([list, index]/*, hash*/) {
  return list[index % list.length];
}

export default helper(pickFrom);

