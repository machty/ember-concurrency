import { helper } from '@ember/component/helper';

export function sum([a,b]/*, hash*/) {
  return a+b;
}

export default helper(sum);

