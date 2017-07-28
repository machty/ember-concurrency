import { helper } from '@ember/component/helper';

export function subtract([a,b]/*, hash*/) {
  return a-b;
}

export default helper(subtract);

