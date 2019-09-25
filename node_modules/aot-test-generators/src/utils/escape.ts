const jsesc = require('jsesc');

export default function(str: string): string {
  return jsesc(str, { wrap: true });
};
