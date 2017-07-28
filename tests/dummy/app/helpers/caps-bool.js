import { helper } from '@ember/component/helper';

export function capsBool([bool]/*, hash*/) {
  return bool ? "YES" : "no";
}

export default helper(capsBool);

